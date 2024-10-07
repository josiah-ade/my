// import { useRouter } from "next/router";
import { PropsWithChildren, useEffect, useState } from "react";
import { useAuthContext } from "../context/auth";
import AppBar from "../components/layout/appBar";
import AppDrawer from "../components/layout/appDrawer";
import Modal from "../components/common/modal";
import Button from "../components/common/button/button";

export default function AdminLayout(props: PropsWithChildren) {
  const [showDrawer, setShowDrawer] = useState(false);
  const [logoutModal, setLogoutModal] = useState(false);
  const { islLoggedIn, loaded, logout } = useAuthContext();
  //   const router = useRouter();

  useEffect(() => {
    if (!loaded) return;
    // if (!islLoggedIn) {
    //   router.push("/");
    // }
  }, [islLoggedIn, loaded]);

  const toggleDrawer = () => {
    setShowDrawer((val) => !val);
  };

  const toggleLogOutModal = () => {
    setLogoutModal((val) => !val);
  };

  const handleLogout = () => {
    logout(toggleLogOutModal);
  };

  return (
    <>
      {islLoggedIn ? (
        <div className="h-screen w-full">
          <div className="">
            <AppBar onLogout={toggleLogOutModal} onToggle={toggleDrawer} />
          </div>
          <div className=" bg-background text-gray-900 flex flex-row gap-y-1 w-full   ">
            <AppDrawer onLogout={toggleLogOutModal} display={showDrawer} onToggle={toggleDrawer} />
            <div className="flex-col mt-[5.3rem] lg:pl-[19rem]  bg-background flex gap-y-1 w-full p-5 md:p-7">
              {props.children}
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}

      <Modal isOpen={logoutModal} onClose={() => setLogoutModal(false)}>
        <div className="py-5 bg-white">
          <p className="text-center">Are you sure you want to logout?</p>
          <div className="flex flex-row justify-around mt-5">
            <Button primary className="cursor-pointer" onClick={handleLogout}>
              Yes
            </Button>
            <Button secondary className="cursor-pointer" onClick={toggleLogOutModal}>
              No
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}
