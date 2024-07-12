import { Bin, Copy } from "@/core/const/icons/icons";
import Image from "next/image";
import React, { useState } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { RiImageAddLine } from "react-icons/ri";
import { IoVideocamOutline } from "react-icons/io5";

interface Question {
  id: number;
  text: string;
  type: string;
  required: boolean;
  options?: string[];
}

export default function FormDetails() {
  const [formName, setFormName] = useState("");
  const [selectList, setSelectList] = useState("");
  const [formLink, setFormLink] = useState("");
  const [formDescription, setFormDescription] = useState("");
  const [selected, setSelected] = useState<boolean>(false);

  const [questions, setQuestions] = useState<Question[]>([{ id: 1, text: "", type: "text", required: false }]);

  const handleAddQuestion = () => {
    setQuestions([...questions, { id: questions.length + 1, text: "", type: "text", required: false }]);
  };

  const handleTypeChange = (id: number, type: string) => {
    const updatedQuestions = questions.map((q) => (q.id === id ? { ...q, type } : q));
    setQuestions(updatedQuestions);
  };

  const handleRequiredToggle = (id: number) => {
    const updatedQuestions = questions.map((q) => (q.id === id ? { ...q, required: !q.required } : q));
    setQuestions(updatedQuestions);
  };

  const handleTextChange = (id: number, text: string) => {
    const updatedQuestions = questions.map((q) => (q.id === id ? { ...q, text } : q));
    setQuestions(updatedQuestions);
  };

  return (
    <section>
      <div className="container mx-auto p-2 bg-gray-50 rounded">
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-800">Form Name</label>
              <input
                type="text"
                className="mt-1 block w-full p-4 rounded-md border border-gray-300 shadow-sm"
                placeholder="Placeholder"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-800">Select List</label>
              {/* <input
                type="text"
                className="mt-1 block w-full p-4 rounded-md border-gray-300 shadow-sm"
                placeholder="Placeholder"
              /> */}
              <select name="" id="" className="p-4 w-full text-gray-400 border border-gray-300">
                <option value="" className="text-gray-200">
                  Placeholder
                </option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-800">Form Link</label>
              <div className="relative">
                <div className="absolute flex items-center justify-between px-4 mt-4 w-full">
                  <span className="text-gray-400 text-sm">wamation.com/</span>
                  <p className="text-gray-400 text-sm flex items-center space-x-1">
                    <span>wed-ty-tue</span>
                    <span>
                      <Copy />
                    </span>
                  </p>
                </div>
                <input
                  type="text"
                  className=" block w-full p-4 rounded-none rounded-r-md border border-gray-300"
                  placeholder=""
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gragray-800">Form Description</label>
            <textarea
              className="mt-1 block w-full p-2 rounded-md border border-gray-300 shadow-sm"
              placeholder="wamation.com/"
            ></textarea>
          </div>
        </div>
      </div>

      <div className="container mx-auto space-y-6 mt-4">
        {/* Form Header */}
        {/* <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Form Name</label>
              <input
                type="text"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                placeholder="Placeholder"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Select List</label>
              <input
                type="text"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                placeholder="Placeholder"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Form Link</label>
              <div className="flex items-center mt-1">
                <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
                  wamation.com/
                </span>
                <input
                  type="text"
                  className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-md border border-gray-300"
                  placeholder="wed-ty-tue"
                />
              </div>
            </div>
          </div>

         
        </div> */}

        {/* Question Section */}
        <div className="bg-gray-50 p-6 rounded-md  space-y-6">
          <div className="flex items-center space-x-4">
            <div className="w-full lg:w-[70%]">
              <label className="block text-sm font-medium text-gray-800">Question 1</label>
              <input
                type="text"
                className="mt-1 block w-full p-4 rounded-md border border-gray-300 shadow-sm"
                placeholder="Placeholder"
              />
            </div>
            <div className="w-full lg:w-[30%]">
              <label className="block text-sm font-medium text-gray-800">Type</label>
              <select className="mt-1 block w-full p-4 rounded-md border border-gray-300 shadow-sm">
                <option>Drop Down</option>
              </select>
            </div>
          </div>

          <div className="relative grid lg:grid-cols-2 gap-4">
            {/* <div className="absolute flex items-center justify-between px-4 mt-4 w-full">
              <span className="text-gray-400 text-sm"></span>
              <p className="text-gray-400 text-sm flex items-center space-x-1">
                <span>wed-ty-tue</span>
                <span>
                  <Copy />
                </span>
              </p>
            </div>
            <input
              type="text"
              className=" block w-full p-4 rounded-none rounded-r-md border border-gray-300"
              placeholder=""
            /> */}
            <section className="relative">
              <div className="absolute mt-6">
                <span className="text-gray-800">Option 1</span>
              </div>
              <input
                type="text"
                className=" block w-full p-4 px-20 rounded-none focus:outline-none rounded-r-md border-b bg-gray-50 border-gray-300"
                placeholder=""
              />
              <div className="absolute right-4 bottom-2">
                <span>
                  <Image src="/multiply.png" alt="cancel" width={20} height={20} />
                </span>
              </div>
            </section>

            <section>
              <div className="absolute mt-6">
                <span className="text-gray-800">Add Option |</span>
              </div>
              <input
                type="text"
                className="block w-full p-4 rounded-none focus:outline-none rounded-r-md bg-gray-50 border-b border-gray-300"
                placeholder=""
              />
            </section>
          </div>
          <section className="flex justify-end w-full space-x-4">
            <div className="flex items-center gap-2">
              <Bin />
              <Copy />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-gray-800 font-bold text-sm">Required</span>
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
            </div>
          </section>
        </div>

        <div className="flex items-center mx-auto  justify-center space-x-4 mt-15">
          <section className="w-full lg:w-[40%] flex items-center justify-between space-x-2 p-2 py-4 lg:py-2 shadow-lg rounded-lg border border-gray-300">
            <div className="flex items-center gap-1 cursor-pointer">
              <span className="text-gray-600 text-sm font-semibold">
                <AiOutlinePlusCircle size={20} />
              </span>
              <span className="text-gray-600 text-sm font-semibold">Add Question field</span>
            </div>
            <div className="flex items-center gap-1 cursor-pointer">
              <span className="text-gray-600">
                <RiImageAddLine size={20} />
              </span>
              <span className="text-gray-600 text-sm font-semibold">Add Image</span>
            </div>
            <div className="flex items-center gap-1 cursor-pointer">
              <span className="text-gray-600">
                <IoVideocamOutline size={20} />
              </span>
              <span className="text-gray-600 text-sm font-semibold">Add Video</span>
            </div>
          </section>
        </div>
      </div>
    </section>
  );
}
