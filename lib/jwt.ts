//helper function for JWT

import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET!;


export function signToken(payload: any) {
  return jwt.sign(payload, SECRET, { expiresIn: "1d" });
}

export function verifyToken(token: any) {
  return jwt.verify(token, SECRET);
}

export function getUserFromToken(token: string) {
  try {
    const decoded = jwt.verify(token, SECRET);
    return decoded as { _id: string; email: string }; // Adjust based on your payload
  } catch (err) {
    return null;
  }
}
