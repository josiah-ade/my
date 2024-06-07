import { UserMenuLookup } from "@/core/const/menu.const";
import { usePathname } from "next/navigation";

export default function useActiveMenu() {
  const currentPath = usePathname();
  const currentMenuItem = UserMenuLookup[currentPath];
  return currentMenuItem;
}
