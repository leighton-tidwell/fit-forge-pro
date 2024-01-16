import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { getCurrentUser } from "@/lib/session";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Icons } from "@/components/icons";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { StartWorkoutDialog } from "@/components/start-workout-dialog";

export const metadata = {
  title: "Dashboard",
};

export default async function DashboardPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/auth/login");
  }

  return (
    <div className="flex flex-col w-full gap-2">
      <div className="flex flex-col gap-2 bg-slate-100 p-6 w-full rounded-lg">
        <Card className="w-full">
          <CardHeader>
            <div className="flex flex-row">
              <span className="text-sm sm:text-lg font-light">
                Welcome back,
              </span>
              <span className="text-sm sm:text-lg font-semibold ml-2">
                {user?.name} 👋
              </span>
            </div>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            <Card>
              <CardHeader>
                <CardTitle>🎯 Weekly Goal</CardTitle>
                <CardDescription>
                  You have completed 2/4 days this week
                </CardDescription>
                <CardContent className="p-0">
                  <div className="w-full h-6 bg-gray-200 rounded-full">
                    <div
                      className="h-full bg-gradient-to-r from-blue-200 to-blue-500 rounded-full"
                      style={{ width: "50%" }}
                    ></div>
                  </div>
                </CardContent>
              </CardHeader>
            </Card>
            <StartWorkoutDialog />
          </CardContent>
        </Card>
      </div>
      <Link href="/dashboard/add/exercise" passHref legacyBehavior>
        <Card className="w-full p-8 flex flex-col items-center justify-center transform transition-transform duration-500 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400 cursor-pointer">
          <button className="bg-white text-blue-500 px-4 py-2 rounded-full mb-4 transform transition-transform duration-500 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400">
            <Icons.plusCircle className="w-10 h-10" />
          </button>
          <h2 className="text-2xl font-bold">Add Exercise</h2>
        </Card>
      </Link>
      <Link href="/dashboard/add/workout" passHref legacyBehavior>
        <Card className="w-full p-8 flex flex-col items-center justify-center transform transition-transform duration-500 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400 cursor-pointer">
          <button className="bg-white text-green-500 px-4 py-2 rounded-full mb-4 transform transition-transform duration-500 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400">
            <Icons.plusCircle className="w-10 h-10" />
          </button>
          <h2 className="text-2xl font-bold">Add Workout</h2>
        </Card>
      </Link>
    </div>
  );
}
