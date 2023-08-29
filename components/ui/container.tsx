const Container = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full max-w-screen-2xl px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20">
      {children}
    </div>
  );
};

export default Container;
