import Chip from "@/components/chip";
import EmptyState from "@/components/common/empty/empty";
import InfoItem from "@/components/common/text/infoItem";
import TextInput from "@/components/input/textInput";
import { SearchIcon } from "@/core/const/icons/icons";
import { dateFormatter } from "@/core/formatters/dateFormatter";
import { getListAutomationTypeText } from "@/core/services/automation";
import { useGetListAutomationMessageHistory } from "@/providers/hooks/query/automation/automation";
import { IListAutomation } from "@/typings/interface/automation";
import { FaRegUserCircle } from "react-icons/fa";

interface IProps {
  automation: IListAutomation;
}

export default function ListAutomationHistoryComponent({ automation }: IProps) {
  const { data: histories } = useGetListAutomationMessageHistory(automation.id);
  const test = histories?.[0];
  const detailList = [
    {
      title: "List",
      value: `${automation.broadcast.listName}`,
    },
    { title: "Account", value: `${automation.account.phoneNumber}` },
    { title: "Type", value: getListAutomationTypeText(automation) },
    {
      title: "Status",
      value: "",
      component: <Chip text={automation.status} field={automation.status.toLowerCase()} />,
    },
  ];

  const handleSearch = (value: string) => {};
  return (
    <div className="flex flex-col gap-5">
      <p className="text-sm">View automation delivery status for the selected automation</p>

      <div className="bg-gray-75 flex px-5 py-2.5 justify-between flex-wrap gap-4">
        {detailList.map((item) => (
          <div className="text-sm">
            <p className="text-gray-400 mb-1"> {item.title} </p>
            {item.value && <p className="text-gray-600"> {item.value} </p>}
            {item.component && item.component}
          </div>
        ))}
      </div>

      <div className="space-y-3">
        {/* <p className="text-sm text-gray-700 font-semibold">
          Contacts In List ({automation.broadcast.contacts} Contacts){" "}
        </p> */}
        <TextInput
          inputClass="py-2 px-3"
          prefixIcon={<SearchIcon className="" />}
          onChange={handleSearch}
          name="search"
        />

        <div className=" flex-col flex gap-3 divide-y">
          {histories && histories.length ? (
            <>
              {histories.map((item) => (
                <div className="grid grid-cols-[1fr_1fr] sm:grid-cols-[3fr_2fr_2fr] items-end gap-2 pt-3 ">
                  <InfoItem
                    className=" col-span-2 sm:col-span-1"
                    avatar={<FaRegUserCircle size={24} />}
                    title={item.receiverName}
                    text={`+${item.receiverNumber}`}
                  />
                  <InfoItem title="Date Sent" text={dateFormatter(item.sentTime ?? "") ?? "--"} />
                  <InfoItem
                    titleComponent={<Chip className="text-xs inline-block mb-1 py-0" text={item.status} />}
                    text={item.comment ?? "--"}
                  />
                </div>
              ))}
            </>
          ) : (
            <EmptyState padding="p-2" titleClass="mt-1" title="No Messages Sent" />
          )}
        </div>
      </div>
    </div>
  );
}
