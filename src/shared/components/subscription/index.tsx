import React from "react";
import TextInput from "../common/input/textInput";
import Select from "../common/input/selectInput";
import {
  subscriptionLimitMessagesOptions,
  subscriptionLimitOptions,
} from "@/core/const/subscriptionpackagedata/select";
import ToggleButton from "../common/button/toggleButton";

function CreateSubscriptionComponent() {
  return (
    <div>
      <div className="grid">
        <div className="w-full sm:w-full md:w-full lg:w-[70%] xl:w-[70%]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <TextInput label="Package Name" name="name" placeholder="Package Name" />
            <TextInput label="Package Amount Weekly" name="amount_weekly" placeholder="Amount Weekly" />
            <TextInput label="Package Amount Monthly" name="amount_monthly" placeholder="Amount Monthly" />
            <TextInput label="Package Amount Yearly" name="amount_yearly" placeholder="Amount Yearly" />
          </div>
          <div className="mt-8">
            <h4 className="text-lg font-semibold">Package Details</h4>
            <div className="mt-5">
              <div className="flex justify-between mb-7 pb-7 border-b border-gray-100">
                <Select
                  className="w-[200px]"
                  name="linked_accounts"
                  label="1. Linked Accounts"
                  options={subscriptionLimitOptions}
                  controlField="id"
                  displayField="name"
                  value={subscriptionLimitOptions[0].id}
                />
                <ToggleButton isActive />
              </div>
              <div className="flex justify-between mb-7 pb-7 border-b border-gray-100">
                <Select
                  className="w-[200px]"
                  name="team_limit"
                  label="2. Team Limit"
                  options={subscriptionLimitOptions}
                  controlField="id"
                  displayField="name"
                  value={subscriptionLimitOptions[3].name}
                />
                <ToggleButton isActive />
              </div>
              <div className="flex justify-between mb-7 pb-7 border-b border-gray-100">
                <Select
                  className="w-[200px]"
                  name="contact_messaging"
                  label="3. Contact Messaging Limit"
                  options={subscriptionLimitMessagesOptions}
                  controlField="id"
                  displayField="name"
                  value={subscriptionLimitMessagesOptions[4].id}
                />
                <ToggleButton isActive />
              </div>
              <div className="flex justify-between mb-7 pb-7 border-b border-gray-100">
                <Select
                  className="w-[200px]"
                  name="contact_import"
                  label="4. Contact Import"
                  options={subscriptionLimitOptions}
                  controlField="id"
                  displayField="name"
                  value={subscriptionLimitOptions[0].id}
                />
                <ToggleButton isActive />
              </div>
              <div className="flex justify-between mb-7 pb-7 border-b border-gray-100">
                <Select
                  className="w-[200px]"
                  name="broadcast_list"
                  label="5. Broadcast List Limit"
                  options={subscriptionLimitOptions}
                  controlField="id"
                  displayField="name"
                  value={subscriptionLimitOptions[0].id}
                />
                <ToggleButton isActive />
              </div>
              <div className="flex justify-between mb-7 pb-7 border-b border-gray-100">
                <Select
                  className="w-[200px]"
                  name="form"
                  label="6. Form Limit"
                  options={subscriptionLimitOptions}
                  controlField="id"
                  displayField="name"
                  value={subscriptionLimitOptions[0].id}
                />
                <ToggleButton isActive />
              </div>
              <div className="flex justify-between mb-7 pb-7 border-b border-gray-100">
                <Select
                  className="w-[200px]"
                  name="chatbots"
                  label="7. Chatbots"
                  options={subscriptionLimitOptions}
                  controlField="id"
                  displayField="name"
                  value={subscriptionLimitOptions[0].id}
                />
                <ToggleButton isActive />
              </div>
              <div className="flex justify-between mb-7 pb-7 border-b border-gray-100">
                <Select
                  className="w-[200px]"
                  name="group_automation"
                  label="8. Groups in Automation Limit"
                  options={subscriptionLimitOptions}
                  controlField="id"
                  displayField="name"
                  value={subscriptionLimitOptions[0].id}
                />
                <ToggleButton isActive />
              </div>
              <div className="flex justify-between mb-7 pb-7 border-b border-gray-100">
                <Select
                  className="w-[200px]"
                  name="automation_messages"
                  label="9. Automation Messages"
                  options={subscriptionLimitMessagesOptions}
                  controlField="id"
                  displayField="name"
                  value={subscriptionLimitMessagesOptions[5].id}
                />
                <ToggleButton isActive />
              </div>
              <div className="flex justify-between mb-7 pb-7 border-b border-gray-100">
                <div>
                  <label className="text-gray-900 text-sm font-medium">10. Media Support</label>
                  <div className="flex">
                    <div className="flex mt-5 mr-5">
                      <span className="mr-3 text-sm font-normal">MP4</span>
                      <ToggleButton isActive />
                    </div>
                    <div className="flex mt-5 mr-5">
                      <span className="mr-3 text-sm font-normal">MP3</span>
                      <ToggleButton />
                    </div>
                    <div className="flex mt-5 mr-5">
                      <span className="mr-3 text-sm font-normal">PDF</span>
                      <ToggleButton />
                    </div>
                    <div className="flex mt-5 mr-5">
                      <span className="mr-3 text-sm font-normal">DOCX</span>
                      <ToggleButton />
                    </div>
                    <div className="flex mt-5 mr-5">
                      <span className="mr-3 text-sm font-normal">CSV</span>
                      <ToggleButton />
                    </div>
                  </div>
                </div>
                <ToggleButton isActive />
              </div>
              <div className="flex justify-between mb-7 pb-7 border-b border-gray-100">
                <div>
                  <label className="text-gray-900 text-sm font-medium">11. Platform Support</label>
                  <div className="flex">
                    <div className="flex mt-5 mr-5">
                      <span className="mr-3 text-sm font-normal">WhatsApp</span>
                      <ToggleButton isActive />
                    </div>
                    <div className="flex mt-5 mr-5">
                      <span className="mr-3 text-sm font-normal">WhatsApp Business</span>
                      <ToggleButton isActive />
                    </div>
                  </div>
                </div>
                <ToggleButton isActive />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateSubscriptionComponent;
