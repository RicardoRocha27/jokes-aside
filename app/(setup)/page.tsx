import { redirect } from "next/navigation";

import { initialProfile } from "@/lib/initial-profile";
import { RedirectToSignIn } from "@clerk/nextjs";

const SetupPage = async () => {
  const profile = await initialProfile();

  if (profile) {
    redirect("/home");
  }

  return RedirectToSignIn;
};

export default SetupPage;
