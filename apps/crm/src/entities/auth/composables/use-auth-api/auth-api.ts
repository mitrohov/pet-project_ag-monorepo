import { SingInUser, SignInResponse } from "@ag/schemas/dtos/user-and-auth.ts";

export function useAuthApi() {
  const apiUrl = import.meta.env.VITE_API_URL;

  async function signIn(body: SingInUser): Promise<SignInResponse> {
    const response = await fetch(`${apiUrl}/auth/sign-in`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      credentials: "include",
      body: JSON.stringify(body),
    });

    return await response.json();
  }

  return {
    signIn,
  };
}
