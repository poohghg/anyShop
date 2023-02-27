import { Response } from "express";
import { sign, verify, VerifyErrors } from "jsonwebtoken";
import env from "./envLoader";
type MyToken = {
  userId: string;
  email: string;
  iat: number;
  exp: number;
};

const EXPIRE_TOKEN = 1000 * 60 * 60 * 24;
const EXPIRE_REFRESH_TOKEN = 1000 * 60 * 60 * 24 * 7;

export const generateAccessToken = (userId: string) => {
  return sign({ userId }, process.env.JWT_SECRET_KEY!, {
    algorithm: "HS256",
    expiresIn: EXPIRE_TOKEN,
  });
};
// 리플레쉬 토큰은 유저Id 키값을 저장하여 추후 디비에서 조회한다.
export const generateRefreshToken = (userId: string) => {
  return sign({ userId }, process.env.JWT_SECRET_KEY!, {
    algorithm: "HS256",
    expiresIn: EXPIRE_REFRESH_TOKEN,
  });
};

export const verifyToken = (token: string = "") => {
  return verify(token, process.env.JWT_SECRET_KEY!, (error, data) => {
    if (error) return error;
    return data;
  });
};

export const setRefreshTokenInCookie = (res: Response, userId: string) => {
  const refreshToken = generateRefreshToken(userId);
  console.log("env.DOMAIN", env.DOMAIN);
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: EXPIRE_REFRESH_TOKEN,
    // domain: env.DOMAIN,
  });
  return refreshToken;
};
