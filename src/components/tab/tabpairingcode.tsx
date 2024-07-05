import { useGetPairingcodeUsersAcount } from "@/providers/hooks/query/getaccount";
import Button from "../button/button";
import { IAccount } from "@/typings/interface/account";
import AuthLoading from "../common/loading/authloading";
import { useQueryClient } from "react-query";
import { LoadingIndicator } from "../common/loading/modalloading";


export default function PairQrcode(props: { currentAccount: IAccount; onClose: () => void }) {
  const queryClient = useQueryClient();
  const { currentAccount, onClose } = props;
  const { data: pairingCode, loading, error } = useGetPairingcodeUsersAcount(currentAccount?.id ?? "")
  

  const handleClose = () => {
    onClose && onClose();
  };
  const handleRetry = () => {
    queryClient.invalidateQueries("qr_code");
  }
  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg">
      <h2 className="text-black text-[1.2rem] font-semibold mb-4">
        How to Link with pairing code
      </h2>
      <p className="mb-4 text-sm text-black whitespace-break-spaces leading-6">
        To link with a pairing code, open WhatsApp on the phone where
        8038548936 is after you have requested, you will be prompted to
        input a pairing code, copy the code shown here and paste on your
        device. After few seconds, it'll show 'Connected' here, you can
        close this window after that.
      </p>
      <div className="flex items-center justify-center mb-4">
        <div className="bg-green-100 text-green-800 flex flex-col items-center justify-center p-5 w-[100%] rounded-lg text-lg">
          {loading ? (
            <LoadingIndicator />
          ) : error ? (
            <button onClick={handleRetry} className="bg-primary-5 text-white rounded-2xl px-3 py-1 text-center text-sm">Retry</button>
          ) : (
            <>
              <div className="flex space-x-2 items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="17"
                  height="18"
                  viewBox="0 0 20 21"
                  fill="none"
                >
                  <g clipPath="url(#clip0_53_3095)">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M17.0859 3.40417C15.2061 1.53232 12.7059 0.50095 10.042 0.5C4.55283 0.5 0.08547 4.94221 0.08356 10.4025C0.082605 12.148 0.54147 13.8518 1.41288 15.3533L0 20.4854L5.27909 19.1083C6.7335 19.8976 8.37128 20.313 10.0377 20.3135H10.042C15.5302 20.3135 19.9981 15.8708 20 10.4106C20.0009 7.76426 18.9662 5.2765 17.0859 3.40465V3.40417ZM10.042 18.6411H10.0387C8.55367 18.6407 7.09689 18.2436 5.82583 17.4939L5.52357 17.3154L2.39078 18.1325L3.22686 15.0949L3.03013 14.7834C2.20169 13.4729 1.76383 11.9581 1.76479 10.403C1.7667 5.86484 5.47963 2.17241 10.0454 2.17241C12.2561 2.17336 14.3342 3.03047 15.8969 4.58655C17.4598 6.14216 18.3197 8.21061 18.3188 10.4096C18.3168 14.9482 14.6039 18.6407 10.042 18.6407V18.6411ZM14.5819 12.4766C14.3332 12.3527 13.1099 11.7544 12.8816 11.6718C12.6534 11.5891 12.4877 11.5478 12.322 11.7957C12.1563 12.0436 11.6793 12.6011 11.5342 12.7658C11.389 12.9311 11.2438 12.9515 10.9951 12.8275C10.7463 12.7036 9.94461 12.4424 8.99395 11.5996C8.25433 10.9433 7.75483 10.1333 7.60972 9.88536C7.46456 9.63752 7.59444 9.50359 7.71856 9.38061C7.83028 9.2695 7.96733 9.09144 8.09194 8.94707C8.21661 8.80271 8.25767 8.69923 8.34072 8.53442C8.42383 8.36917 8.38228 8.22486 8.32022 8.10088C8.25811 7.97696 7.76061 6.75895 7.55289 6.2637C7.35089 5.78127 7.14561 5.8468 6.99328 5.83872C6.84811 5.8316 6.68244 5.83018 6.51628 5.83018C6.35011 5.83018 6.08078 5.89191 5.85256 6.13978C5.62433 6.38763 4.98162 6.98641 4.98162 8.20392C4.98162 9.42144 5.87311 10.5986 5.99772 10.7639C6.12233 10.9291 7.75244 13.4282 10.2483 14.5004C10.8418 14.7554 11.3054 14.9078 11.6669 15.0218C12.2628 15.2103 12.8052 15.1838 13.234 15.1201C13.712 15.0489 14.7061 14.5213 14.9133 13.9434C15.1206 13.3655 15.1206 12.8698 15.0585 12.7667C14.9964 12.6637 14.8303 12.6015 14.5815 12.4776L14.5819 12.4766Z"
                      fill="#25D366"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_53_3095">
                      <rect
                        width="20"
                        height="20"
                        fill="white"
                        transform="translate(0 0.5)"
                      />
                    </clipPath>
                  </defs>
                </svg>
                <p className="text-gray-900 text-[0.9rem]">Pairing Code</p>
              </div>
              {pairingCode?.code ? <p className="text-gray-600 text-[0.8rem] leading-8">{pairingCode.code}</p> : <></>}
            </>
          )}
        </div>
      </div>

      <div>
        <Button onClick={handleClose} primary className="w-full">
          Done
        </Button>
      </div>
    </div>
  )
}