import {
  getAccount,
  getGroupAccount,
  getQrCodeUserAccount,
  getSingleAccount,
  getUserStatusAccount,
  getUsercontactAccount,
  getGroupDetails,
  getGroupContacts,
} from "@/providers/services/account";
import {
  ContactAccount,
  IAccount,
  IContact,
  IFileData,
  IGroupAccount,
  Participant,
  UserStatus,
} from "@/typings/interface/account";
import { IQueryArgs, IQueryOptions } from "../../../typings/query";

import { useGetResourcesQuery, usePaginationQuery } from "../helper/query";
import { useAccountStore } from "@/providers/stores/accountStore";

export function useGetUsersAcount(options: IQueryOptions = {}) {
  const setAccount = useAccountStore((state) => state.setAccount);

  const users: IQueryArgs<IAccount, IAccount[]> = {
    key: ["account"],
    callback: () =>
      getAccount().then((res) => {
        setAccount(res);
        return res;
      }),
  };
  return useGetResourcesQuery(users, options);
}

export function useGetSingleUsersAcount(id: string) {
  const singleuser: IQueryArgs<string, IAccount> = {
    key: ["singleuser", { id }],
    callback: () => getSingleAccount(id),
  };
  return useGetResourcesQuery(singleuser);
}

export function useGetQrcodeUsersAcount(id: string) {
  const qrcode: IQueryArgs<string, IFileData> = {
    key: ["qr_code", { id }],
    callback: () => getQrCodeUserAccount(id),
  };
  return useGetResourcesQuery(qrcode, {
    retry: false,
    cacheTime: 0,
    loadingConfig: { displayLoader: false },
  });
}

export function useGetUsersStatusAcount(id: string) {
  const qrcode: IQueryArgs<string, UserStatus> = {
    key: ["qr_code", { id }],
    callback: () => getUserStatusAccount(id),
  };
  return useGetResourcesQuery(qrcode);
}

export function useGetUsersContactAcount(id: string) {
  const contactaccount: IQueryArgs<string, ContactAccount[]> = {
    key: ["contactaccount", { id }],
    callback: () => getUsercontactAccount(id),
  };
  return useGetResourcesQuery(contactaccount);
}
export function useGetGroupAcount(id: string) {
  const GroupAcount: IQueryArgs<string, IGroupAccount[]> = {
    key: ["qr_code", { id }],
    callback: () => getGroupAccount(id),
  };
  return useGetResourcesQuery(GroupAcount);
}

export function useGetSingleGroup(id: string, groupId: string) {
  const singleGroupContact: IQueryArgs<string, IGroupAccount> = {
    key: ["singleGroupContact", { id }],
    callback: () => getGroupDetails(id, groupId),
  };
  return useGetResourcesQuery(singleGroupContact);
}

export function useGetGroupContacts(id: string, groupId: string) {
  const singleGroupContact: IQueryArgs<string, ContactAccount[]> = {
    key: ["singleGroupContact", { groupId }],
    callback: () => getGroupContacts(id, groupId),
  };
  return useGetResourcesQuery(singleGroupContact);
}
