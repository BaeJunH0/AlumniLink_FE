"use server";

import { cookies } from "next/headers";

import AlumniLinkAPI from "@/shared/config/AxiosConfig";

import { type T_SignUp } from "@/entity/sign/sign";

export const get_sign_in = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  try {
    const cookie_store = cookies();
    const request = {
      email: email,
      password: password,
    };
    const res = await AlumniLinkAPI.post("/auth/login", request);
    const EXPIRED_ACCESS = parseInt(process.env.EXPIRED_ACCESS ?? "3600");
    (await cookie_store).set("access-token", res.data.accessToken ?? "", {
      httpOnly: false,
      path: "/",
      maxAge: EXPIRED_ACCESS,
    });
    return {
      data: "login Success",
      statusCode: 200,
    };
  } catch (err: any) {
    return {
      data: err.message,
      statusCode: err.status,
    };
  }
};

export const get_sign_up = async ({
  email,
  nickname,
  password,
  employed,
  gitLink,
  resumeLink,
}: T_SignUp) => {
  try {
    const request: T_SignUp = {
      email: email,
      nickname: nickname,
      password: password,
      employed: employed,
      gitLink: gitLink,
      resumeLink: resumeLink,
    };
    const res = await AlumniLinkAPI.post("/auth/register", request);
    return {
      data: res.data,
      statusCode: res.status,
    };
  } catch (err: any) {
    return {
      data: err.data,
      statusCode: err.status,
    };
  }
};

export const get_admin_login = async ({
  nickname,
  password,
}: {
  nickname: string;
  password: string;
}) => {
  try {
    const request = {
      nickname: nickname,
      password: password,
    };
    const res = await AlumniLinkAPI.post("/auth/adminLogin", request);
    if (res.status === 200) {
      return true;
    } else {
      return false;
    }
  } catch (err: any) {
    if (err.status === 400) {
      return false;
    }
  }
};
