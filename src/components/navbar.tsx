"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
  NavigationMenuContent,
} from "./ui/navigation-menu";
import { Icons } from "./icons";

export const NavBar = () => {
  const pathname = usePathname();

  return (
    <NavigationMenu
      orientation="vertical"
      className="items-start justify-start w-full"
    >
      <NavigationMenuList className="flex-col w-full">
        <NavigationMenuItem>
          <NavigationMenuTrigger>
            <Icons.menu className="rounded active:bg-slate-200" />
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="p-2">
              <NavigationMenuItem className="w-full">
                <Link
                  href="/dashboard"
                  legacyBehavior
                  passHref
                  className="w-full"
                >
                  <NavigationMenuLink
                    active={pathname === "/dashboard"}
                    className={navigationMenuTriggerStyle()}
                  >
                    📊 Dashboard
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/dashboard/exercises" legacyBehavior passHref>
                  <NavigationMenuLink
                    active={pathname === "/dashboard/exercises"}
                    className={navigationMenuTriggerStyle()}
                  >
                    🏋️‍♀️ Exercises
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/dashboard/workouts" legacyBehavior passHref>
                  <NavigationMenuLink
                    active={pathname === "/dashboard/workouts"}
                    className={navigationMenuTriggerStyle()}
                  >
                    💪 Workouts
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};
