import React, { useState } from "react";
import Breadcrumb from "@/components/breadcrumb/breadcrumb";
import Button from "@/components/button/button";
import Default from "@/components/default/default";
import Table from "@/components/table";
import UserLayout from "@/layout/user";
import { TableHeader } from "@/typings/interface/component/table";
import SingleBroadcastTableAction from "@/components/broadcast/singleTableAction";
import { IBroadcastContact } from "@/typings/interface/broadcasts";
import { dateFormatter } from "@/core/formatters/dateFormatter";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useGetBroadcastDetail } from "@/providers/hooks/query/getbroadcast";
import { useGetBroadcastContact } from "@/providers/hooks/query/getcontact";
import EmptyState from "@/components/common/empty/empty";
import { UserRoutes } from "@/core/const/routes.const";

export default function NewCustomer({}) {
  const { id } = useParams() ?? {};

  const { data: broadcastDetail, status, error } = useGetBroadcastDetail(id as string);
  const { data: contacts } = useGetBroadcastContact(id as string);

  const headers: TableHeader<IBroadcastContact>[] = [
    { field: "phoneNumber", title: "Phone Number" },
    { field: "name", title: "Name" },
    { field: "dateJoined", title: "Date Joined", formatter: dateFormatter },
    { field: "automationDay", title: "Automation Day" },
    {
      field: "action",
      title: "Actions",
      action: {
        component: SingleBroadcastTableAction,
      },
    },
  ];

  return (
    <UserLayout>
      <Breadcrumb />

      {broadcastDetail ? (
        <div className="block md:flex max-md:space-y-4 mt-2 md:mt-0 justify-between">
          <section className="mt-4">
            <h2 className="text-xl font-bold"> {broadcastDetail.listName} </h2>
            <p className="text-gray-600 text-base"> {broadcastDetail.description} </p>
          </section>
          <section className="flex items-center space-x-6">
            <Link href={`${UserRoutes.BROADCAST}/${id}/import`}>
              <Button className="border-2 border-primary text-primary text-sm">Import</Button>
            </Link>
            <Link href={UserRoutes.BROADCAST_MESSAGE_SEND}>
              <Button className="py-2" primary>
                Send Broadcast
              </Button>
            </Link>
          </section>
        </div>
      ) : (
        <>
          {status == "error" ? (
            <div className="mt-4">
              <h2 className="font-bold"> Failed to load details </h2>
              <p className="text-error-500 text-sm"> {(error as Error).message} </p>
            </div>
          ) : (
            <></>
          )}
        </>
      )}

      <div className="">
        {contacts && contacts.length ? (
          <section className="">
            <Table search={true} headers={headers} data={contacts} />
          </section>
        ) : (
          <EmptyState />
        )}
      </div>
    </UserLayout>
  );
}
