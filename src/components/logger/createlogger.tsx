import React, { useState } from "react";
import TextInput from "../input/textInput";
import { ICreateTemplate } from "@/typings/interface/templates";
import MessageForm from "../broadcast/messageForm";
import Button from "@/components/button/button";

function CreateLogger() {
  const [userData, setUserData] = useState<ICreateTemplate>({
    name: "",
    text: "",
    files: [],
  });
  const handleChange = (name: keyof ICreateTemplate, value: string) => {
    setUserData({ ...userData, [name]: value });
  };
  const handleSave = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };
  return (
    <form onSubmit={handleSave}>
      <section>
        <div>
          <TextInput
            name="name"
            value={userData.name}
            label="Template Name"
            placeholder={"Enter Name"}
            onChange={(value) => handleChange("name", value)}
          />
        </div>
        <div className="mt-5">
          <MessageForm
            onChange={({ value }) => handleChange("text", value)}
            formValue={userData.text}
            broadcastType={""}
          />
        </div>
        <div className="mt-5">
          <Button
            disabled={!userData.name.length}
            type="submit"
            className="bg-primary text-white text-center text-sm w-full"
          >
            Save Template
          </Button>
        </div>
      </section>
    </form>
  );
}

export default CreateLogger;
