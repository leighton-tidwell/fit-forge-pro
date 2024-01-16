export default function DashboardLoading() {
  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center items-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Welcome back, Loading...
          </h1>
        </div>
      </div>
    </div>
  );
}
