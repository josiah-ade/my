import React, { useState } from "react";
import Button from "@/components/button/button";
import { Plus } from "@/core/const/icons/icons";
import UserLayout from "@/layout/user";
import { useRouter } from "next/router";
import { useParams } from "next/navigation";
import Breadcrumb from "@/components/breadcrumb/breadcrumb";
import AllFormEntries from "@/components/form/allFormEntries";
import SingleFormEntries from "@/components/form/singleFormEntries";
import { useGetFormDetails } from "@/providers/hooks/query/getform";
import { UserRoutes } from "@/core/const/routes.const";

interface IProb {
  switchTab: (data: string) => void;
  activeTab: string;
  total: number;
}

const Tab = ({ switchTab, total, activeTab }: IProb) => {
  const isAll = activeTab == "all";
  return (
    <div className="flex border-b border-gray-200">
      <button
        className={`p-4 ${activeTab === "all" ? "border-b-2 border-primary text-primary" : ""}`}
        onClick={() => switchTab("all")}
      >
        All Responses{" "}
        {total ? (
          <span
            className={`rounded-full ${
              isAll ? "text-white bg-primary" : "text-gray-700 bg-gray-100 "
            } font-medium ml-2  p-2  text-xs`}
          >
            {total}
          </span>
        ) : null}
      </button>
      <button
        className={`p-4 ${activeTab === "single" ? "border-b-2 border-primary text-primary" : ""}`}
        onClick={() => switchTab("single")}
      >
        Single Responses
      </button>
    </div>
  );
};

export default function ViewEntries() {
  const [activeTab, setActiveTab] = useState("all");

  const { id } = useParams() ?? {};
  const formId = id as string | undefined;

  const { data: formDetail } = useGetFormDetails(formId ?? "");

  const router = useRouter();
  const handleCreateForm = () => {
    router.push(UserRoutes.FORM_CREATE);
  };

  return (
    <UserLayout>
      <Breadcrumb />
      <div className="bg-white mt-4">
        <div className="flex justify-between items-center mb-4">
          <section>
            <h2 className="text-xl font-semibold text-[1.3rem]"> {formDetail?.name ?? "Form Name"} </h2>
            <p className="text[0.9rem]">View Form Submissions</p>
          </section>
          <section className="flex items-center space-x-2">
            <Button
              className="bg-primary text-white px-4 py-2 rounded-lg"
              icon={<Plus />}
              onClick={() => handleCreateForm()}
            >
              Create Form
            </Button>
          </section>
        </div>

        <div>
          <Tab total={formDetail?.entries ?? 0} activeTab={activeTab} switchTab={setActiveTab} />

          {activeTab === "all" && <AllFormEntries formId={formId ?? ""} />}
          {activeTab === "single" && <SingleFormEntries formId={formId ?? ""} />}
        </div>
      </div>
    </UserLayout>
  );
}
