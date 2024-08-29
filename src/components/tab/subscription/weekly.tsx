import EmptyState from "@/components/common/empty/empty";
import CardPlan from "./carddisplay/card.display";
import { useGetSubscription } from "@/providers/hooks/query/subscription";
import { ISubscriptionPackage } from "@/typings/interface/subscription";
import { useMemo } from "react";

export default function WeeklyPlan() {
  const { data: subscriptions } = useGetSubscription({ loadingConfig: { displayLoader: true } });

  const hasSubscription: boolean = useMemo(() => {
    if (!subscriptions) return false;
    return subscriptions.some((item) => !!item.subscriptionCount);
  }, [subscriptions]);

  const sortedSubscriptions = useMemo(() => {
    return subscriptions?.slice().sort((a, b) => a.amount - b.amount);
  }, [subscriptions]);

  return (
    <div className="flex flex-col md:flex-row justify-around gap-5 mt-11">
      {sortedSubscriptions && sortedSubscriptions.length > 0 ? (
        <>
          {sortedSubscriptions.map((subscription: ISubscriptionPackage, index: number) => (
            <CardPlan
              key={subscription.id}
              isRecommended={index == 1}
              subscription={subscription}
              hasSubscription={hasSubscription}
            />
          ))}
        </>
      ) : (
        <EmptyState />
      )}
    </div>
  );
}
