import {Copy } from "@/core/const/icons/icons";
import React, { useState, useRef, useEffect, ChangeEvent, Dispatch, SetStateAction } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { RiImageAddLine } from "react-icons/ri";
import { IoVideocamOutline } from "react-icons/io5";
import { ICreateForm, ICreateFormField, IFormList } from "@/typings/interface/form";
import { useBroadcastStore } from "@/providers/stores/broadcastStore";
import useNotificationStore from "@/providers/stores/notificationStore";
import { NotificationType } from "@/core/enum/notification";
import FormField from "./formField";
import { DEFAULT_FORM_VALUE } from "@/core/const/form";

interface IProps {
  data?: IFormList[];
  setQuestions: Dispatch<SetStateAction<ICreateForm>>;
  questions: ICreateForm;
}

export default function FormDetails(props: IProps) {
  const { questions, setQuestions } = props;
  const setNotification = useNotificationStore((state) => state.setDisplay);
  const { broadcasts } = useBroadcastStore((state) => state);
  const [activeQuestion, setActiveQuestion] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleAddQuestion = () => {
    const newQuestion: ICreateFormField = {
      ...DEFAULT_FORM_VALUE.fields[0],
      type: "text",
      title: "",
      is_required: false,
      source: "text",
      isDefault: false,
      sort_order: questions.fields.length,
    };
    questions.fields.push(newQuestion);
    setActiveQuestion(questions.fields.length - 1);
    setQuestions({ ...questions });
  };

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, []);

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setQuestions({ ...questions, [name]: value });
  };

  const handeToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(`${window.location.origin}/form/${questions.link}`);
      setNotification(true, {
        type: NotificationType.success,
        content: {
          title: "Success",
          text: ` "Copied ${window.location.origin}/form/${questions.link} to clipboard`,
        },
      });
    } catch (error) {
      setNotification(true, {
        type: NotificationType.error,
        content: {
          title: "Oops",
          text: `Failed to copy!`,
        },
      });
    }
  };

  return (
    <section>
      <div className=" p-5 md:p-10 bg-gray-75 rounded">
        <div className="space-y-6">
          <div className="grid md:grid-cols-[repeat(auto-fit,minmax(20.75rem,1fr))] gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-800">Form Name</label>
              <input
                type="text"
                className="block w-full p-4 rounded-md border border-gray-300 shadow-sm"
                placeholder="Sales Campaign Form"
                value={questions.name}
                name="name"
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-800">Select List</label>
              <select
                name="list"
                id=""
                className="p-4 w-full text-gray-600 border border-gray-300"
                value={questions.list}
                onChange={handleChange}
              >
                <option value=""> ---Select List--- </option>
                {broadcasts.map((item) => (
                  <option key={item.id} value={item.id} className="text-gray-600">
                    {item.listName}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-800">Form Link</label>

              <div className="flex gap-x-1 border has-[:focus]:border-2 has-[:focus]:border-black rounded-md  p-4 items-center bg-white">
                <p className="text-sm text-gray-400 w-full cursor-default "> {window.location.origin}/form/ </p>
                <input
                  value={questions.link}
                  type="text"
                   name="link"
                  onChange={handleChange}
                  className="text-right focus:outline-none outline-none w-full"
                />
                <Copy onClick={handeToClipboard} className="w-12 h-8 cursor-pointer" />
              </div>
            
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-800">Form Description</label>
            <textarea
              className="mt-1 block w-full p-2 rounded-md border border-gray-300 shadow-sm"
              placeholder="Description"
              value={questions.description}
              name="description"
              onChange={handleChange}
            ></textarea>
          </div>
        </div>
      </div>

      <div className="space-y-6 mt-4" ref={containerRef}>
        {questions.fields?.map((question: ICreateFormField, index: number) => (
          <FormField
            key={`form_sort_${question.sort_order}`}
            question={question}
            index={index}
            activeIndex={activeQuestion}
            setActiveIndex={setActiveQuestion}
            setQuestions={setQuestions}
          />
        ))}
        <div className="flex justify-center  mt-15">
          <section className=" flex max-md:flex-wrap items-center justify-between gap-7 space-x-2 p-2 py-4 lg:py-2 shadow-lg rounded-lg border border-gray-300">
            <div className="flex items-center gap-1 cursor-pointer" onClick={handleAddQuestion}>
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
