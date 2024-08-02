import Breadcrumb from "@/components/breadcrumb/breadcrumb";
import EmptyState from "@/components/common/empty/empty";
import Table from "@/components/table";
import { DisplayDataTimeFormatOptions } from "@/core/const/formatOptions";
import { dateFormatter } from "@/core/formatters/dateFormatter";
import UserLayout from "@/layout/user";
import { useGetBroadcastMessagesDetail, useGetBroadcastMessagesList } from "@/providers/hooks/query/getmessage";
import { TableHeader } from "@/typings/interface/component/table";
import { useParams } from "next/navigation";
import React, { useState } from "react";

const avatarUrl = "/futurelabs.jpg";

export default function ViewBroadcast() {
  const { id } = useParams() ?? {};
  const { data: messageDetails, loading: detailLoader } = useGetBroadcastMessagesDetail(id as string);
  const { data: listItems, loading: listLoader } = useGetBroadcastMessagesList(id as string);

  const headers: TableHeader[] = [
    { title: "Receiver", field: "receiverNumber" },
    {
      title: "Time Sent",
      field: "sentTime",
      formatter: (val) => dateFormatter(val, DisplayDataTimeFormatOptions),
    },
    { title: "Status", field: "status", type: "chip" },
    {
      title: "Delivered Time",
      field: "deliveredTime",
      formatter: (val) => dateFormatter(val ?? "--", DisplayDataTimeFormatOptions),
    },
    { title: "Comment", field: "comment" },
  ];

  return (
    <UserLayout>
      <Breadcrumb />
      <section>
        <div className="mt-4">
          <h2 className="text-xl font-bold">Broadcast Overview</h2>
          <p className="text-gray-600 text-base">view your broadcast messages from here</p>
        </div>
        {!detailLoader && messageDetails ? (
          <div className="mt-4">
            <div className="bg-gray-75 rounded-lg p-4 md:flex justify-between  space-x-8">
              <section className="w-full lg:w-[50%] flex">
                <div>
                  <img src={avatarUrl} alt="Avatar" className="w-16 h-16 rounded-full mr-4" />
                </div>
                <div className="flex-1">
                  <div className="text-sm font-bold mb-2 text-gray-600">BROADCAST MESSAGE</div>
                  <p className="text-gray-500 text-xs">{messageDetails.text}</p>
                </div>
              </section>
              <section className="w-full lg:w-[50%] ">
                <div className="text-sm text-gray-500 lg:flex lg:justify-between">
                  <div>
                    <p className="font-bold text-sm text-gray-600">SENT FROM:</p>{" "}
                    <p className="text-xs text-500">{messageDetails.account.phoneNumber}</p>
                  </div>
                  <div>
                    <p className="font-bold text-sm text-gray-600">TIME QUEUED:</p>{" "}
                    <p className="text-xs text-500">
                      {dateFormatter(messageDetails.queuedTime ?? "", DisplayDataTimeFormatOptions)}
                    </p>
                  </div>
                  <div>
                    <p className="font-bold text-sm text-gray-600">TIME DELIVERED:</p>{" "}
                    <p className="text-xs text-500">
                      {dateFormatter(messageDetails.completedTime ?? "", DisplayDataTimeFormatOptions)}
                    </p>
                  </div>
                </div>
              </section>
            </div>
            <div className="grid grid-cols-4 gap-4 mt-4">
              <div className="border border-gray-200 rounded-lg p-4">
                <p className="text-md text-gray-600">Total Delivered</p>
                <p className="text-xl font-semibold text-[#344054]">
                  {messageDetails.stats["sent"] ?? "--"} / {messageDetails.totalMessages}{" "}
                </p>
              </div>
              <div className="border border-gray-200 rounded-lg p-4">
                <p className="text-md text-gray-600">Total Failed</p>
                <p className="text-xl font-semibold text-[#344054]">{messageDetails.stats["failed"] ?? "--"}</p>
              </div>
              <div className="border border-gray-200 rounded-lg p-4">
                <p className="text-md text-gray-600">Total Paused</p>
                <p className="text-xl font-semibold text-[#344054]">{messageDetails.stats["paused"] ?? "--"}</p>
              </div>
              <div className="border border-gray-200 rounded-lg p-4">
                <p className="text-md text-gray-600">Total in Queue</p>
                <p className="text-xl font-semibold text-[#344054]">{messageDetails.stats["pending"] ?? "--"}</p>
              </div>
            </div>
          </div>
        ) : (
          <EmptyState />
        )}

        <div className="mt-4">{listItems ? <Table headers={headers} data={listItems} /> : <EmptyState />}</div>
      </section>
    </UserLayout>
  );
}
