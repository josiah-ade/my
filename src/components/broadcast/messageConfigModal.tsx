import { ModalProps } from "@/typings/interface/component/modal";
import Modal from "../modal/modal";
import { useBroadcastStore } from "@/providers/stores/broadcastStore";
import { ICreateBroadcastMessage } from "@/typings/interface/message";

interface IProps extends ModalProps {
  onChange: (data: { name: string; value: string }) => void;
  onSubmit: (isTest?: boolean) => void;
  formData: ICreateBroadcastMessage;
}

export default function MessageConfigModal({ isOpen, onClose, formData, ...props }: IProps) {
  const broadcastList = useBroadcastStore((state) => state.broadcasts);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    props.onChange({ name, value });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="max-w-lg text-sm space-y-5 mx-auto">
        <div>
          <h2 className="text-lg font-bold mb-2.5">Broadcast Configuration</h2>
          <p>Configure your broadcast</p>
        </div>

        {formData.type == "list" && (
          <>
            <div>
              <label className="block font-medium text-gray-900">Select Tags</label>
              <select
                // onChange={handleChange}
                name="tags"
                defaultValue={formData.testNumber}
                className="w-full p-2 mt-2 border rounded"
              >
                <option>Select Tags</option>
                <option>T1</option>
              </select>
            </div>

            <div>
              <label className="block font-medium text-gray-900">Conditional Tags</label>
              <select
                name="tagCondition"
                onChange={handleChange}
                defaultValue={formData.tagCondition}
                className="w-full p-2 mt-2 border rounded"
              >
                <option value="">Select Tag Condition</option>
                <option value="include">Include</option>
                <option value="exclude">Exclude</option>
              </select>
              <p className="text-gray-600 text-sm mt-1">
                We will <b>include</b> or <b>exclude</b> contacts with the selected tags above
              </p>
            </div>

            <div>
              <label className="block font-medium text-gray-900 capitalize">
                Exclude Contacts From {formData.type}{" "}
              </label>
              <select className="w-full p-2 mt-2 border rounded">
                <option className="capitalize">Select {formData.type} </option>
                {broadcastList.map((listItem, index) => (
                  <option key={listItem.id} value={index}>
                    {listItem.listName}
                  </option>
                ))}
              </select>
              <p className="text-gray-600 text-sm mt-1">
                We will not send to contacts in the list(s) you selected if they are found in any of the selected
                list(s) here
              </p>
            </div>

            <div>
              <label className="block font-medium text-gray-900">
                Send to Contacts who joined on a particular date
              </label>
              <input type="date" className="w-full p-2 mt-2 border rounded" />
            </div>

            <div>
              <label className="block font-medium text-gray-900">Send Test Broadcast</label>
              <input
                type="text"
                placeholder="Enter your number to receive test broadcast"
                className="w-full p-2 mt-2 border rounded"
              />
            </div>

            <button onClick={() => props.onSubmit(true)} className="w-full py-2 bg-gray-500 text-white rounded">
              Send Test Broadcast
            </button>
          </>
        )}
        {formData.type == "group" && (
          <div>
            <label className="block font-medium text-gray-900 capitalize">
              Also Send Individually to Group Members
            </label>
            <select defaultValue={"0"} name="sendToIndividual" className="w-full p-2 mt-2 border rounded">
              <option value={"1"} className="capitalize">
                Yes
              </option>
              <option value={"0"} className="capitalize">
                No
              </option>
            </select>
          </div>
        )}
        <button onClick={() => props.onSubmit()} className="w-full py-2 mt-2 bg-primary text-white rounded">
          Send Broadcast
        </button>
      </div>
    </Modal>
  );
}
