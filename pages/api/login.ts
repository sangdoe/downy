//import fetchJson from "../../lib/fetchJson";
import { IntegrityConstraintViolationError } from "slonik";
import withSession from "../../lib/session";
import { UserLogin } from "../../shared/types";
import api from './models/users'

export default withSession(async (req, res) => {
  const { email, password } = req.body;
  //  const url = `https://api.github.com/users/${username}`;
  const result = await api.getUser(email, password);

  const [data, error] = result;

  try {
    const { name: userName, role, id: userId, email: userEmail } = data;
    const user: UserLogin = { isLoggedIn: true, login: userName, role: role, id: userId, email: userEmail };
    req.session.set("user", user);
    await req.session.save();
    res.status(200).json(user);
  } catch (error) {
    //const { response: fetchResponse } = error;
    res.status(500).json({ message: 'Error login', error: error });
  }
});