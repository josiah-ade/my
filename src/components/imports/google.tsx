import React, { useState, useEffect } from "react";
import Button from "../button/button";
import Table from "../table/index";
import { WhatsappContact } from "@/core/types/data.interface";
import Default from "../default/default";
import { TableHeader } from "@/typings/interface/component/table";
import AccountForm from "../contacts/accountcontact/accountcontact";
import { useGetUsersContactAcount } from "@/providers/hooks/query/getaccount";
import useGoogleAuthState from "@/providers/stores/googleAuthStore";
import GoogleSignIn from "../Test";
import axios from "axios";
import { Contact } from "@/typings/interface/contacts";

interface WhatsappNumber {
  id: string;
}
export default function Google(props: WhatsappNumber) {
  const { id } = props;
  const [search] = useState(true);
  const [showTable, setShowTable] = useState(true);
  const [formatedData, setFormatedData] = useState();
  const { Google } = useGoogleAuthState();
  // const { data: contactAcount, loading: false } = useGetUsersContactAcount(id as string);

  useEffect(() => {
    if (Google.length > 0 && Google[0]?.accessToken != "") {
      axios
        .get("https://people.googleapis.com/v1/people/me/connections?personFields=names,emailAddresses,phoneNumbers", {
          headers: {
            Authorization: `Bearer ${Google[0]?.accessToken}`,
          },
        })
        .then((res) => {
          console.log(res);
          const formatedValue = res.data.connections.map(
            (value: { names: { displayName: string }[]; phoneNumbers: { canonicalForm: string }[] }) => {
              return {
                name: value.names?.[0]?.displayName ?? "..",
                // email: item.emailAddresses[0].value,
                phoneNumber: value.phoneNumbers?.[0]?.canonicalForm ?? "..",
              };
            }
          );
          setFormatedData(formatedValue);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [formatedData, Google.length]);

  const headers: TableHeader[] = [
    { field: "phoneNumber", title: "Phone Number", icon: "/chevron.jpg" },
    {
      field: "name",
      title: "Name",
      icon: "/chevron.jpg",
    },
    { field: "country", title: "Country", icon: "/chevron.jpg" },
    {
      field: "select",
      title: "Select",
      icon: "/chevron.jpg",
      //   action: { text: "View All", href: "/user/broadcast/import-contact" },
    },
  ];

  return (
    <section className="mt-20">
      {/* <section className="flex justify-between items-center">
        <div>
          <h2 className="text-lg font-bold">Import from Google Contacts</h2>
          <p className="text-gray-600 text-sm">Import contact details from google contacts</p>
        </div>
        <div>
          <Button primary>Import</Button>
        </div>
      </section> */}

      {/* <section>
        {showTable ? (
          <Table
            //   setIsOpen={setIsOpen}
            //   isOpen={isOpen}
            headers={headers}
            data={data}
            search={search}
            //   actions={actions}
          />
        ) : (
          <section className="my-20">
            <Default
              src="/googlelist.png"
              btn={true}
              alt="list"
              height={100}
              width={100}
              mainText="Connect a google account"
              subText="connect a google account you want to import your contacts from"
            />
          </section>
        )}
      </section> */}
      {Google[0]?.accessToken != "" ? (
        <AccountForm
          text={`Import from Google Contacts`}
          title={`Import contact details from google contacts`}
          contactAcount={formatedData ?? []}
        />
      ) : (
        <GoogleSignIn />
      )}
    </section>
  );
}
