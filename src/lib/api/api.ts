type FetcherTypeProps<TBody = unknown> = {
  url: string;
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  body?: TBody;
  json?: boolean;
};

export const fetcher = async <TResponse, TBody = unknown>({
  url,
  method,
  body,
  json = true,
}: FetcherTypeProps<TBody>): Promise<TResponse> => {
  const res = await fetch(url, {
    method,
    ...(body && { body: JSON.stringify(body) }),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch");
  }

  if (json) {
    const data = await res.json();
    return data.data as TResponse;
  }

  return undefined as unknown as TResponse;
};

export const register = (user: RegisterForm) => {
  return fetcher({
    url: "/api/register",
    method: "POST",
    body: user,
  });
};

export const signin = (user: SigninForm) => {
  return fetcher({
    url: "/api/signin",
    method: "POST",
    body: user,
  });
};
