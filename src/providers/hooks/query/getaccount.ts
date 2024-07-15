import {
  getAccount,
  getGroupAccount,
  getQrCodeUserAccount,
  getSingleAccount,
  getUserStatusAccount,
  getUsercontactAccount,
  getGroupDetails,
  getGroupContacts,
  getpairingCodeUserAccount,
} from "@/providers/services/account";
import {
  ContactAccount,
  IAccount,
  IContact,
  IFileData,
  IGroupAccount,
  IPairing,
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

export function useGetSingleUsersAcount(id: string, options: IQueryOptions = {}) {
  const singleuser: IQueryArgs<string, IAccount> = {
    key: ["singleuser", { id }],
    callback: () => getSingleAccount(id),
  };
  return useGetResourcesQuery(singleuser, options);
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
export function useGetPairingcodeUsersAcount(id: string) {
  const pairingCode: IQueryArgs<string, IPairing> = {
    key: ["pair_code", { id }],
    callback: () => getpairingCodeUserAccount(id),
  };
  return useGetResourcesQuery(pairingCode, {
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

export function useGetAccountContacts(id: string, options: IQueryOptions = {}) {
  const contactQuery: IQueryArgs<string, ContactAccount[]> = {
    key: ["contactaccount", { id }],
    callback: () => getUsercontactAccount(id),
  };
  return useGetResourcesQuery(contactQuery, options);
}
export function useGetGroupAccount(id: string, options: IQueryOptions = {}) {
  const GroupAcount: IQueryArgs<string, IGroupAccount[]> = {
    key: ["qr_code", { id }],
    callback: () => getGroupAccount(id),
  };
  return useGetResourcesQuery(GroupAcount, options);
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
