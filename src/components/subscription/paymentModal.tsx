import { ModalProps } from "@/typings/interface/component/modal";
import Modal from "../modal/modal";
import Button from "../button/button";
import { useInitiatePayment } from "@/providers/hooks/mutate/subscription";
import { useState } from "react";
import { IInitiatePayment } from "@/typings/interface/subscription";
import { useAccountStore } from "@/providers/stores/accountStore";
import Select from "../input/selectInput";

interface IProps extends ModalProps {
  planId?: string;
}

export default function PaymentModal({ isOpen, onClose, planId }: IProps) {
  const [payload, setPayload] = useState<IInitiatePayment>({
    planId: planId ?? "",
    accountId: "",
    callbackUrl: window.location.href, // orion/suscrptionrotes
  });
  const accounts = useAccountStore((state) => state.accounts);

  function handleChange(value: string) {
    setPayload((val) => ({ ...val, accountId: value }));
  }

  const { mutate } = useInitiatePayment({
    onSuccess: (res) => {
      if (res?.authorizationUrl) window.location.href = res.authorizationUrl;
    },
    options: {
      successConfig: { text: "You will be redirected to a payment shortly" },
      errorConfig: { title: "Failed to initialize payment" },
    },
  });

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div>
        <h2 className="text-xl font-bold">Select Account</h2>
        <h4 className="mb-5 mt-1">Select account to subscribe to</h4>
        <Select
          onChange={handleChange}
          name={"account"}
          label={""}
          options={accounts}
          controlField={"id"}
          displayField={"phoneNumber"}
          value={payload.accountId}
        />
        <div className="mt-5">
          <Button onClick={() => mutate(payload)} primary className="w-full">
            Go To Payment Page
          </Button>
        </div>
      </div>
    </Modal>
  );
}
