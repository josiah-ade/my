import React, { useEffect, useState } from "react";
import { emaillist } from "@/core/const/tab/email";
import Link from "next/link";
import TabLists from "./tab/tabdetail";
import GoogleSignInButton from "./googleSignInButton";
import useGoogleAuthState from "@/providers/stores/googleAuthStore";
import AccountForm from "./accountcontact/accountcontact";
import axios from "axios";
import { useGetGoogleContacts } from "@/providers/hooks/query/google";
import EmptyState from "../common/empty/empty";
import Default from "../default/default";

export default function GoogleContacts() {
  const { authData } = useGoogleAuthState();

  const { data } = useGetGoogleContacts(authData.accessToken ?? "", { enabled: !!authData.accessToken });

  return (
    <div className="grid">
      {authData.accessToken ? (
        <AccountForm contactAccount={data ?? []} />
      ) : (
        <div className="flex justify-center items-center h-[20rem]">
          <EmptyState
            action={() => <GoogleSignInButton />}
            title="Connect a google account"
            text="connect a google account you want to import your contacts from"
          />
        </div>
      )}
    </div>
  );
}
