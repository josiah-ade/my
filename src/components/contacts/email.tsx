import React, { useEffect, useState } from "react";
import { emaillist } from "@/core/const/tab/email";
import Link from "next/link";
import TabLists from "./tab/tabdetail";
import GoogleSignIn from "../Test";
import useGoogleAuthState from "@/providers/stores/googleAuthStore";
import AccountForm from "./accountcontact/accountcontact";
import axios from "axios";

export default function EmailList() {
  const [formatedData, setFormatedData] = useState();
  const { Google } = useGoogleAuthState();

  useEffect(() => {
    if (Google.length > 0 && Google[0]?.accessToken != "") {
      axios
        .get("https://people.googleapis.com/v1/people/me/connections?personFields=names,emailAddresses,phoneNumbers", {
          headers: {
            Authorization: `Bearer ${Google[0]?.accessToken}`,
          },
        })
        .then((res) => {
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
  }, [Google.length]);
  return (
    <div className="grid">
      {/* grid-cols-[repeat(auto-fill,minmax(22rem,1fr))] mt-5 */}
      {Google[0]?.accessToken != "" ? (
        <AccountForm contactAcount={formatedData ?? []} />
      ) : (
        <div className="flex justify-center items-center h-[20rem]">
          <GoogleSignIn />
        </div>
      )}

      {/* <section>
        {emaillist.map((item) => (
          <Link href={`/user/contacts/${item.id}`} key={item.id} className="border p-5 rounded-[0.6rem] w-full">
            <TabLists
              icon={item.icon}
              phone={item.phone}
              description={item.description}
              total={item.total}
              totaldescription={item.totaldescription}
              path={item.path}
            />
          </Link>
        ))}
      </section> */}
    </div>
  );
}
