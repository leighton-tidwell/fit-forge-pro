import { AddExerciseForm } from "@/components/add-exercise-form";
import { authOptions } from "@/lib/auth";
import { getCurrentUser } from "@/lib/session";
import { redirect } from "next/navigation";

export default async function AddExercisePage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/auth/login");
  }

  return (
    <div className="flex flex-col gap-2">
      <h1 className="font-extrabold tracking-tighter text-4xl flex-1">
        Create Exercise
      </h1>
      <AddExerciseForm />
    </div>
  );
}
