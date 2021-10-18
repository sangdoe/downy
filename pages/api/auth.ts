import { NextApiRequest, NextApiResponse } from 'next'
import ImageKit from 'imagekit';
const urlEndpoint = 'https://ik.imagekit.io/aug9rawt76d';
const publicKey = 'public_h7AKSIK9E/AJTuuzm3QSmHJUBtY=';
const privateKey = 'private_rXB4W4DHTFcv86BPsMrJ0hls968=';

const imagekit = new ImageKit({
  urlEndpoint: urlEndpoint,
  publicKey: publicKey,
  privateKey: privateKey,
});

const getAuth = (_: NextApiRequest, res: NextApiResponse) => {
  const result = imagekit.getAuthenticationParameters();
  return res.send(result);
}

export default getAuth;