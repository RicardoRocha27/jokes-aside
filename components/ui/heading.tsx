interface HeadingProps {
  title: string;
  description: string;
}

export const Heading: React.FC<HeadingProps> = ({ title, description }) => {
  return (
    <div className="space-y-1 flex flex-col items-center sm:items-start text-center sm:text-start">
      <div className="flex">
        <h1 className="text-3xl font-bold tracking-tighter bg-gradient-to-r from-pink-800 via-cyan-700 to-pink-800 bg-clip-text text-transparent">
          {title}
        </h1>
      </div>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
};
