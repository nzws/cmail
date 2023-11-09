import { errors as joseErrors } from "jose";

import { getAuthorizationToken } from "@/lib/access/token";
import { verifyToken } from "@/lib/access/verify";
import { Env } from "@/remix.env";

export const authorizationMiddleware = async (request: Request, env: Env) => {
  if (env.DISABLE_AUTH) {
    return {
      email: "example@nzws.me",
    };
  }

  const token = getAuthorizationToken(request);
  if (!token) {
    throw new Response("Unauthorized", {
      status: 401,
    });
  }

  try {
    const payload = await verifyToken(token, env);

    return {
      email: payload.email,
    };
  } catch (error) {
    if (error instanceof joseErrors.JWSSignatureVerificationFailed) {
      throw new Response("Unauthorized", {
        status: 401,
      });
    }

    throw error;
  }
};
