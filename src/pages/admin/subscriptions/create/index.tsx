import Button from "@/shared/components/common/button/button";
import PageHeading from "@/shared/components/common/pageSubHead";
import CreateSubscriptionComponent from "@/shared/components/subscription";
import AdminLayout from "@/shared/layouts/admin";
import React from "react";

export default function CreateSubscriptionPage() {
  return (
    <div>
      {/* <PageHeading title="Subscriptions" description="Add and manage platform subscriptions package" /> */}
      <section className="flex items-center justify-between">
        <PageHeading title="Create a New Package" description="Create a new subscriptions package" />
        <div className="flex justify-end gap-6">
          <Button className=" text-sm border">Discard</Button>
          <Button primary className=" text-sm">
            Save Package
          </Button>
        </div>
      </section>
      <section className="mt-10">
        <CreateSubscriptionComponent />
      </section>
    </div>
  );
}

CreateSubscriptionPage.Layout = AdminLayout;
