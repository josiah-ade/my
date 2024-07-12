import PageHeading from "@/components/common/subheadings"
import { ICreateBroadcastMessage } from "@/typings/interface/message";
import { useEffect, useMemo, useRef, useState } from "react";
import { useAccountStore } from "@/providers/stores/accountStore";
import { IBroadcastLists } from "@/typings/interface/broadcasts";
import { useBroadcastStore } from "@/providers/stores/broadcastStore";
import UserLayout from "@/layout/user";
import { CiHome } from "react-icons/ci";
import { useRouter } from "next/router"
import { useDropzone } from 'react-dropzone';
import { IoCloudUploadOutline } from "react-icons/io5";
import { FaRegQuestionCircle } from "react-icons/fa";
import { useCreateAutomationList } from "@/providers/hooks/mutate/automation";
import { ICreateAutomationList } from "@/typings/interface/automation";

const defaultValue: ICreateAutomationList = {
  accountId: "",
    broadCastListId: "",
    type:"",
    typeValue: 0,
    time: "",
    timeZone: "",
    status: "", 
    tagCondition: "",
    tags:[],
    files:[],
};
interface FileType {
  [key: string]: string;
}
const placeholders = [
  { title: " First Name", value: " First Name" },
  { title: "Last Name", value: "Last Name" },
];
export default function CreateAutomationPage() {
  const [selectedImage, setSelectedImage] = useState(null);
  const textInputRef = useRef<HTMLTextAreaElement>(null);
  const [formData, setFormData] = useState<ICreateAutomationList>({ ...defaultValue });
  const accounts = useAccountStore((state) => state.accounts);
  const [selectAllState, setSelectAllState] = useState(false);
  const broadcastList = useBroadcastStore((state) => state.broadcasts);
  const [selectedList, setSelectedList] = useState<(IBroadcastLists & { selected?: boolean })[]>([...broadcastList]);
  const router = useRouter()
  const {mutate: createAutomationList}=useCreateAutomationList({onSuccess(data) {
    alert("data successful")
  },})
  const handleRedirect = () => {
    router.push("/user/automation/createautomation")
  }
  
  useEffect(() => {
    !selectedList.length && setSelectedList(broadcastList);
  }, [broadcastList]);

  function handleChange(event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    const { value, name } = event.target;
    value != undefined && updateFormState({ name, value });
  }
  const updateFormState = ({ name, value }: { name: string; value: string }) => {
    setFormData({ ...formData, [name]: value });
  };
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


  const handleSelectAll = (clear = false) => {
    setSelectAllState((val) => {
      setSelectedList((list) =>
        list.map((item) => ({ ...item, selected: item.contacts ? (clear ? false : !val) : false }))
      );
      return !val;
    });
  };
  const { getRootProps, getInputProps,  } = useDropzone({
    accept: 'image/*' as unknown as undefined,
    onDrop: (acceptedFiles: any) => {
      setSelectedImage(acceptedFiles[0]);
    },
  });
  const selectedId = useMemo(
    () =>
      selectedList.reduce<string[]>((val, item) => {
        item.selected && val.push(item.id);
        return val;
      }, []),
    [selectedList]
  );

  const isValid = useMemo(
    () => !!(selectedId.length && formData.accountId && formData.type && formData.broadCastListId ),
    [formData, selectedId]
  );
  const handleSave=()=>{

    createAutomationList(formData)
  }

  return (
    <UserLayout>
      <div>
        <div>
          <PageHeading title={"Create List Automations"}
            description={"Create list automations here"}
            buttontittle={"Save List Automation"}
            onClick={handleSave}
          />
        </div>
        <section
          className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-gray-50 py-5 px-5"
          // className="flex flex-row gap-4 flex-grow-2"
        >
          <div className="col-span-1">
            <div>
              Account
            </div>
            <select
              className="w-full py-4 px-4 border border-gray-700 rounded focus:outline-none"
              name="accountId"
              onChange={handleChange}
              value={formData.accountId}
            >
              <option className="px-2">{accounts.length ? "Select Account" : "No account available"}</option>
              {accounts.map((account) => (
                <option key={account.id} value={account.id}>
                  {account.phoneNumber}
                </option>
              ))}
            </select>
          </div>
          <div className="col-span-1">
            <div>
              Broadcast list
            </div>
            <select
              onChange={(e) => {
                handleChange(e);
                handleSelectAll(true);
              }}
              value={formData.broadCastListId}
              name="broadCastListId"
              className="w-full py-4 px-4 border border-gray-700 rounded focus:outline-none"
            >
              <option>Filter by List</option>
              <option value="list">List</option>
              <option value="group">Groups</option>
            </select>
          </div>
          <div className="col-span-1">
            <div>
              Type
            </div>
            <select 
             value={formData.type}
              name="type"
            onChange={(e) => {
                handleChange(e);
                handleSelectAll(true);
              }} className="w-full py-4 px-4 border border-gray-700 rounded focus:outline-none text-">
            <option >Filter by Time</option>
            <option value="immediately">Immediately joined</option>
              <option value="sameday">Same day joined</option>
              <option value="all">All</option>
            </select>
          </div>
          {formData.type == "immediately" ? <> </> : 
          <div className="col-span-1">
            <div>
              Time
            </div>
            <select onChange={handleChange} className="w-full py-4 px-4 border border-gray-700 rounded focus:outline-none">
              <option value="">Filter by Time</option>
            </select>
          </div>}
          {formData.type == "all" ?
          <>
          <div className="col-span-1">
            <div>
              Date
            </div>
            <select onChange={handleChange} className="w-full py-4 px-4 border border-gray-700 rounded focus:outline-none">
              <option value="">Filter by Date</option>
            </select>
          </div>
          <div className="col-span-1">
            <div>
              Time Zone
            </div>
            <select onChange={handleChange} className="w-full py-4 px-4 border border-gray-700 rounded focus:outline-none">
              <option value="">Filter by Time Zone</option>
            </select>
          </div>
          </>
          : <></>}
          <div className="col-span-1">
            <div>
              Status
            </div>
            <select onChange={handleChange} className="w-full py-4 px-4 border border-gray-700 rounded focus:outline-none">
              <option value="">Filter by Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </section>
        <section className="grid grid-cols-1 md:grid-cols-2 gap-[2rem] mt-[2rem] items-center " >
          <div>
            <div>Type Your Response</div>
            <textarea
              className="w-full py-4 px-4 border border-gray-700 rounded focus:outline-none"
              name="tags"
              rows={12}
              placeholder="Select"
              ref={textInputRef}
              onChange={handleChange}
              value={formData.tags}></textarea>
            <div className="flex flex-row gap-2 mt-[1.2rem] justify-between">
            <div className="flex flex-row gap-2 ">
            {placeholders.map((item) => (
            <span
              key={item.value}
              onClick={() => insertPlaceholder(item.value)} 
              className="bg-secondary-400 cursor-pointer px-3 py-1 rounded-xl "
            >
              {" "} {item.title} {" "}
            </span>
          ))}
            </div>
            <div className="flex flex-row gap-2">
              <FaRegQuestionCircle size={18} className="text-gray-400 mt-1"/>
              <span className="text-gray-400">
            What are these
              </span>
            </div>
            </div>
          </div>
          <div>
            {formData.type =="all" ? 
            <div className="flex flex-row  gap-6  mb-0 mt-[-4rem]">
              <div className="flex-1">
              <div className="col-span-1">
            <div>
            Tag Condition
            </div>
            <select onChange={handleChange} className="w-full py-4 px-4 border border-gray-700 rounded focus:outline-none">
              <option value="">Include</option>
            </select>
          </div>
              </div>
              <div className="flex-1">
              <div className="col-span-1">
            <div>
            Select Tag
            </div>
            <select onChange={handleChange} className="w-full py-4 px-4 border border-gray-700 rounded focus:outline-none">
              <option value="">tag1</option>
            </select>
          </div>
              </div>
            </div>: <></>}

          <div {...getRootProps()} className="w-full h-fit  p-2 border-dotted border-4 mt-[2rem] border-gray-700 rounded-xl focus:outline-none">
            <input {...getInputProps()} />
            {selectedImage ? (
              <img src={URL.createObjectURL(selectedImage)} alt="Selected Image" className="" width={"100%"} />
            ) : <div className="  items-center flex flex-col justify-center py-10 gap-2" >
              <div >
                <IoCloudUploadOutline size={40} className="text-gray-400" />
              </div>
              <div>
              <p className="text-primary p-2 mb-0">Click to upload your videos or images<span className="text-gray-600">or drag and drop</span></p>
              <p className="text-gray-400  text-[0.753rem] mt-0 text-center">SVG, PNG, JPG or GIF (max 10 files)</p>
              </div>
            </div>}

          </div>
          </div>

        </section>
      </div>
    </UserLayout>
  )
}