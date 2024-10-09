import { data, headers } from "@/core/const/tabledata/payments";
import Button from "@/shared/components/common/button/button";
import TextInput from "@/shared/components/common/input/textInput";
import PageHeading from "@/shared/components/common/pageSubHead";
import Table from "@/shared/components/table";
import AdminLayout from "@/shared/layouts/admin";
import React from "react";
import { FaSearch } from "react-icons/fa";

export default function PaymentPage() {
  return (
    <div>
      {/* <section>
        <h2 className="font-bold text-[24px] leading-[30px]">Payments</h2>
        <p className="text-[16px] text-gray-600 leading-5">View platform transaction history</p>
      </section> */}
      <PageHeading title="Payments" description="View platform transaction history"/>
      <section className="mt-12 flex w-full justify-between items-center">
        <div className="border border-gray-100 w-full py-3 px-6 rounded-lg">
          <p className="text-[16px] text-gray-500 leading-[23.2px]">Platform Wallet Balance</p>
          <h2 className="font-bold text-[20px] leading-6 mt-2 ">NGN 1.250m</h2>
        </div>
        <div className="flex justify-end w-full relative right-8">
          <Button primary className="cursor-pointer text-sm">
            Export Transaction History
          </Button>
        </div>
      </section>
      <section>
        <Table search={true} headers={headers} data={data} clickable={false} />
      </section>
    </div>
  );
}

PaymentPage.Layout = AdminLayout;
