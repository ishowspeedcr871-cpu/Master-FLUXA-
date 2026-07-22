"use server";

import { authenticateMasterDeveloper } from "@/services/developer/master-auth";

export type DeveloperLoginState = {
  error?: string;
};

export async function developerLoginAction(
  _previousState: DeveloperLoginState,
  formData: FormData,
): Promise<DeveloperLoginState> {
  const masterId = formData.get("masterId") as string;
  const password = formData.get("password") as string;

  if (!masterId || !password) {
    return { error: "Both Master ID and Password are required." };
  }

  const success = await authenticateMasterDeveloper({ masterId, password });

  if (!success) {
    return { error: "Invalid Master ID or Password" };
  }

  redirect("/developer/dashboard");
}
