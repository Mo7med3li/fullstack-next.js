import bcrypt from "bcrypt";
import { jwtVerify, SignJWT } from "jose";
import { db } from "./db";

// Hash password
export const hashPassword = (password: string): Promise<string> =>
  bcrypt.hash(password, 10);

// Compare pasword
export const comparePassword = (
  plainTextPassword: string,
  hashedPassword: string
): Promise<boolean> => bcrypt.compare(plainTextPassword, hashedPassword);

//   Generate JWT Token
export const createJWT = (user: JwtUser): Promise<string> => {
  const iat = Math.floor(Date.now() / 1000);
  const exp = iat + 60 * 60 * 24 * 7;

  return new SignJWT({ id: user.id, email: user.email })
    .setProtectedHeader({ alg: "HS256", typ: "JWT" })
    .setExpirationTime(exp)
    .setIssuedAt(iat)
    .setNotBefore(iat)
    .sign(new TextEncoder().encode(process.env.JWT_SECRET!));
};

// Validate JWT Token
export const validateJWT = async (jwt: string): Promise<JwtUser> => {
  const { payload } = await jwtVerify(
    jwt,
    new TextEncoder().encode(process.env.JWT_SECRET!)
  );

  return payload as JwtUser;
};

// Getting User
export const getUserFromCookie = async (cookies: MinimalCookies) => {
  const tokenCookie = cookies.get(process.env.COOKIE_NAME! as string);
  if (!tokenCookie?.value) {
    throw new Error("Missing auth token cookie");
  }

  const { id } = await validateJWT(tokenCookie.value);

  const user = await db.user.findUnique({
    where: {
      id: id as string,
    },
  });

  return user;
};
