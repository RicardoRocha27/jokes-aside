import { initialProfile } from "@/lib/initial-profile";

const HomePage = async () => {
  const profile = await initialProfile();

  return <div>This is a home page.</div>;
};

export default HomePage;
