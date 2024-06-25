import React, { useState, useEffect } from "react";
import Button from "../button/button";
import Table from "../table/index";
import { WhatsappContact } from "@/core/types/data.interface";
import { TableHeader } from "@/typings/interface/component/table";
import { useGetUsersContactAcount, useGetUsersAcount } from "@/providers/hooks/query/getaccount";
import { useParams } from "next/navigation";
import AccountForm from "../contacts/accountcontact/accountcontact";

interface whatsappNumber {
  id: string;
}
export default function Whatsapp(props: whatsappNumber) {
  const { id } = props;
  // const { id } = useParams() ?? {};
  const [search] = useState(true);
  const { data: contactAcount, loading: contactLoader } = useGetUsersContactAcount(id as string);
  // const { data: accounts } = useGetUsersAcount({ loadingConfig: { displayLoader: true } });
  // const filterConnectedAccount = accounts?.filter((item) => {
  //   return item.phoneNumber === id;
  // });

  // useEffect(() => {
  //   const { data: contactAcount, loading: contactLoader } = useGetUsersContactAcount(id as string);
  // }, [id]);

  return (
    <section className="mt-20">
      {/* <section className="flex justify-between items-center">
        <div>
          <h2 className="text-lg font-bold">Import WhatsApp Phone Contacts </h2>
          <p className="text-gray-600 text-sm">import contact details from your whatsapp account</p>
        </div>
        <div>
          <Button primary>Import 35 contacts</Button>
        </div>
      </section> */}

      <section>
        {/* <Table
          //   setIsOpen={setIsOpen}
          //   isOpen={isOpen}
          headers={headers}
          data={contactAcount ?? []}
          search={search}
          //   actions={actions}
        /> */}
        <AccountForm
          text={`Import WhatsApp Phone Contacts`}
          title={`import contact details from your whatsapp account`}
          contactAcount={contactAcount ?? []}
          btnText={`Import contacts`}
        />
      </section>
    </section>
  );
}
