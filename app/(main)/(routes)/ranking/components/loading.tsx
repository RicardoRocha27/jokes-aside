import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
  return (
    <>
      <div className="flex flex-col sm:flex-row justify-between items-center sm:items-end gap-x-3 max-w-2xl mx-auto">
        <Card className="h-60 w-full sm:w-52">
          <CardHeader>
            <CardTitle>
              <div className="flex flex-col gap-y-2 justify-center items-center ">
                <Skeleton className="h-[50px] w-[50px] rounded-full" />
                <Skeleton className="w-[80px] h-3 rounded-md" />
                <Skeleton className="w-[80px] h-3 rounded-md" />
              </div>
            </CardTitle>
          </CardHeader>
        </Card>
        <Card className="h-64 w-full sm:w-52">
          <CardHeader>
            <CardTitle>
              <div className="flex flex-col gap-y-2 justify-center items-center ">
                <Skeleton className="h-[50px] w-[50px] rounded-full" />
                <Skeleton className="w-[80px] h-3 rounded-md" />
                <Skeleton className="w-[80px] h-3 rounded-md" />
              </div>
            </CardTitle>
          </CardHeader>
        </Card>
        <Card className="h-56 w-full sm:w-52">
          <CardHeader>
            <CardTitle>
              <div className="flex flex-col gap-y-2 justify-center items-center ">
                <Skeleton className="h-[50px] w-[50px] rounded-full" />
                <Skeleton className="w-[80px] h-3 rounded-md" />
                <Skeleton className="w-[80px] h-3 rounded-md" />
              </div>
            </CardTitle>
          </CardHeader>
        </Card>
      </div>

      <div className="w-full h-72 rounded-md mt-10">
        <Skeleton className="h-[60px] w-full rounded-md border border-b-input" />
        <Skeleton className="h-[60px] w-full rounded-md border border-b-input" />
        <Skeleton className="h-[60px] w-full rounded-md border border-b-input" />
        <Skeleton className="h-[60px] w-full rounded-md border border-b-input" />
        <Skeleton className="h-[60px] w-full rounded-md border border-b-input" />
      </div>
    </>
  );
};

export default Loading;
