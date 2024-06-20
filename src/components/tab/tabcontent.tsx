import {
    useGetQrcodeUsersAcount,
    useGetUsersAcount,
  } from "@/providers/hooks/query/getaccount";
  import router, { useRouter } from "next/router";
  import Image from "next/image";
import Button from "../button/button";
import { AccountData } from "@/core/types/data.interface";
import { useState, useEffect } from "react";
import { useQuery, useQueryClient } from 'react-query';
import { IAccount } from "@/typings/interface/account";



  
export default function TabContent(props: { currentAccount: IAccount, onClose:()=>void }){
    const queryClient = useQueryClient();
    const[refresh, setRefresh]=useState("")
    const{currentAccount, onClose}=props
    const handleClose =()=>{
        onClose && onClose()
    }

    useEffect(() => {
        const intervalId = setInterval(async () => {
          try {
            const newQrCodeData = getqrimagecode?.expire;
            queryClient.setQueryData(["getQrcodeUsersAcount", currentAccount?.id], newQrCodeData);
          } catch (error) {
            console.error("Error fetching new QR code:", error);
          }
        }, 10000);
        return () => clearTimeout(intervalId);
    }, [])
    // useEffect(() => {
    //     const timer = setTimeout(() => {
    //         getqrimagecode?.expire
    //     }, 1000); 

    //     return () => clearTimeout(timer);
    // }, []);

    const { data: getqrimagecode } = useGetQrcodeUsersAcount(
        currentAccount?.id ?? ""
      );

    return(
        <div className="max-w-md mx-auto bg-white p-6 rounded-lg">
            <h2 className="text-black text-[1.2rem] font-semibold mb-4">
              How to Link with QR code
            </h2>
            <p className="mb-4 text-sm text-black leading-6">
              To link with a QR code, open WhatsApp on your phone, go to the
              settings, and tap on 'Link a Device'. Scan the QR code shown on
              this screen with your phone.
            </p>
            <div className="flex items-center justify-center mb-4">
              <div className=" px-4 py-2 rounded-md text-xl font-mono">
                {getqrimagecode ? (
                  <Image
                    src={getqrimagecode.base64 ?? ""}
                    alt="qr"
                    width={200}
                    height={300}
                  />
                ) : (
                  <></>
                )}
              </div>
            </div>

            <div>
              <Button 
              onClick={handleClose}
              primary className="w-full">
                Done
              </Button>
            </div>
          </div>
    )
}