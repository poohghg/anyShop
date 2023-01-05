import { Response } from "express";
import { sign, verify } from "jsonwebtoken";

const EXPIRE_REFRESH_TOKEN = 1000 * 60 * 60 * 24;

export const generateAccessToken = ({
  id,
  nickName,
}: {
  id: string;
  nickName: string;
}) => {
  return sign({ userCd: id, nickName }, process.env.JWT_SECRET_KEY!, {
    algorithm: "HS256",
    expiresIn: "1 days",
  });
};

export const verifyAccessToken = (token: string = "") => {
  return verify(token, process.env.JWT_SECRET_KEY!);
};

export const generateRefreshToken = () => {
  return sign({}, process.env.JWT_SECRET_KEY!, {
    algorithm: "HS256",
    expiresIn: EXPIRE_REFRESH_TOKEN,
  });
};

export const setRefreshTokenInCookie = (res: Response) => {
  const token = generateRefreshToken();
  res.cookie("refreshToken", token, {
    httpOnly: true,
    secure: true,
    maxAge: EXPIRE_REFRESH_TOKEN,
    // maxAge: 1000 * 600,
    sameSite: "none",
  });
};
