import Image from "next/image";
import { Inter } from "next/font/google";
import UserLayout from "@/layout/user";
import DashBoardItems from "@/components/dashboard/dashboarditem/dashboarditem";
import DashBoardAction from "@/components/dashboard/dashboarditem/dashboardactons";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <UserLayout>
      <div>
        <DashBoardItems />
      </div>
      <div>
        <DashBoardAction />
      </div>
      
      </UserLayout>
  );
}
