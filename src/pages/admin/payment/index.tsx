import Button from "@/shared/components/common/button/button";
import TextInput from "@/shared/components/common/input/textInput";
import AdminLayout from "@/shared/layouts/admin";
import React from "react";
import { FaSearch } from "react-icons/fa";

export default function PaymentPage() {
  return (
    <div>
      <section>
        <h2 className="text-xl font-bold text-[1.3rem]">Payments</h2>
        <p className="text[0.9rem]">View platform transaction history</p>
      </section>
      <section className="mt-12 flex w-full justify-between items-center">
        <div className="border border-gray-100 w-full py-4 px-6 rounded-lg">
          <p className="text-[1rem]">Platform Wallet Balance</p>
          <h2 className="text-xl font-bold text-[1.3rem] mt-2">NGN 1.250m</h2>
        </div>
        <div className="flex justify-end w-full relative right-8">
          <Button primary isLoading>
            Export Transaction History
          </Button>
        </div>
      </section>
      <section className="flex justify-end mt-4">
        <TextInput name="search" prefixIcon={<FaSearch />} className="w-[40%] text-gray-400" placeholder="Search" />
      </section>
    </div>
  );
}

PaymentPage.Layout = AdminLayout;
