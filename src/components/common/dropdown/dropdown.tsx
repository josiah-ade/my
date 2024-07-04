import Button from "@/components/button/button";
import Modal from "@/components/modal/modal";
import { useAuthContext } from "@/providers/context/auth";
import { useRouter } from "next/router";
import { useState } from "react";

interface IDropdown {
    onClose: () => void;
    isOpen: boolean;
}

const DropdownMenu = (props: IDropdown) => {
    const router = useRouter();
    const { logout } = useAuthContext();
    const { isOpen, onClose } = props;
    const [open, setOpen] = useState(false);

    if (!isOpen) return null;

    const openModal = (event: React.MouseEvent) => {
        event.stopPropagation();
        setOpen(true);
    };

    const closeModal = () => {
        setOpen(false);
    };

    const handleLogout = (event: React.MouseEvent) => {
        event.stopPropagation();
        logout();
        router.push("/");
    };

    return (
        <div className="absolute top-[5rem] right-0 bg-white shadow-md rounded-md px-4 py-5 w-[18rem] z-[1000]">
            <div className="flex flex-col gap-4">
                <h3 className="cursor-pointer" onClick={onClose}>Profile</h3>
                <h3 className="cursor-pointer" onClick={onClose}>Settings</h3>
                <h3 className="cursor-pointer" onClick={openModal}>Logout</h3>
            </div>
            <Modal isOpen={open} onClose={closeModal} >
                <div className="py-5 bg-white">
                    <p className="text-center">Are you sure you want to logout?</p>
                    <div className="flex flex-row justify-around mt-5">
                        <Button primary className="cursor-pointer" onClick={handleLogout}>Yes</Button>
                        <Button secondary className="cursor-pointer" onClick={closeModal}>No</Button>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default DropdownMenu;
