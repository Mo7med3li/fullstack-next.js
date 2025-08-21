import bcrypt from "bcrypt";
// Hash password
export const hashPassword = (password: string): Promise<string> =>
  bcrypt.hash(password, 10);

// Compare pasword
export const comparePassword = (
  plainTextPassword: string,
  hashedPassword: string
): Promise<boolean> => bcrypt.compare(plainTextPassword, hashedPassword);
