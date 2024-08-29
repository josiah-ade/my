import { Bin, Copy } from "@/core/const/icons/icons";
import { ICreateFieldOption, ICreateForm, ICreateFormField } from "@/typings/interface/form";
import { Dispatch, MouseEvent, SetStateAction } from "react";
import FormFieldOption from "./formFieldOption";
import { DEFAULT_FORM_OPTIONS } from "@/core/const/form";

interface IProps {
  question: ICreateFormField;
  index: number;
  setActiveIndex: Dispatch<SetStateAction<number>>;
  setQuestions: Dispatch<SetStateAction<ICreateForm>>;
  activeIndex: number;
}

export default function FormField(props: IProps) {
  const { question, setQuestions, activeIndex, index, setActiveIndex } = props;

  function handleFieldChange<T>(name: keyof ICreateFormField, value: T) {
    setQuestions((questions) => {
      let item = questions.fields[index];
      item = { ...item, [name]: value };
      if (name == "type") {
        if (value == "dropdown") item.options = [{ ...DEFAULT_FORM_OPTIONS }];
        if (question.type == "dropdown") item.options = [];
      }
      questions.fields[index] = item;
      return { ...questions };
    });
  }

  const handleDelQuestion = (index: number, e: MouseEvent) => {
    e.stopPropagation();
    setQuestions((questions) => {
      const updateQuestion = questions.fields.filter((_, i) => i != index);
      questions.fields = updateQuestion;
      return { ...questions };
    });
    if (index == activeIndex) setActiveIndex(index - 1);
  };

  const handleOption = (options: ICreateFieldOption[]) => {
    setQuestions((questions) => {
      const item = questions.fields[index];
      item.options = [...options];
      return { ...questions };
    });
  };

  const handleAddOption = () => {
    setQuestions((questions) => {
      const item = questions.fields[index];
      item.options?.push({ ...DEFAULT_FORM_OPTIONS, sort_order: item.options.length });
      return { ...questions };
    });
  };

  return (
    <div
      key={question.sort_order}
      className={`bg-gray-75 p-6 rounded-md space-y-6 transition-all duration-500 ease-out transform-gpu cursor-pointer ${
        activeIndex === index ? "border-l-4 border-primary" : ""
      } `}
      style={{ animation: "fadeIn 0.5s" }}
      onClick={(e) => setActiveIndex(index)}
    >
      <div className="flex items-center space-x-4">
        <div className="w-full lg:w-[70%]">
          <label className="block text-sm font-medium text-gray-800">Question {index + 1}</label>
          <input
            type="text"
            disabled={question.isDefault}
            className="mt-1 block w-full focus:outline-none p-4 rounded-md border border-gray-300 shadow-sm"
            placeholder="Placeholder"
            value={question.title}
            name="title"
            onChange={(e) => handleFieldChange("title", e.target.value)}
          />
        </div>
        <div className="w-full lg:w-[30%]">
          <label className="block text-sm font-medium text-gray-800">Type</label>
          <select
            disabled={question.isDefault}
            className="mt-1 block w-full p-4 rounded-md border border-gray-300 shadow-sm focus:outline-none"
            value={question.type}
            name="type"
            onChange={(e) => handleFieldChange("type", e.target.value)}
          >
            <option value="text">Text</option>
            <option value="phone">Phone Number</option>
            <option value="email">Email</option>
            <option value="dropdown">Drop down</option>
          </select>
        </div>
      </div>

      {question.type === "dropdown" && (
        <div>
          <div className=" grid items-center sm:grid-cols-[repeat(auto-fill,minmax(16rem,1fr))] gap-2">
            {question.options &&
              question.options.map((option, optionIndex) => (
                <FormFieldOption
                  option={option}
                  index={optionIndex}
                  options={question.options ?? []}
                  setOption={handleOption}
                />
              ))}
          </div>
          <div className="mt-4 p-2 text-secondary rounded" onClick={() => handleAddOption()}>
            Add Option
          </div>
        </div>
      )}

      <div className="flex justify-end w-full pt-10 space-x-6">
        <div className="flex items-center gap-2">
          {!question.isDefault && (
            <div onClick={(e) => handleDelQuestion(index, e)}>
              <Bin />
            </div>
          )}

          <Copy />
        </div>
        <div className="flex items-center gap-2">
          <span className="text-gray-600 font-bold text-sm">Required</span>
          <button
            disabled={question.isDefault}
            className={`relative inline-flex disabled:opacity-50 items-center h-6 rounded-full w-11 ${
              question.is_required ? "bg-orange-500" : "bg-gray-200"
            }`}
            onClick={(e) => handleFieldChange("is_required", !question.is_required)}
          >
            <span
              className={`${
                question.is_required ? "translate-x-6" : "translate-x-1"
              } inline-block w-4 h-4 transform bg-white rounded-full`}
            />
          </button>
        </div>
      </div>
    </div>
  );
}
