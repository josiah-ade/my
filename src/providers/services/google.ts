import { ContactAccount } from "@/typings/interface/account";
import axios from "axios";

interface IGoogleContact {
  names: { displayName: string }[];
  phoneNumbers: { canonicalForm: string }[];
  emailAddresses: { value: string }[];
}
export async function getGoogleContacts(accessToken: string): Promise<ContactAccount[]> {
  const axiosClient = axios.create();
  return axiosClient
    .get("https://people.googleapis.com/v1/people/me/connections?personFields=names,emailAddresses,phoneNumbers", {
      headers: { Authorization: `Bearer ${accessToken}` },
    })
    .then((res) => {
      const formattedValue = res.data.connections.map((value: IGoogleContact) => {
        return {
          name: value.names?.[0]?.displayName ?? "..",
          email: value.emailAddresses[0].value ?? "",
          phoneNumber: value.phoneNumbers?.[0]?.canonicalForm?.slice(1) ?? "..",
        };
      });
      return formattedValue;
    })
    .catch((error) => {
      console.log(error);
    });
}
