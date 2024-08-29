import Button from "@/components/button/button";
import PaymentModal from "@/components/subscription/paymentModal";
import { planDetails } from "@/core/const/subscription/weekly";
import { useInitiatePayment } from "@/providers/hooks/mutate/subscription";
import { IPlanDetails, ISubscriptionPackage } from "@/typings/interface/subscription";
import { useState } from "react";

interface ICardPlanProps {
  isRecommended: boolean;
  subscription: ISubscriptionPackage;
  hasSubscription?: boolean;
}

const formatValue = (key: string, value: number) => {
  const unlimitedFields = [
    "teamCollaboration",
    "contactsMessageSendLimit",
    "contactsImport",
    "contactsAutoSaveDaily",
    "broadcastListLimit",
    "formLimit",
    "chatBots",
    "automationMessages",
    "groupsInAutomationLimit",
    "groupBroadcastLimit",
  ];

  if (unlimitedFields.includes(key) && value === -1) {
    return "Unlimited";
  }
  return value;
};
function formatData<T>(detail: IPlanDetails, value: T) {
  let displayformat = `${value ?? ""} `;
  if (typeof value == "number") {
    displayformat = `${formatValue(detail.field, value)}`;
  } else if (typeof value == "boolean") {
    displayformat = "";
  }

  const displayText = `${detail.prefix ?? ""}
      ${detail.direction == "l" ? detail.label ?? "" : ""} ${displayformat}
      ${detail.direction != "l" ? detail.label ?? "" : ""}`;
  return displayText;
}

export default function CardPlan({ isRecommended, subscription, hasSubscription }: ICardPlanProps) {
  const buttonText = hasSubscription ? "Upgrade" : "Select Plan";
  const [modalState, setModalState] = useState(false);

  return (
    <div
      className={`flex flex-col justify-between  gap-2 border  border: ${
        isRecommended ? "border-primary" : "border-gray-200"
      } p-5} p-5`}
    >
      <div className="flex flex-row justify-between">
        <h3 className="text-xl text-gray-700 font-bold">{subscription.name}</h3>
        {isRecommended && (
          <div>
            <p className="bg-primary text-white rounded-2xl px-3 py-0.5 text-center text-sm">Recommended</p>
          </div>
        )}
      </div>
      {planDetails.map((detail, index) => (
        <div key={index} className={`mb-1 ${detail.prefix && "text-primary font-bold text-2xl mb-4"}`}>
          {formatData(detail, subscription[detail.field as keyof ISubscriptionPackage])}
        </div>
      ))}
      <div className="mt-4">
        <Button
          disabled={!!subscription.subscriptionCount}
          onClick={() => setModalState(true)}
          className="bg-primary text-white text-center text-sm w-full"
        >
          {subscription.subscriptionCount ? "Current Plan" : buttonText}
        </Button>
      </div>
      <PaymentModal isOpen={modalState} onClose={() => setModalState(false)} planId={subscription.id} />
    </div>
  );
}
