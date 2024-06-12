import { UserMenuLookup } from "@/core/const/menu.const";
import { UserAutomationLookup } from "@/core/const/automation";

import { usePathname } from "next/navigation";

export default  function useActiveMenu() {
  const currentPath = usePathname();
  const currentMenuItem = UserMenuLookup[currentPath];
  return currentMenuItem;
}
// export  function useActiveAutomation() {
//   const currentPath = usePathname();
//   const currentMenuItem = UserAutomationLookup[currentPath];
//   return currentMenuItem;
// }
