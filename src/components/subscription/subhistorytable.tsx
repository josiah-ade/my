import { SubscriptionHistory } from "@/typings/interface/subscription";
import Table from "../table";
import { TableHeader } from "@/typings/interface/component/table";
import { useGetSubscriptionHistory } from "@/providers/hooks/query/subscription";
import EmptyState from "../common/empty/empty";
import { CurrencyDisplay } from "./currencyDisplay";
import { formatDate } from "@/core/const/subscription/dateformat/newdate";
import { formatExpiryDate } from "@/core/const/subscription/dateformat/expirydate";

export default function SubscriptionHistoryTable() {
  const { data: subHistory } = useGetSubscriptionHistory();
  const headers: TableHeader<SubscriptionHistory>[] = [
    { field: "createdAt", title: "Date" },
    { field: "package", title: "Package" },
    { field: "duration", title: "Duration" },
    { field: "expiredAt", title: "Expiry" },
    {
      field: "price",
      title: "Price",
      component: (props) => <CurrencyDisplay price={props.item?.price} currency={props.item?.currency} />,
    },
    { field: "status", title: "Status", type: "chip" },
  ];

  const formattedData = subHistory?.map((item) => ({
    ...item,
    createdAt: item.createdAt ? formatDate(new Date(item.createdAt)) : "",
    expiredAt: item.expiredAt ? formatExpiryDate(item.expiredAt) : "--",
  }));

  return (
    <div className="mt-5">
      {formattedData && formattedData.length > 0 ? (
        <>
          <h3 className="font-bold text-[1rem] pb-5">Subscription History</h3>
          <Table headers={headers} data={formattedData}  />
        </>
      ) : (
        <EmptyState
          title="No Subscription Yet"
          text="Click the 'Subscribe Now' button to start your first subscription."
        />
      )}
    </div>
  );
}
