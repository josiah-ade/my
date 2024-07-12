import React, { useState } from "react";
import UserLayout from "@/layout/user";
import FormDetails from "@/components/form/formdetails";
import FormConfiguration from "@/components/form/formconfiguration";
import Modal from "@/components/modal/modal";
import { ArrowRight } from "@/core/const/icons/icons";
import Button from "@/components/button/button";
import Image from "next/image";
import Breadcrumb from "@/components/breadcrumb/breadcrumb";

export default function EditForm() {
  const [activeTab, setActiveTab] = useState<"details" | "configuration">("details");
  const [preview, setPreview] = useState(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [acceptTerms, setAcceptTerms] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };
  const handlePreview = () => {
    setPreview(!preview);
  };
  return (
    <UserLayout>
      <Breadcrumb />
      <div className="p-6">
        <div className="lg:flex justify-between items-center mb-6">
          <div>
            <h1 className="text-[1.3rem] font-bold">Edit Forms</h1>
            <p className="text-gray-600 text[0.9rem]">Create your forms here</p>
          </div>

          <div className="flex mt-4 lg:mt-0 mb-4">
            <section className="flex items-center space-x-2">
              <button className="flex items-center space-x-2" onClick={() => setActiveTab("details")}>
                <span
                  className={`h-7 w-7 p-2 flex items-center text-xs justify-center ${
                    activeTab === "details" ? "bg-primary text-white" : "bg-gray-200 text-gray-800"
                  }   rounded-full`}
                >
                  1
                </span>
                <span className={`${activeTab === "details" ? "text-gray-800 font-bold" : "text-gray-500"}`}>
                  Form Details
                </span>
              </button>
              <div>
                <ArrowRight color={`${activeTab === "configuration" ? "text-primary" : ""}`} />
              </div>
              <button className="flex items-center space-x-2" onClick={() => setActiveTab("configuration")}>
                <span
                  className={`h-7 w-7 p-2 flex items-center text-xs justify-center ${
                    activeTab === "configuration" ? "bg-primary text-white" : "bg-gray-200 text-gray-800"
                  }   rounded-full`}
                >
                  2
                </span>
                <span className={`${activeTab === "configuration" ? "text-gray-800 font-bold" : "text-gray-500"}`}>
                  Form Configuration
                </span>
              </button>
            </section>
          </div>

          <div className="flex items-center space-x-4">
            <Button className="flex items-center space-x-2 px-4 py-2 border rounded-md">
              <span role="img" aria-label="eye">
                <Image src="/button-icon.jpg" height={20} width={20} alt="eye" />
              </span>
              <span>Preview Form</span>
            </Button>
            <Button primary className="text-white px-4 py-2 rounded-md" onClick={() => openModal()}>
              Proceed
            </Button>
          </div>
        </div>

        {activeTab === "details" && <FormDetails />}
        {activeTab === "configuration" && <FormConfiguration />}
      </div>

      <Modal isOpen={isOpen} onClose={() => closeModal()}>
        <div className="p-2">
          <h1 className="text-2xl font-bold">Form Name</h1>
          <p className="text-gray-600 mt-2">Form Description</p>

          <div className="space-y-4 mt-4">
            <div>
              <label className="block text-gray-800">Question 1</label>
              <select className="w-full p-2 border border-gray-300 rounded-md">
                <option>Dropdown</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-800 mt-2">Question 2</label>
              <textarea
                placeholder="Short Answer/Paragraph"
                className="w-full p-2 focus:outline-none border border-gray-300 rounded-md"
              />
            </div>

            <div>
              <Image src="/terms-rec.jpg" alt="terms" className="w-full rounded-md" width={200} height={200} />
            </div>

            <div>
              <p className="block text-gray-800 text-lg">Terms and Conditions</p>
              <p className="text-sm text-gray-600">Terms and condition comes here</p>
            </div>

            <div className="flex items-center justify-between">
              <span className="ml-2 text-gray-800">I Accept Terms and Conditions</span>
              <input
                type="checkbox"
                checked={acceptTerms}
                onChange={() => setAcceptTerms(!acceptTerms)}
                className="form-checkbox h-4 w-4 text-orange-500"
              />
            </div>

            <Button primary className="w-full text-white py-2 rounded-md">
              Submit
            </Button>

            <p className="text-gray-600 text-center">Footer Disclaimer comes here (Eg Pawazap 2024)</p>
          </div>
        </div>
      </Modal>
    </UserLayout>
  );
}
