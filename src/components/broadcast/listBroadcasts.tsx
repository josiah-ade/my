// components/ListBroadcasts.tsx
import React, { useState } from "react";
import Default from "../default/default";
import { useGetBroadcastMessages } from "@/providers/hooks/query/getmessage";
import Table from "../table";
import { TableHeader, TableHeaderActionProp } from "@/typings/interface/component/table";
import { IMessageResponse } from "@/typings/interface/message";
import Link from "next/link";
import { dateFormatter } from "@/core/formatters/dateFormatter";
import { DisplayDataTimeFormatOptions } from "@/core/const/formatOptions";
import { UserRoutes } from "@/core/const/routes.const";
import ListPopover from "../common/dropdown/tabledropdown";
import { useRouter } from "next/router";
import EmptyState from "../common/empty/empty";
import Button from "../button/button";

function Img() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M19.1667 2.85806C19.1667 1.70065 18.0159 0.895622 16.9287 1.29238L10.847 3.51164L4.74014 3.98917C3.00527 4.12483 1.66667 5.57219 1.66667 7.31236V8.52141C1.66667 10.2616 3.00527 11.7089 4.74014 11.8446L5.08397 11.8715L5.6704 16.9659C5.81478 18.2202 6.87668 19.1669 8.13923 19.1669C9.62854 19.1669 10.7834 17.8659 10.6068 16.3871L10.1146 12.2649L10.847 12.3221L16.9287 14.5414C18.0159 14.9381 19.1667 14.1331 19.1667 12.9757V2.85806ZM4.87007 5.65076L10.1923 5.23459V10.5992L4.87007 10.183C4.00264 10.1152 3.33333 9.39149 3.33333 8.52141V7.31236C3.33333 6.44228 4.00264 5.71859 4.87007 5.65076ZM17.5 12.9757L11.859 10.9172V4.91654L17.5 2.85806L17.5 12.9757ZM7.32614 16.7754L6.77688 12.0039L8.42026 12.1324L8.95192 16.5847C9.01007 17.0717 8.62973 17.5002 8.13923 17.5002C7.72342 17.5002 7.37369 17.1884 7.32614 16.7754Z"
        fill="white"
      />
    </svg>
  );
}

function StatusDisplay(props: TableHeaderActionProp<IMessageResponse> & { field: string }) {
  return <span> {props.item?.stats[props.field] ?? "--"} </span>;
}

function ViewButton(props: TableHeaderActionProp<IMessageResponse>) {
  return (
    <Link href={`${UserRoutes.BROADCAST_MESSAGE}/${props.item?.id}`}>
      <p className="text-primary-base font-semibold text-sm cursor-pointer"> View </p>
    </Link>
  );
}

export default function ListBroadcasts() {
  const params = { type: "list" };
  const { data, loading } = useGetBroadcastMessages(params);
  const router = useRouter();
  const handleRouter = () => {
    router.push(UserRoutes.BROADCAST_MESSAGE_SEND);
  };

  const headers: TableHeader<IMessageResponse>[] = [
    { title: "Message", field: "text" },
    { title: "Lists", field: "lists", action: { component: (props) => <ListPopover {...props} /> } },
    { title: "In Queue", field: "inQueue", component: (props) => <StatusDisplay {...props} field="pending" /> },
    { title: "Delivered", field: "delivered", component: (props) => <StatusDisplay {...props} field="sent" /> },
    { title: "Failed", field: "failed", component: (props) => <StatusDisplay {...props} field="failed" /> },
    { title: "Paused", field: "paused", component: (props) => <StatusDisplay {...props} field="paused" /> },
    {
      title: "Sent To Queue",
      field: "queuedTime",
      formatter: (val) => dateFormatter(val, DisplayDataTimeFormatOptions),
    },
    {
      title: "Delivered Time",
      field: "completedTime",
      formatter: (val) => dateFormatter(val, DisplayDataTimeFormatOptions),
    },
    {
      title: "Actions",
      field: "actions",
      action: { component: (props) => <ViewButton {...props} /> },
    },
  ];

  const MAX_MESSAGE_LENGTH = 15;
  const truncatedData = data?.map((item) => ({
    ...item,
    text: item.text.slice(0, MAX_MESSAGE_LENGTH) + (item.text.length > MAX_MESSAGE_LENGTH ? "...." : ""),
  }));

  return (
    <div className="mt-8">
      {!loading && truncatedData?.length ? (
        <Table data={truncatedData} headers={headers} />
      ) : (
        <EmptyState
          imgSrc="/phone.jpg"
          action={() => (
            <Button
              className="bg-primary text-white px-4 py-2 rounded-lg"
              icon={<Img />}
              onClick={() => handleRouter()}
            >
              Send Broadcast
            </Button>
          )}
          title="No Broadcast sent"
          text="send a broadcast message to view them here"
        />
      )}
    </div>
  );
}
