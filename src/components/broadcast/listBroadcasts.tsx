// components/ListBroadcasts.tsx
import React, { useState } from "react";
import Default from "../default/default";
import BroadCastMessageTable from "./broadcastTable";

function Img() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M19.1667 2.85806C19.1667 1.70065 18.0159 0.895622 16.9287 1.29238L10.847 3.51164L4.74014 3.98917C3.00527 4.12483 1.66667 5.57219 1.66667 7.31236V8.52141C1.66667 10.2616 3.00527 11.7089 4.74014 11.8446L5.08397 11.8715L5.6704 16.9659C5.81478 18.2202 6.87668 19.1669 8.13923 19.1669C9.62854 19.1669 10.7834 17.8659 10.6068 16.3871L10.1146 12.2649L10.847 12.3221L16.9287 14.5414C18.0159 14.9381 19.1667 14.1331 19.1667 12.9757V2.85806ZM4.87007 5.65076L10.1923 5.23459V10.5992L4.87007 10.183C4.00264 10.1152 3.33333 9.39149 3.33333 8.52141V7.31236C3.33333 6.44228 4.00264 5.71859 4.87007 5.65076ZM17.5 12.9757L11.859 10.9172V4.91654L17.5 2.85806L17.5 12.9757ZM7.32614 16.7754L6.77688 12.0039L8.42026 12.1324L8.95192 16.5847C9.01007 17.0717 8.62973 17.5002 8.13923 17.5002C7.72342 17.5002 7.37369 17.1884 7.32614 16.7754Z"
        fill="white"
      />
    </svg>
  );
}

interface ListProps {
  lists: string[];
}

interface TableRow {
  message: string;
  lists: string[];
  inQueue: number;
  delivered: number;
  failed: number;
  paused: number;
  sentToQueue: string;
  deliveredTime: string;
  actions: string;
}

function ListBroadcasts() {
  const [showTable, setShowTable] = useState(true);

  const headers = [
    { title: "Message", field: "message" },
    { title: "Lists", field: "lists" },
    { title: "In Queue", field: "inQueue" },
    { title: "Delivered", field: "delivered" },
    { title: "Failed", field: "failed" },
    { title: "Paused", field: "paused" },
    { title: "Sent To Queue", field: "sentToQueue" },
    { title: "Delivered Time", field: "deliveredTime" },
    { title: "Actions", field: "actions" },
  ];

  const data = [
    {
      message: "Sample message",
      lists: ["List1", "List2"],
      inQueue: 100,
      delivered: 90,
      failed: 5,
      paused: 0,
      sentToQueue: "12 Feb 2024 at 12:34",
      deliveredTime: "12 Feb 2024 at 12:34",
      actions: "View",
    },
    // More rows...
  ];

  return (
    <div>
      {/* <h2>List Broadcasts</h2> */}
      {/* Your List Broadcasts content here */}
      {showTable ? (
        <div className="mt-8">
          <BroadCastMessageTable data={data} headers={headers} />
        </div>
      ) : (
        <Default
          src="/phone.jpg"
          btn={true}
          imgE={<Img />}
          btnText="Send Broadcast"
          primary={true}
          alt="list"
          height={100}
          width={100}
          mainText="No Broadcast sent"
          subText="send a broadcast message to view them here"
        />
      )}
    </div>
  );
}

export default ListBroadcasts;
