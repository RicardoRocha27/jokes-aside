import Navbar from "@/components/navigation/navbar";
import Notifications from "@/components/notifications";
import Container from "@/components/ui/container";
import { currentProfile } from "@/lib/current-profile";
import { redirectToSignIn } from "@clerk/nextjs";

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const loggedUser = await currentProfile();
  if (!loggedUser) {
    return redirectToSignIn();
  }
  return (
    <div className="w-full flex flex-col items-center">
      <Container>
        <Navbar />
        {children}
        <div className="fixed flex items-center justify-center p-2 rounded-full shadow-md md:hidden bottom-10 left-10 bg-white dark:bg-slate-950 border border-slate-950/10 dark:border-white/10 h-10 w-10">
          <Notifications notifications={loggedUser.receivedNotifications} />
        </div>
      </Container>
    </div>
  );
};

export default Layout;
