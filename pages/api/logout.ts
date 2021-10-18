import withSession from "../../lib/session";

export default withSession(async (req, res) => {

  req.session.destroy();
  res.setHeader("cache-control", "no-store, max-age=0");
  res.status(200).json({ isLoggedIn: false });

});