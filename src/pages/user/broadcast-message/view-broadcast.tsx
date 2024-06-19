import Breadcrumb from "@/components/breadcrumb/breadcrumb";
import ViewBroadcastTable from "@/components/broadcast/viewBroadcastTable";
import UserLayout from "@/layout/user";
import React, { useState } from "react";

export default function ViewBroadcast() {
  const broadcastData = {
    avatarUrl: "/futurelabs.jpg",
    message:
      "Figma is a powerful, collaborative design tool for teams. Explore ideas and gather feedback, build realistic prototypes, and streamline product development with...",
    sentFrom: "+234 915 776 9224",
    timeQueued: "12 Feb 2024 at 12:34",
    timeDelivered: "12 Feb 2024 at 12:34",
    totalDelivered: 61,
    totalInQueue: 200,
    totalFailed: 0,
    totalPaused: 0,
  };

  const data = [
    {
      receiver: "+234 914 543 2324",
      timeSent: "12 Feb 2024 at 12:34",
      status: "Delivered",
      timeRead: "",
      comment: "Delivered Successfully",
    },
    {
      receiver: "+234 914 543 2324",
      timeSent: "12 Feb 2024 at 12:34",
      status: "Paused",
      timeRead: "",
      comment: "why it paused",
    },
    {
      receiver: "+234 914 543 2324",
      timeSent: "12 Feb 2024 at 12:34",
      status: "Failed",
      timeRead: "",
      comment: "why it failed",
    },
    {
      receiver: "+234 914 543 2324",
      timeSent: "12 Feb 2024 at 12:34",
      status: "Read",
      timeRead: "12 Feb 2024 at 12:34",
      comment: "Delivered Successfully",
    },
    {
      receiver: "+234 914 543 2324",
      timeSent: "12 Feb 2024 at 12:34",
      status: "Read",
      timeRead: "12 Feb 2024 at 12:34",
      comment: "Delivered Successfully",
    },
    {
      receiver: "+234 914 543 2324",
      timeSent: "12 Feb 2024 at 12:34",
      status: "Read",
      timeRead: "12 Feb 2024 at 12:34",
      comment: "Delivered Successfully",
    },
    {
      receiver: "+234 914 543 2324",
      timeSent: "12 Feb 2024 at 12:34",
      status: "Read",
      timeRead: "12 Feb 2024 at 12:34",
      comment: "Delivered Successfully",
    },
    {
      receiver: "+234 914 543 2324",
      timeSent: "12 Feb 2024 at 12:34",
      status: "Read",
      timeRead: "12 Feb 2024 at 12:34",
      comment: "Delivered Successfully",
    },
    {
      receiver: "+234 914 543 2324",
      timeSent: "12 Feb 2024 at 12:34",
      status: "Read",
      timeRead: "12 Feb 2024 at 12:34",
      comment: "Delivered Successfully",
    },
    // Add more data rows as needed
  ];

  return (
    <UserLayout>
      <Breadcrumb />
      <section>
        <div className="mt-4">
          <h2 className="text-xl font-bold">Broadcast Overview</h2>
          <p className="text-gray-600 text-base">
            view your broadcast messages from here
          </p>
        </div>

        <div className="mt-4">
          <div className="bg-white shadow-md rounded-lg p-4 md:flex justify-between  space-x-8">
            <section className="w-full lg:w-[50%] flex">
              <div>
                <img
                  src={broadcastData.avatarUrl}
                  alt="Avatar"
                  className="w-16 h-16 rounded-full mr-4"
                />
              </div>
              <div className="flex-1">
                <div className="text-sm font-bold mb-2 text-gray-600">
                  BROADCAST MESSAGE
                </div>
                <p className="text-gray-500 text-xs">{broadcastData.message}</p>
              </div>
            </section>
            <section className="w-full lg:w-[50%] ">
              <div className="text-sm text-gray-500 lg:flex lg:justify-between">
                <div>
                  <p className="font-bold text-sm text-gray-600">SENT FROM:</p>{" "}
                  <p className="text-xs text-500">{broadcastData.sentFrom}</p>
                </div>
                <div>
                  <p className="font-bold text-sm text-gray-600">
                    TIME QUEUED:
                  </p>{" "}
                  <p className="text-xs text-500">{broadcastData.timeQueued}</p>
                </div>
                <div>
                  <p className="font-bold text-sm text-gray-600">
                    TIME DELIVERED:
                  </p>{" "}
                  <p className="text-xs text-500">
                    {broadcastData.timeDelivered}
                  </p>
                </div>
              </div>
            </section>
          </div>
          <div className="grid grid-cols-4 gap-4 mt-4 text-center">
            <div className="bg-white shadow-md rounded-lg p-4">
              <p className="text-md font-bold text-gray-600">Total Delivered</p>
              <p className="text-sm text-gray-500">
                {broadcastData.totalDelivered}
              </p>
            </div>
            <div className="bg-white shadow-md rounded-lg p-4">
              <p className="text-md font-bold text-gray-600">Total Failed</p>
              <p className="text-sm">{broadcastData.totalFailed}</p>
            </div>
            <div className="bg-white shadow-md rounded-lg p-4">
              <p className="text-md font-bold text-gray-600">Total Paused</p>
              <p className="text-sm">{broadcastData.totalPaused}</p>
            </div>
            <div className="bg-white shadow-md rounded-lg p-4">
              <p className="text-md font-bold text-gray-600">Total in Queue</p>
              <p className="text-sm">{broadcastData.totalInQueue}</p>
            </div>
          </div>
        </div>

        <div className="mt-4">
          <ViewBroadcastTable data={data} />
        </div>
      </section>
    </UserLayout>
  );
}
