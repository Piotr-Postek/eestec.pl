import type { SessionOptions } from "iron-session";

export type AdminSession = {
  isLoggedIn?: boolean;
};

let cached: SessionOptions | null = null;

export function getSessionOptions(): SessionOptions {
  if (cached) return cached;
  const password = process.env.SESSION_SECRET;
  if (!password || password.length < 32) {
    throw new Error(
      "Ustaw SESSION_SECRET w .env.local (min. 32 znaki). Zobacz .env.example."
    );
  }
  cached = {
    cookieName: "eestec_admin",
    password,
    cookieOptions: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax" as const,
      path: "/",
      maxAge: 60 * 60 * 24 * 14,
    },
  };
  return cached;
}
