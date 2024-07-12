import { useGetQrcodeUsersAcount, useGetUsersAcount } from "@/providers/hooks/query/getaccount";
import Image from "next/image";
import Button from "../button/button";
import { useEffect, useState } from "react";
import { useQueryClient } from "react-query";
import { IAccount } from "@/typings/interface/account";
import Loader from "../loader/loader";
import AuthLoading from "../common/loading/authloading";
import { LoadingIndicator } from "../common/loading/modalloading";

let timeoutId: number | undefined;
let intervalId: number | undefined;

export default function TabContent(props: { currentAccount: IAccount; onClose: () => void }) {
  const queryClient = useQueryClient();
  const { currentAccount, onClose } = props;
  const [countdown, setCountdown] = useState(0);

  const { data: qrData, error, loading, isFetching } = useGetQrcodeUsersAcount(currentAccount?.id ?? "");

  const expire = qrData?.expire ?? 0;

  const handleClose = () => {
    onClose && onClose();
  };

  useEffect(() => {
    setCountdown((val) => qrData?.expire ?? val);
    if (expire <= 2 || !qrData?.base64) {
      queryClient.invalidateQueries("qr_code");
      return;
    }

    timeoutId = window.setTimeout(async () => {
      queryClient.invalidateQueries("qr_code");
    }, expire * 1000);

    return () => {
      timeoutId && window.clearTimeout(timeoutId);
    };
  }, [expire, qrData]);

  useEffect(() => {
    if (!loading && !error && !qrData?.base64) {
      queryClient.invalidateQueries("qr_code");
    }
  }, [loading, qrData]);

  useEffect(() => {
    intervalId = window.setInterval(() => {
      setCountdown((val) => (val < 1 ? 0 : val - 1));
    }, 1000);
    return () => {
      intervalId && window.clearInterval(intervalId);
    };
  }, [qrData?.expire]);

  const isConnected = (error as Error)?.message?.includes("authenticated");

  const handleRetry = () => {
    queryClient.invalidateQueries("qr_code");
  }

  return (
    <div className="max-w-md whitespace-break-spaces mx-auto bg-white p-6 rounded-lg">
      {!isConnected ? (
        <>
          {qrData?.base64 ? (
            <p className="text-right text-gray-500 text-xs"> Expires in {countdown ?? "retrying.."} </p>
          ) : null}
          <h2 className="text-black text-[1.2rem] font-semibold mb-4">How to Link with QR code</h2>
          <p className="mb-4 text-sm text-black leading-6">
            To link with a QR code, open WhatsApp on your phone, go to the settings, and tap on 'Link a Device'. Scan
            the QR code shown on this screen with your phone.
          </p>
          <div className="flex items-center justify-center mb-4">
            <div className=" px-4 py-2 rounded-md text-xl font-mono">
              {loading || isFetching ? (
                <LoadingIndicator />
              ) : error || !qrData?.base64 ? (
                <>
                  <button onClick={handleRetry} className="bg-primary-5 text-white rounded-2xl px-3 py-1 text-center text-sm">Retry</button>
                </>
              ) : (
                <div className="flex items-center justify-center mb-4">
                  <div className="px-4 py-2 rounded-md text-xl font-mono">
                    {qrData?.base64 ? (
                      <Image src={qrData.base64} alt="QR Code" width={200} height={300} />
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
              )}
              {/* {qrData?.base64 ? <Image src={qrData.base64} alt="qr" width={200} height={300} /> : <></>} */}
            </div>
          </div>
        </>
      ) : (
        <div className="p-8 text-center">
          <p className="text-success"> Connected </p>
        </div>
      )}

      <div>
        <Button onClick={handleClose} primary className="w-full">
          Done
        </Button>
      </div>
    </div>
  );
}
