import { ICreateForm } from "@/typings/interface/form";
import React, { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from "react";
import { PiCheck } from "react-icons/pi";
import ToggleButton from "../button/toggleButton";

interface IEnableField {
  terms: boolean;
  footer: boolean;
}

interface IProps {
  setQuestions: Dispatch<SetStateAction<ICreateForm>>;
  questions: ICreateForm;
}

export default function FormConfiguration(props: IProps) {
  const [colors] = useState<string[]>([
    "#1671D9",
    "#0F973D",
    "#F3A218",
    "#D42620",
    "#98A2B3",
    "#20D4D4",
    "#2047D4",
    "#D420CC",
    "#20D488",
  ]);
  const { questions, setQuestions } = props;
  const [activeColor, setActiveColor] = useState<string>(questions.color ?? "");
  const [enabledFields, setEnableFields] = useState<IEnableField>({
    terms: !!questions.TOS,
    footer: !!questions.footerDisclaimer,
  });

  const handleChange = (
    e: ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) => {
    let { name, value } = e.target;
    if (name === "autoResponders") {
      setQuestions({ ...questions, [name]: [value] });
      return;
    }
    // console.log(value, "value");
    setQuestions({ ...questions, [name]: value });
  };

  const handleActiveColor = (item: string) => {
    setActiveColor(item);
    questions.color = item;
    setQuestions({ ...questions });
  };

  const toggleEnableFields = (type: keyof IEnableField) => {
    const questionKey: { [key: string]: keyof ICreateForm } = {
      terms: "TOS",
      footer: "footerDisclaimer",
    };

    const value = !enabledFields[type];
    if (!value) setQuestions((val) => ({ ...val, [questionKey[type]]: "" }));
    setEnableFields((val) => ({ ...val, [type]: value }));
  };

  return (
    <div className="space-y-6">
      <div className="space-y-5 bg-gray-50  py-5 px-7">
        <label className="flex justify-between items-center">
          <span className="font-bold text-lg text-gray-800">Terms and Conditions</span>
          <ToggleButton isActive={enabledFields.terms} onClick={() => toggleEnableFields("terms")} />
        </label>
        {enabledFields.terms && (
          <div>
            <textarea
              name="TOS"
              onChange={(e) => handleChange(e)}
              value={questions.TOS}
              placeholder="input terms and conditions"
              className="w-full mt-2 p-2 border focus:outline-none border-gray-300 rounded-md"
            />
            <p className="text-gray-500 mt-2 text-sm">
              A checkbox will be displayed on your form, for your leads to accept your Terms & Conditions before they
              can submit the form. Leave the toggle off if you don't want the checkbox to appear.
            </p>
          </div>
        )}
      </div>

      <div className="space-y-5 bg-gray-50  py-5 px-7">
        <label className="flex justify-between items-center">
          <span className="font-bold text-lg">Footer Disclaimer</span>
          <ToggleButton isActive={enabledFields.footer} onClick={() => toggleEnableFields("footer")} />
        </label>
        {enabledFields.footer && (
          <textarea
            name="footerDisclaimer"
            onChange={handleChange}
            value={questions.footerDisclaimer}
            placeholder="Footer disclaimer message"
            className="w-full mt-2 p-2 border focus:outline-none border-gray-300 rounded-md"
          />
        )}
      </div>

      <div className="space-y-5 bg-gray-50  py-5 px-7">
        <h2 className="font-bold text-xl text-gray-800">Submit Settings</h2>
        <div className="">
          <section className=" flex flex-col lg:flex-row gap-4">
            <div className="w-full lg:min-w-[16rem] lg:w-[30%]">
              <label className="block text-gray-800">Facebook Pixel Code</label>
              <input
                onChange={handleChange}
                type="text"
                name="fbCode"
                value={questions.fbCode}
                placeholder="Placeholder"
                className="w-full p-4 border border-gray-300 rounded-md"
              />
            </div>
            <div className="w-full lg:w-[70%]">
              <label className="block text-gray-800">Confirmation Message</label>
              <input
                onChange={handleChange}
                type="text"
                name="confirmationMessage"
                value={questions.confirmationMessage}
                placeholder="Placeholder"
                className="w-full p-4 border border-gray-300 rounded-md"
              />
              <p className="text-gray-500 text-sm mt-1">confirmation message to show after submitting</p>
            </div>
          </section>

          <section className=" flex flex-col lg:flex-row gap-4 mt-4">
            <div className="w-full  lg:min-w-[16rem] lg:w-[30%]">
              <label className="block text-gray-800">External Auto Responders</label>
              <select
                name="autoResponders"
                id=""
                className="p-4 w-full text-gray-400 border border-gray-300"
                value={questions.autoResponders}
                onChange={handleChange}
              >
                <option value="first" className="text-gray-200">
                  One
                </option>
                <option value="third" className="text-gray-200">
                  three
                </option>
              </select>
            </div>
            <div className="w-full lg:w-[30%]">
              <label className="block text-gray-800">Submit Button Text</label>
              <input
                onChange={handleChange}
                type="text"
                name="buttonText"
                value={questions.buttonText}
                placeholder="Submit"
                className="w-full p-4 border border-gray-300 rounded-md"
              />
            </div>
          </section>
        </div>
      </div>

      <div className="bg-gray-50 py-5 px-7">
        <h2 className="font-bold mb-0 text-xl">Colour Settings</h2>
        <p className="text-gray-500">Customise your form to suit your brand</p>
        <div className="flex relative gap-x-5 gap-y-2 flex-wrap mt-5">
          {colors.map((item, index) => (
            <div
              key={item}
              onClick={() => handleActiveColor(item)}
              style={{ backgroundColor: item, borderColor: item }}
              className={`w-12 h-12 flex justify-center items-center rounded-full border-4 cursor-pointer`}
            >
              {activeColor == item && (
                <section className=" top-4 left-2">
                  <PiCheck size={30} color="white" />
                </section>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
