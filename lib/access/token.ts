import { parse } from "cookie";

export interface Cookie {
  CF_Authorization?: string;
}

export const getAuthorizationToken = (request: Request) => {
  const cookies = request.headers.get("Cookie");
  if (!cookies) {
    return undefined;
  }

  const values = parse(cookies) as Cookie;

  return values.CF_Authorization;
};
