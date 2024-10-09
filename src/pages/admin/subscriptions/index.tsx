import { enterprise, standard, teams } from "@/core/const/subscriptionpackagedata";
import Button from "@/shared/components/common/button/button";
import PageHeading from "@/shared/components/common/pageSubHead";
import PackageComponent from "@/shared/components/payment/package";
import AdminLayout from "@/shared/layouts/admin";
import { PiPlus } from "react-icons/pi";
import { useRouter } from "next/router";
import { AdminRoutes } from "@/core/const/routes.const";

export default function SubscriptionsPage() {
  const router = useRouter();

  const handleCreateSubscription = () => {
    console.log("working");
    router.push(AdminRoutes.SUBSCRIPTION_CREATE);
  };

  return (
    <div>
      <PageHeading title="Subscriptions" description="Add and manage platform subscriptions package" />
      <section>
        <div className="flex justify-end w-full relative right-8 mt-4">
          <Button icon={<PiPlus />} primary className=" text-sm" onClick={() => handleCreateSubscription()}>
            Create New Package
          </Button>
        </div>
      </section>
      <section className="mt-8">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <PackageComponent data={standard} />
          <PackageComponent data={teams} active />
          <PackageComponent data={enterprise} />
        </div>
      </section>
    </div>
  );
}

SubscriptionsPage.Layout = AdminLayout;
