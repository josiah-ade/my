import PageHeading from "@/components/common/text/pageHeading";
import ContactSales from "@/components/subscription/contactsale";
import SubscriptionHistoryTable from "@/components/subscription/subhistorytable";
import { tabs } from "@/components/subscription/tab";
import Tabs from "@/components/tab/Tab";
import Table from "@/components/table";
import { UserRoutes } from "@/core/const/routes.const";
import { NotificationType } from "@/core/enum/notification";
import UserLayout from "@/layout/user";
import { useVerifyPayment } from "@/providers/hooks/mutate/subscription";
import useNotificationStore from "@/providers/stores/notificationStore";
import { IGenericStatusResponse } from "@/typings/interface/api";
import { TableHeader } from "@/typings/interface/component/table";
import { ISubScription, IVerifyPayment } from "@/typings/interface/subscription";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function SubScriptionPage() {


  const router = useRouter();
  const setNotification = useNotificationStore((state) => state.setDisplay);

  const displayNotification = (res?: IGenericStatusResponse, isError = false) => {
    setNotification(true, {
      type: isError ? NotificationType.error : res?.status ? NotificationType.success : NotificationType.warning,
      content: { title: res?.status ? "Payment Verified" : "Unverified Payment", text: res?.message },
    });
    router.replace(UserRoutes.SUBSCRIPTION);
  };

  const { mutate } = useVerifyPayment({
    onSuccess: displayNotification,
    onError: (e) => {
      const data: IGenericStatusResponse = { status: false, message: e.message };
      displayNotification(data, true);
    },
    options: { successConfig: { displaySuccess: false }, errorConfig: { title: "Failed to verify payment" } },
  });

  useEffect(() => {
    const { trxref } = router.query;
    if (trxref) {
      const postData: IVerifyPayment = { reference: trxref as string };
      mutate(postData);
    } else if (Object.keys(router.query).length) {
      router.replace(UserRoutes.SUBSCRIPTION);
    }
  }, [router.query]);

  return (
    <UserLayout>
      <PageHeading title={"Subscription Pricing"} description={"Upgrade and manage your subscription"} />
      <div className="mt-10">
        <Tabs tabs={tabs} justify={"justify-start"} />
      </div>
      <div>
        <ContactSales />
      </div>
      <SubscriptionHistoryTable />
      
    </UserLayout>
  );
}
