type JwtUser = {
  id: string;
  email: string;
};

declare type CookieValue = {
  name: string;
  value: string;
  path?: string;
  domain?: string;
  expires?: Date;
  httpOnly?: boolean;
  secure?: boolean;
  sameSite?: "strict" | "lax" | "none";
};

declare type MinimalCookies = {
  get: (name: string) => CookieValue | undefined;
};
