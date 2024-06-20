import { getAccount, getGroupAccount, getQrCodeUserAccount, getSingleAccount, getUserStatusAccount, getUsercontactAccount } from "@/providers/services/account";
import {  ContactAccount, IAccount, IContact, IFileData, IGroupAccount, UserStatus } from "@/typings/interface/account";
import { IAPIFilter, IPaginatedQueryArgs, IQueryArgs } from "../../../typings/query";
import { useGetResourcesQuery, usePaginationQuery } from "../helper/query";
import { AccountData } from "@/core/types/data.interface";
import { Tabdetails } from "@/typings/interface/component/tab/tabdetails";

export function useGetUsersAcount() {
  const users: IQueryArgs<IAccount, IAccount[]> = {
    key: ["account"],
    callback: () => getAccount(),
  };
  return useGetResourcesQuery(users);
}

export function useGetSingleUsersAcount(id:string){
  const singleuser: IQueryArgs<string, IAccount> = {
    key: ["singleuser", {id}],
    callback: () => getSingleAccount(id),
  };
  return useGetResourcesQuery(singleuser);
}

export function useGetQrcodeUsersAcount(id:string) {
  const qrcode: IQueryArgs<string, IFileData> = {
    key: ["qr_code", {id}],
    callback: () => getQrCodeUserAccount(id),
  };
  return useGetResourcesQuery(qrcode);
}
export function useGetUsersStatusAcount(id:string) {
  const qrcode: IQueryArgs<string, UserStatus> = {
    key: ["qr_code", {id}],
    callback: () => getUserStatusAccount(id),
  };
  return useGetResourcesQuery(qrcode);
}

export function useGetUsersContactAcount(id:string) {
  const contactaccount: IQueryArgs<string, ContactAccount[]> = {
    key: ["contactaccount", {id}],
    callback: () => getUsercontactAccount(id),
  };
  return useGetResourcesQuery(contactaccount);
}
export function useGetGroupAcount(id:string) {
  const qrcode: IQueryArgs<string, IGroupAccount[]> = {
    key: ["qr_code", {id}],
    callback: () => getGroupAccount(id),
  };
  return useGetResourcesQuery(qrcode);
}