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
    let errorMsg = "Something went wrong";
    try {
      const errorData = await res.json();
      errorMsg = errorData.error || JSON.stringify(errorData);
    } catch {
      // ignore parsing error
    }
    throw new Error(errorMsg);
  }

  if (json) {
    const data = await res.json();
    return data.data as TResponse;
  }

  return undefined as unknown as TResponse;
};

export const register = (user: RegisterForm) => {
  return fetcher({
    url: `${process.env.NEXT_PUBLIC_API_URL}/register`,
    method: "POST",
    body: user,
  });
};

export const signin = (user: SigninForm) => {
  return fetcher({
    url: `${process.env.NEXT_PUBLIC_API_URL}/signin`,
    method: "POST",
    body: user,
  });
};

export const createNewProject = async (name: string) => {
  return fetcher({
    url: `${process.env.NEXT_PUBLIC_API_URL}/create-project`,
    method: "POST",
    body: { name },
    json: true,
  });
};

export const createNewTask = async (taskData: {
  name: string;
  projectId: string;
  description?: string;
  due?: string;
}) => {
  return fetcher({
    url: `${process.env.NEXT_PUBLIC_API_URL}/create-task`,
    method: "POST",
    body: taskData,
    json: true,
  });
};

export const logout = () => {
  return fetcher({
    url: `${process.env.NEXT_PUBLIC_API_URL}/logout`,
    method: "POST",
  });
};
