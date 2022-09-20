import jwt from "jsonwebtoken";

import { secretKey } from "../utils/jwt.js";

// This is used to get userId from token and attach it to the request
const auth = async (req, _, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    const isCustomAuth = token.length < 500;

    let decodedData;

    if (token && isCustomAuth) {
      decodedData = jwt.verify(token, secretKey);

      req.userId = decodedData?.id;
    } else {
      decodedData = jwt.decode(token);

      req.userId = decodedData?.sub;
    }

    next();
  } catch (error) {
    console.log(error);
  }
};

export default auth;
