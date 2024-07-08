import React, { useState } from "react";

export default function FormConfiguration() {
  const [termsEnabled, setTermsEnabled] = useState(true);
  const [footerEnabled, setFooterEnabled] = useState(false);
  const [selected, setSelected] = useState<boolean>(false);

  return (
    <div className="space-y-6">
      <div className="bg-gray-50 p-4">
        <label className="flex justify-between items-center">
          <span className="font-bold text-lg text-gray-800">Terms and Conditions</span>
          <button
            className={`relative inline-flex items-center h-6 rounded-full w-11 ${
              selected ? "bg-orange-500" : "bg-gray-200"
            }`}
            onClick={() => setSelected(!selected)}
          >
            <span
              className={`${
                selected ? "translate-x-6" : "translate-x-1"
              } inline-block w-4 h-4 transform bg-white rounded-full`}
            />
          </button>
        </label>
        {termsEnabled && (
          <textarea
            placeholder="input terms and conditions"
            className="w-full mt-2 p-2 border focus:outline-none border-gray-300 rounded-md"
          />
        )}
        <p className="text-gray-600 mt-2 mb-4">
          A checkbox will be displayed on your form, for your leads to accept your Terms & Conditions before they can
          submit the form. Leave the toggle off if you don't want the checkbox to appear.
        </p>
      </div>

      <div className="bg-gray-50 p-4">
        <label className="flex justify-between items-center">
          <span className="font-bold text-lg">Footer Disclaimer</span>
          <button
            className={`relative inline-flex items-center h-6 rounded-full w-11 ${
              selected ? "bg-orange-500" : "bg-gray-200"
            }`}
            onClick={() => setSelected(!selected)}
          >
            <span
              className={`${
                selected ? "translate-x-6" : "translate-x-1"
              } inline-block w-4 h-4 transform bg-white rounded-full`}
            />
          </button>
        </label>
      </div>

      <div className="space-y-4 bg-gray-50 p-4">
        <h2 className="font-bold text-lg text-gray-800">Submit Settings</h2>
        <div className="">
          <section className="lg:flex gap-4">
            <div className="w-full lg:w-[30%]">
              <label className="block text-gray-800">Facebook Pixel Code</label>
              <input type="text" placeholder="Placeholder" className="w-full p-4 border border-gray-300 rounded-md" />
            </div>
            <div className="w-full lg:w-[70%]">
              <label className="block text-gray-800">Confirmation Message</label>
              <input type="text" placeholder="Placeholder" className="w-full p-4 border border-gray-300 rounded-md" />
              <p className="text-gray-600 mt-1">confirmation message to show after submitting</p>
            </div>
          </section>

          <section className="lg:flex gap-4 mt-4">
            <div className="w-full lg:w-[30%]">
              <label className="block text-gray-800">External Auto Responders</label>
              <input type="text" placeholder="Placeholder" className="w-full p-4 border border-gray-300 rounded-md" />
            </div>
            <div className="w-full lg:w-[30%]">
              <label className="block text-gray-800">Submit Button Text</label>
              <input type="text" placeholder="Submit" className="w-full p-4 border border-gray-300 rounded-md" />
            </div>
          </section>
        </div>
      </div>

      <div className="space-y-2 bg-gray-50 p-4">
        <h2 className="font-bold text-lg">Colour Settings</h2>
        <p className="text-gray-500 text-sm">Customise your form to suit your brand</p>
        <div className="flex space-x-4 mt-4">
          <div className="w-12 h-12 rounded-full bg-orange-500 border-4 border-orange-500 cursor-pointer"></div>
          <div className="w-12 h-12 rounded-full bg-green-500 cursor-pointer"></div>
          <div className="w-12 h-12 rounded-full bg-red-500 cursor-pointer"></div>
          <div className="w-12 h-12 rounded-full bg-yellow-500 cursor-pointer"></div>
          <div className="w-12 h-12 rounded-full bg-gray-500 cursor-pointer"></div>
          <div className="w-12 h-12 rounded-full bg-cyan-500 cursor-pointer"></div>
          <div className="w-12 h-12 rounded-full bg-blue-500 cursor-pointer"></div>
          <div className="w-12 h-12 rounded-full bg-indigo-500 cursor-pointer"></div>
          <div className="w-12 h-12 rounded-full bg-purple-500 cursor-pointer"></div>
          <div className="w-12 h-12 rounded-full bg-pink-500 cursor-pointer"></div>
          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 cursor-pointer"></div>
        </div>
      </div>
    </div>
  );
}
