"use client";
import { useRouter } from "next/navigation";
import { Icons } from "./icons";
import { Button } from "./ui/button";

export const BackButton = () => {
  const router = useRouter();

  return (
    <Button
      onClick={() => router.back()}
      className="w-[fit-content]"
      variant="ghost"
      type="button"
    >
      <Icons.chevronLeft className="w-4" />
      Back
    </Button>
  );
};
