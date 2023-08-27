import Navbar from "@/components/navigation/navbar";
import Container from "@/components/ui/container";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full flex flex-col items-center">
      <Container>
        <Navbar />
        {children}
      </Container>
    </div>
  );
};

export default Layout;
