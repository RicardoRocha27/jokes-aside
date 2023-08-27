import { redirect } from "next/navigation";
import { redirectToSignIn } from "@clerk/nextjs";

import { initialProfile } from "@/lib/initial-profile";

const SetupPage = async () => {
  const profile = await initialProfile();

  if (profile) {
    redirect("/home");
  }

  return redirectToSignIn;
};

export default SetupPage;
