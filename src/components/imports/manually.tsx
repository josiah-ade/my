import React, { useState } from "react";
import ContactsList from "../contactlist/contactlist";
import Default from "../default/default";
import Button from "../button/button";

export default function Manually() {
  const [source, setSelectContact] = useState(true);
  const [contactList, setContactList] = useState(true);

  return (
    <section className="mt-20 overflow-x-hidden">
      <div className="block lg:flex">
        <div className="bg-white w-full lg:w-[40%]">
          <h2 className="text-xl font-bold">Import Contacts manually</h2>
          <p className="text-gray-600 text-base">
            Manually type contact details to be imported
          </p>
          <form className="space-y-4 mt-8">
            <div>
              <label className="block text-gray-900 font-semibold leading-8 text-sm">
                Contact Name*
                <input
                  type="text"
                  className="mt-1 block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-secondary focus:border-secondary sm:text-sm"
                  placeholder="input name"
                />
              </label>
            </div>
            <div>
              <label className="block text-gray-900 font-semibold leading-8 text-sm">
                Phone Number*
                <input
                  type="text"
                  className="mt-1 block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-secondary focus:border-secondary sm:text-sm"
                  placeholder="input phone"
                />
              </label>
            </div>
            <div>
              <label className="block text-gray-900 font-semibold leading-8 text-sm">
                Contact email
                <input
                  type="email"
                  className="mt-1 block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-secondary focus:border-secondary sm:text-sm"
                  placeholder="input email"
                />
              </label>
            </div>
            <div className="mt-2">
              <Button
                disabled
                type="submit"
                className="w-full flex justify-center  border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-400 hover:bg-gray-500"
              >
                Import
              </Button>
            </div>
          </form>
        </div>
        <div
          className={`bg-gray-50 w-full flex ${
            contactList ? "" : "items-center justify-center"
          }  lg:w-[60%] min-h-40  md:ml-8`}
        >
          {contactList ? (
            <section className="p-4 w-full">
              <ContactsList />
            </section>
          ) : (
            <section>
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
        </div>
      </div>
    </section>
  );
}
