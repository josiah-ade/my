import { useAccountStore } from "@/providers/stores/accountStore";
import { useBroadcastStore } from "@/providers/stores/broadcastStore";
import { IChanges } from "@/typings/interface/automation";
import { DayOptions } from "@/core/const/automation/days.const";
import { TimeZones } from "@/core/const/automation/timezone";

export default function ListAutomationForm(props: IChanges) {
  const accounts = useAccountStore((state) => state.accounts);
  const broadcastList = useBroadcastStore((state) => state.broadcasts);
  const { setFormData, formData } = props
  console.log("Form Data Type:", formData);


  function handleSelectType(event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    const { value } = event.target;
    const selectedItem = DayOptions.find(item => item.value === value);
    const typeValue = selectedItem?.typeValue ?? 0;
    setFormData((val) => ({ ...val, type: value, typeValue }))
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { value, name } = event.target;
    setFormData((val) => ({ ...val, [name]: value }))
  }

  return (
    <div>
      <section
        className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-gray-50 py-5 px-5"
      >
        <div className="col-span-1">
          <div className="text-xs">
            Account
          </div>
          <select
            className="w-full py-2 px-2 border border-gray-700 rounded focus:outline-none"
            name="accountId"
            onChange={handleChange}
            value={formData.accountId}>
            <option className="px-2">{accounts.length ? "Select Account" : "No account available"}</option>
            {accounts.map((account) => (
              <option key={account.id} value={account.id}>
                {account.phoneNumber}
              </option>
            ))}
          </select>
        </div>
        <div className="col-span-1">
          <div className="text-xs">
            Broadcast list
          </div>
          <select
            onChange={(e) => {
              handleChange(e)
            }}
            value={formData.broadCastListId}
            defaultValue={formData.broadCastListId ?? ""}
            name="broadCastListId"
            className="w-full py-2 px-2 border border-gray-700 rounded focus:outline-none"
          >
            <option>Filter by List</option>
            {broadcastList.map((broadcastId) => (
              <option key={broadcastId.id} value={broadcastId.id}>
                {broadcastId.listName}
              </option>
            ))}
          </select>
        </div>
        <div className="col-span-1">
          <div className="text-xs">
            Type
          </div>
          <select
            name="type"
            value={formData.type}
            onChange={handleSelectType}
            className="w-full py-2 px-2 border border-gray-700 rounded focus:outline-none text-">
            <option value={""} >Filter by Type</option>
            {DayOptions.map((item, index) => (
              <option key={item.text} value={item.value}>
                {item.text}
              </option>
            ))}
          </select>
        </div>
        {formData.type === "immediately" ? (
          <></>
        ) : formData.type === "sameday" ? (
          <div className="col-span-1">
            <div className="text-xs">Minutes to Send After Last</div>
            <input type="text"
              value={formData.minutesAfter}
              name="minutesAfter"
              onChange={handleChange}
              className="w-full py-2
         px-2 border border-gray-700 rounded focus:outline-none" />
          </div>
        ) : (
          <>
            {formData.type === "default" && <div className="col-span-1">
              <div className="text-xs">Date</div>
              <input
                value={formData.sendDate}
                type="date"
                name="sendDate"
                className="form-control w-full py-2 px-2 border border-gray-700 rounded focus:outline-none"
                onChange={handleChange}

              />
            </div>}
            <div className="col-span-1">
              <div className="text-xs">Time</div>
              <input
                value={formData.time}
                type="time"
                name="time"
                className="form-control sendtime w-full py-2 px-2 border border-gray-700 rounded focus:outline-none"
                onChange={handleChange}


              />
            </div>
            <div className="col-span-1">
              <div className="text-xs">Time Zone</div>
              <select
                value={formData.timeZone}
                name="timeZone"
                onChange={handleChange}
                className="w-full py-2 px-2 border border-gray-700 rounded focus:outline-none"
              >
                <option value="">Filter by Time Zone</option>
                {TimeZones.map((zone, index) => (
                  <option key={index} value={zone.value}>
                    {zone.label}
                  </option>
                ))}
              </select>
            </div>
          </>
        )}
        <div className="col-span-1">
          <div className="text-xs">
            Status
          </div>
          <select onChange={handleChange}
            value={formData.status}
            name="status"
            className="w-full py-2 px-2 border border-gray-700 rounded focus:outline-none">
            <option value="">Filter by Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </section>
    </div>
  )
}