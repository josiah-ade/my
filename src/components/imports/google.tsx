import AccountForm from "../contacts/accountcontact/accountcontact";
import useGoogleAuthState from "@/providers/stores/googleAuthStore";
import GoogleSignInButton from "../contacts/googleSignInButton";
import { useGetGoogleContacts } from "@/providers/hooks/query/google";
import EmptyState from "../common/empty/empty";
import { IBroadcastLists } from "@/typings/interface/broadcasts";
import HeaderSection from "./headerSection";

interface IProps {
  selectedList?: IBroadcastLists;
  selectedAutomationDay?: number;
}

const title = "Import from Google Contacts";
const text = "Import contact details from google contacts";

export default function Google({ selectedList, selectedAutomationDay }: IProps) {
  const { authData } = useGoogleAuthState();
  const { data } = useGetGoogleContacts(authData.accessToken ?? "", { enabled: !!authData.accessToken });

  return (
    <section className="mt-20">
      {authData.accessToken ? (
        <AccountForm
          title={`Import from Google Contacts`}
          titleClass="text-xl"
          selectedAutomationDay={selectedAutomationDay}
          selectedList={selectedList}
          text={`Import contact details from google contacts`}
          btnText={`Import Contacts`}
          contactAccount={data ?? []}
        />
      ) : (
        <div>
          <HeaderSection title={title} text={text} />
          <EmptyState
            action={() => <GoogleSignInButton id="connect" />}
            title="Connect a google account"
            text="connect a google account you want to import your contacts from"
          />
        </div>
      )}
    </section>
  );
}
