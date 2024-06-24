
import UserLayout from "@/layout/user";
import DashBoardItems from "@/components/dashboard/dashboarditem/dashboarditem";
import DashBoardAction from "@/components/dashboard/dashboarditem/dashboardactons";


export default function DashboardPage() {
  return (
    <>
      <div>
        <DashBoardItems />
      </div>
      <div className="grid lg:grid-cols-2 mt-8">
        <DashBoardAction />
      </div>
    </>
  );
}

DashboardPage.Layout = UserLayout
