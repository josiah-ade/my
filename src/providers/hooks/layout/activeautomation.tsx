import { UserAutomationLookup } from "@/core/const/automation";
import { usePathname } from "next/navigation";


export  function useActiveAutomation() {
  const currentPath = usePathname();
  const currentMenuItem = UserAutomationLookup[currentPath];
  return currentMenuItem;
}
