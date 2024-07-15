import { ModalProps } from "@/typings/interface/component/modal";
import Modal from "../modal/modal";
import Button from "../button/button";
import { useBroadcastStore } from "@/providers/stores/broadcastStore";
import { ICreateBroadcastMessage } from "@/typings/interface/message";

interface IProps extends ModalProps {
    onChange: (data: { name: string; value: string }) => void;
    onSubmit: (isTest?: boolean) => void;
    formData: ICreateBroadcastMessage;
  }
export default function BroadCastConfigModal(props: IProps){
    const {isOpen, onClose,  formData,}=props
    const broadcastList = useBroadcastStore((state) => state.broadcasts);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      props.onChange({ name, value });
    };
    
    return(
        <Modal isOpen={isOpen} onClose={onClose }>
            <div>
                <h2 className="font-bold text-black text-xl">Broadcast Configuration</h2>
                <h4 className="text-black">Configure your broadcast </h4>
                    <div>
                    <label className="block font-medium text-gray-900 mt-6">Also Send Individually to Group Members</label>
                    <select
                    name="individual"
                    onChange={handleChange}
                    defaultValue={formData.individual}
                    className="w-full p-2 mt-2 border rounded"
                >
                    <option value="">Yes</option>
                    <option value="">No</option>
                </select>
                    </div>
                    <div className="mt-5">
                    <Button
                    primary
                    onClick={() => props.onSubmit()} 
                    className="px-4 py-2 rounded w-full"
                   >
                    Send Broadcast
                    </Button>
                    </div>
                </div>

        </Modal>
    )
}