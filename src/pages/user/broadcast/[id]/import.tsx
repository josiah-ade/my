import React, { useState, ChangeEvent, useEffect } from "react";
import Breadcrumb from "@/components/breadcrumb/breadcrumb";
import Button from "@/components/button/button";
import ContactsList from "@/components/contactlist/contactlist";
import Default from "@/components/default/default";
import UserLayout from "@/layout/user";
import Image from "next/image";
import Manually from "@/components/imports/manually";
import Google from "@/components/imports/google";
import Whatsapp from "@/components/imports/whatsapp";
import CSV from "@/components/imports/csv";
import NewCustomer from "@/components/customer/newcustomer";
import Link from "next/link";
import { useRouter } from "next/router";

export default function ImportContacts() {
  const router = useRouter();
  const [showTable, setShowTable] = useState(true);
  const [source, setSelectContact] = useState(true);
  const [contactList, setContactList] = useState(true);
  const [selectedValue, setSelectedValue] = useState<string>("");

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedValue(event.target.value);
  };

  const handleChangeCustomer = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedValue(event.target.value);
    router.push(`/user/broadcast/${event.target.value}`);
  };

  return (
    <UserLayout>
      <section>
        <Breadcrumb />
        <div className="overflow-x-hidden">
          <div className="bg-white mt-5 rounded-lg w-full">
            <div className="block md:flex justify-between items-center">
              <div>
                <h2 className="text-xl font-bold text-black">
                  Import Contacts into a broadcast list
                </h2>
                <p className=" text-gray-600 text-base">
                  Import all your contacts here
                </p>
                {/* <p>{selectedValue}</p> */}
              </div>
              <div className="flex items-center space-x-2 mt-8 md:mt-0">
                <Button className="border-2 border-gray-700 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <span>
                      <Image
                        src="/goggle-icon.png"
                        alt="goggle"
                        width={20}
                        height={20}
                      />
                    </span>
                    <span className="text-gray-600 text-sm ">
                      ekpenyong2510@gmail.com -{" "}
                    </span>
                    <span className="text-secondary text-sm">
                      <a href="#" className="">
                        Sign Out?
                      </a>
                    </span>
                  </div>
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12">
              <div className="col-span-1">
                <label className="block text-gray-900 font-semibold leading-8 text-sm">
                  Select Source
                </label>
                <select
                  className="w-full p-2 px-2 border border-gray-700 rounded focus:outline-none"
                  onChange={handleChange}
                >
                  <option value="default" className="px-2">
                    Select source
                  </option>
                  <option value="manually">Import Manually</option>
                  <option value="whatsapp">Whatsapp Phone Contacts</option>
                  <option value="google">Google Contacts</option>
                  <option value="csv">Import CSV</option>
                </select>
                <p className="text-sm text-gray-500 mt-1">
                  where are you importing from?
                </p>
              </div>
              <div className="col-span-1">
                <label className="block text-gray-900 font-semibold leading-8 text-sm">
                  Select Broadcast List
                </label>
                <select
                  onChange={handleChangeCustomer}
                  className="w-full p-2 border border-gray-700 rounded focus:outline-none"
                >
                  <option value="default">Select List</option>
                  {/* <option value="default">Select list</option> */}
                  <option value="newcustomer">
                    New Customers
                    {/* <Link href="/newcustomer"></Link> */}
                  </option>
                  {/* Add your options here */}
                </select>
                <p className="text-sm text-gray-500 mt-1">
                  The list you are importing into?
                </p>
              </div>
              <div className="col-span-1">
                <label className="block text-gray-900 font-semibold leading-8 text-sm">
                  Day Number on Automation
                </label>
                <input
                  type="number"
                  className="w-full p-2 border border-gray-700 rounded focus:outline-none"
                  defaultValue={0}
                />
              </div>
            </div>
          </div>
        </div>

        {selectedValue !== "" ? (
          //   <section className="mt-20 overflow-x-hidden">
          //     <div className="block lg:flex ">
          //       <div className="bg-white w-full lg:w-[40%]">
          //         <h2 className="text-xl font-bold">Import Contacts manually</h2>
          //         <p className="text-gray-600 text-base">
          //           Manually type contact details to be imported
          //         </p>
          //         <form className="space-y-4 mt-8">
          //           <div>
          //             <label className="block text-gray-900 font-semibold leading-8 text-sm">
          //               Contact Name*
          //               <input
          //                 type="text"
          //                 className="mt-1 block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-secondary focus:border-secondary sm:text-sm"
          //                 placeholder="input name"
          //               />
          //             </label>
          //           </div>
          //           <div>
          //             <label className="block text-gray-900 font-semibold leading-8 text-sm">
          //               Phone Number*
          //               <input
          //                 type="text"
          //                 className="mt-1 block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-secondary focus:border-secondary sm:text-sm"
          //                 placeholder="input phone"
          //               />
          //             </label>
          //           </div>
          //           <div>
          //             <label className="block text-gray-900 font-semibold leading-8 text-sm">
          //               Contact email
          //               <input
          //                 type="email"
          //                 className="mt-1 block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-secondary focus:border-secondary sm:text-sm"
          //                 placeholder="input email"
          //               />
          //             </label>
          //           </div>
          //           <div className="mt-2">
          //             <Button
          //               disabled
          //               type="submit"
          //               className="w-full flex justify-center  border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-400 hover:bg-gray-500"
          //             >
          //               Import
          //             </Button>
          //           </div>
          //         </form>
          //       </div>
          //       <div
          //         className={`bg-gray-50 w-full flex ${
          //           contactList ? "" : "items-center justify-center"
          //         }  lg:w-[60%] min-h-40  md:ml-8`}
          //       >
          //         {contactList ? (
          //           <section className="p-4 w-full">
          //             <ContactsList />
          //           </section>
          //         ) : (
          //           <section>
          //             <Default
          //               src="/book.png"
          //               alt="No Source Selelcted"
          //               height={100}
          //               width={100}
          //               mainText="No Source Selelcted"
          //               subText="Select a source you are importing your contacts from to begin"
          //             />
          //           </section>
          //         )}
          //       </div>
          //     </div>
          //   </section>
          <section>
            {selectedValue === "manually" && <Manually />}
            {selectedValue === "google" && <Google />}
            {selectedValue === "whatsapp" && <Whatsapp />}
            {selectedValue === "csv" && <CSV />}
            {selectedValue === "default" && <Manually />}
            {selectedValue === "customer" && <NewCustomer />}
          </section>
        ) : (
          <section className="my-20">
            <Default
              src="/book.png"
              alt="No Source Selelcted"
              height={100}
              width={100}
              mainText="No Source Selelcted"
              subText="Select a source you are importing your contacts from to begin"
            />
          </section>
        )}
      </section>
    </UserLayout>
  );
}
