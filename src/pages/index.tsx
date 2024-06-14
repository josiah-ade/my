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
      <div className="grid lg:grid-cols-2 mt-8">
        <DashBoardAction />
      </div>
    </UserLayout>
  );
}
