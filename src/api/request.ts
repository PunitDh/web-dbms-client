"use server";

import { ApiError } from "next/dist/server/api-utils";

enum HttpMethod {
  GET,
  POST,
  PUT,
  PATCH,
  DELETE,
}

type RequestProps = {
  endpoint: string;
  method: keyof typeof HttpMethod;
  body?: Record<string, unknown>;
};

export async function sendRequest<T>({
  endpoint,
  method,
  body,
}: RequestProps): Promise<T> {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}${endpoint}`;
  const response = await fetch(url, {
    method,
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  if (response.ok) {
    return response.json() as T;
  } else {
    throw new ApiError(response.status, "Internal server error");
  }
}
