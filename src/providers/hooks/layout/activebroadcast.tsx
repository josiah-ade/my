import { UserBroadcastLookup } from "@/core/const/broadcast";
import { usePathname } from "next/navigation";


export default function useActiveBroadcast() {
    const currentPath = usePathname();
    const currentMenuItem = UserBroadcastLookup[currentPath];
    return currentMenuItem;
  }
  