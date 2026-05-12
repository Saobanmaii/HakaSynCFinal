"use server";

import { cookies } from "next/headers";

const COOKIE_NAME = "mock-auth";
const COOKIE_VALUE = "true";

export async function login() {
  cookies().set(COOKIE_NAME, COOKIE_VALUE, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: "/",
  });
}

export async function logout() {
  cookies().delete(COOKIE_NAME);
}

export async function isAuthed(): Promise<boolean> {
  return cookies().get(COOKIE_NAME)?.value === COOKIE_VALUE;
}
