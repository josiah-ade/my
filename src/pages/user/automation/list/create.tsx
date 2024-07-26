import PageHeading from "@/components/common/subheadings"
import {  useMemo, useRef, useState } from "react";
import { IBroadcastLists } from "@/typings/interface/broadcasts";
import { useBroadcastStore } from "@/providers/stores/broadcastStore";
import UserLayout from "@/layout/user";
import { useRouter } from "next/router"
import { FaRegQuestionCircle } from "react-icons/fa";
import {  ICreateAutomationList, PageProps } from "@/typings/interface/automation";
import { useUploadStore } from "@/providers/stores/useUploadStore";
import { FileUpload as FileUploadType } from "@/core/types/data.interface";
import FileUpload from "@/components/broadcast/fileUpload";
import ListAutomationForm from "@/components/automation/listAutomationform";
import { useParams } from "next/navigation";
import moment from "moment";
import HasBack from "@/components/common/hasback/hasback";
import { useCreateAutomationList, useEditAutomation } from "@/providers/hooks/mutate/automation/list";
import Breadcrumb from "@/components/breadcrumb/breadcrumb";
import defaultValue from "@/core/const/automation/defaultvalue";


const placeholders = [
  { title: " First Name", value: " First Name" },
  { title: "Last Name", value: "Last Name" },
];

const tags = [
  { value: " ", title: "tag1" },
  { value: "", title: "tag2" },
  { value: "", title: "tag3" },
];
const tagsCondition = [
  { value: " ", title: "Include" },
  { value: "", title: "Exclude" },
];
export default function CreateAutomationPage(props: PageProps) {
  const { id } = useParams() || {};
  const { mutate: editAutomationList } = useEditAutomation(id as string, {
    options: {
      errorConfig: { title: "Failed to Edit Broadcast List" },
      successConfig: { title: "Broadcast List Edited", text: "The broadcast list was successfully edited." },
    },
    onSuccess() {
      router.push("/user/automation")
    },
  });
  const { automationList } = props
  const textInputRef = useRef<HTMLTextAreaElement>(null);
  const [formData, setFormData] = useState<ICreateAutomationList>({
    accountId: automationList?.account.id ?? "",
    broadCastListId: automationList?.broadcast.id ?? "",
    type: automationList?.type ?? "",
    time: automationList?.time ?? "",
    timeZone: automationList?.timeZone ?? "",
    sendDate: automationList?.sendDate ? moment(automationList?.sendDate ?? '').format('YYYY-MM-DD') : "",
    status: automationList?.status ?? "",
    tagCondition: automationList?.tagCondition ?? "",
    tags: [],
    files: [],
    text: "",
    minutesAfter: automationList?.minutesAfter ?? 0,
    typeValue: 0,
  });
  const isEditing = !!automationList?.id;
  console.log({ automationList, formData })
  const broadcastList = useBroadcastStore((state) => state.broadcasts);
  const [selectedList, setSelectedList] = useState<(IBroadcastLists & { selected?: boolean })[]>([...broadcastList]);
  const router = useRouter()
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { uploads, addUpload, updateUploadProgress, setUploadSuccess, setUploadError, retryUpload } = useUploadStore();

  const { mutate: createAutomationList } = useCreateAutomationList({
    onSuccess() {
      // router.push("/user/automation")
    },
  })

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { value, name } = event.target;
    if (name === 'tags') {
      setFormData((prevData) => ({
        ...prevData,
        tags: value.split(',').map(tag => tag.trim()),
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const tagsString = formData.tags.join(', ');
  const insertPlaceholder = (text: string) => {
    if (!textInputRef.current) return;

    const textarea = textInputRef.current;
    const startPos = textarea.selectionStart;
    const endPos = textarea.selectionEnd;

    textarea.setRangeText(`{{${text}}}`, startPos, endPos, "end");
    textarea.focus();

    const event = new Event("change", { bubbles: true });
    textarea.dispatchEvent(event);
  };
  const selectedId = useMemo(
    () =>
      selectedList.reduce<string[]>((val, item) => {
        item.selected && val.push(item.id);
        return val;
      }, []),
    [selectedList]
  );

  const isValid = useMemo(
    () => !!(selectedId.length && formData.accountId && formData.type && formData.broadCastListId),
    [formData, selectedId]
  );
  const handleSave = () => {
    isEditing ? editAutomationList({ ...automationList, ...formData }) : createAutomationList(formData)
    setFormData({ ...defaultValue})

  }
  const handleFileSelect = (files: FileList) => {
    Array.from(files).forEach((file) => {
      const id = Date.now().toString();
      addUpload(file);
      uploadFile(id, file);
    });
  };
  const uploadFile = (id: string, file: File) => {
    const mockUpload = () => {
      let progress = 0;
      const interval = setInterval(() => {
        if (progress >= 100) {
          clearInterval(interval);
          setUploadSuccess(id);
        } else {
          progress += 10;
          updateUploadProgress(id, progress);
        }
      }, 300);
    };

    setTimeout(() => {
      if (Math.random() < 0.2) {
        setUploadError(id, "An error occurred while uploading");
      } else {
        mockUpload();
      }
    }, 1000);
  };

  const handleRetry = (upload: FileUploadType) => {
    retryUpload(upload);
    uploadFile(upload.id, new File([upload.name], upload.name));
  };

  return (
    <UserLayout>
      <div>
      <div className="flex flex-row gap-2 border-red-600" >
      <Breadcrumb />
      </div>
        <div>
          <PageHeading title={isEditing ? "Update List Automation" : "Create List Automations"}
            description={isEditing ? "Update List Automation here" : "Create list automations here"}
            buttonTitle={isEditing ? "Update List Automation" : "Save List Automation"}
            onClick={handleSave}
          />
        </div>
        <section>
          <ListAutomationForm
            setFormData={setFormData}
            formData={formData}
          />
        </section>
        <section className="grid grid-cols-1 md:grid-cols-2 gap-[2rem] mt-[2rem] items-center " >
          <div className="mb-10">
            <div className="text-xs">Type Your Response</div>
            <textarea
              className="w-full py-4 px-4 border border-gray-700 rounded focus:outline-none"
              name="text"
              rows={12}
              placeholder="Select"
              ref={textInputRef}
              onChange={handleChange}
              value={formData.text}
              defaultValue={formData.text ?? ""}
            ></textarea>
            <div className="flex flex-row gap-2 mt-[1.2rem] justify-between">
              <div className="flex flex-row gap-2 ">
                {placeholders.map((item) => (
                  <span
                    key={item.value}
                    onClick={() => insertPlaceholder(item.value)}
                    className="bg-secondary-400 cursor-pointer px-2 py-1 rounded-xl "
                  >
                    {item.title}
                  </span>
                ))}
              </div>
              <div className="flex flex-row gap-2">
                <FaRegQuestionCircle size={18} className="text-gray-400 mt-1" />
                <span className="text-gray-400">
                  What are these
                </span>
              </div>
            </div>
          </div>
          <div>
            {formData.type == "default" ?
              <div className="flex flex-row gap-6  mb-0 mt-[-4rem] ">
                <div className="flex-1">
                  <div className="col-span-1">
                    <div className="text-xs">
                      Tag Condition
                    </div>
                    <select onChange={handleChange} name="tagCondition" className="w-full py-2 px-2  border border-gray-700 rounded focus:outline-none">
                      <option value="">Select</option>
                      {tagsCondition.map((tags) => (
                        <option key={tags.title} value={tags.title}>
                          {tags.title}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="flex-1">
                  <div className="col-span-1">
                    <div className="text-xs">
                      Select Tag
                    </div>
                    <select
                     onChange={handleChange}
                      name="tags"
                      value={tagsString}
                     className="w-full py-2 px-2  border border-gray-700 rounded focus:outline-none">
                      {tags.map((tags) => (
                        <option key={tags.title} value={tags.title}>
                          {tags.title}
                        </option>
                      ))}
                    </select>
                    
                  </div>
                </div>
              </div> : <></>}
            <div className="mb-4">
              <div className="mt-1 flex justify-center px-6 py-10 border-2 border-dashed rounded-md">
                <div className="space-y-1 text-center">
                  <div className="mx-auto flex items-center justify-center w-10 h-10 rounded-full p-2 bg-gray-100">
                    <svg xmlns="http://www.w3.org/2000/svg" width="29" height="28" viewBox="0 0 29 28" fill="none">
                      <path
                        d="M7.50033 11.0835C7.50033 7.53967 10.3732 4.66683 13.917 4.66683C17.0562 4.66683 19.671 6.92221 20.2252 9.90129C20.3029 10.319 20.6016 10.6615 21.0049 10.7953C23.3275 11.5656 25.0003 13.7557 25.0003 16.3335C25.0003 19.5552 22.3887 22.1668 19.167 22.1668C18.5227 22.1668 18.0003 22.6892 18.0003 23.3335C18.0003 23.9778 18.5227 24.5002 19.167 24.5002C23.6773 24.5002 27.3337 20.8438 27.3337 16.3335C27.3337 12.959 25.2876 10.065 22.371 8.81967C21.373 5.0845 17.9674 2.3335 13.917 2.3335C9.0845 2.3335 5.16699 6.251 5.16699 11.0835C5.16699 11.2005 5.1693 11.317 5.17386 11.433C3.07922 12.6415 1.66699 14.9048 1.66699 17.5002C1.66699 21.3662 4.801 24.5002 8.66699 24.5002C9.31133 24.5002 9.83366 23.9778 9.83366 23.3335C9.83366 22.6892 9.31133 22.1668 8.66699 22.1668C6.08966 22.1668 4.00033 20.0775 4.00033 17.5002C4.00033 15.5666 5.17653 13.9051 6.85709 13.1971C7.3434 12.9923 7.63165 12.4865 7.56005 11.9637C7.52072 11.6765 7.50033 11.3827 7.50033 11.0835Z"
                        fill="#475367"
                      />
                      <path
                        d="M13.7252 16.6282C14.1673 16.2353 14.8334 16.2353 15.2754 16.6282L17.0254 18.1837C17.507 18.6118 17.5504 19.3492 17.1223 19.8308C16.7478 20.2521 16.1366 20.338 15.667 20.0663V25.6668C15.667 26.3112 15.1447 26.8335 14.5003 26.8335C13.856 26.8335 13.3337 26.3112 13.3337 25.6668V20.0663C12.8641 20.338 12.2528 20.2521 11.8783 19.8308C11.4503 19.3492 11.4937 18.6118 11.9752 18.1837L13.7252 16.6282Z"
                        fill="#475367"
                      />
                    </svg>
                  </div>

                  <div
                    className="flex text-sm text-gray-600 p-4 cursor-pointer"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <p className="relative cursor-pointer  rounded-md font-medium text-primary text-xs focus-within:outline-none">
                      <span>Click to upload your videos or images</span>
                      <input
                        name="files"
                        type="file"
                        className="sr-only hidden"
                        ref={fileInputRef}
                        multiple
                        onChange={(e) => e.target.files && handleFileSelect(e.target.files)}
                      />
                    </p>
                    <p className="pl-1 text-xs">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">SVG, PNG, JPG or GIF (max 10 files)</p>
                </div>
              </div>
            </div>
            {/* <FileUpload uploads={uploads} onFileSelect={handleFileSelect} onRetry={handleRetry} /> */}
          </div>

        </section>
      </div>
    </UserLayout>
  )
}

