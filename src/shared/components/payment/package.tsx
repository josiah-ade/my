import React from "react";
import Button from "../common/button/button";
import { Bin } from "@/core/const/icons/icons";
import { PackageDetails } from "@/core/types/interfaces/subscriptions";
import Chip from "../chip";

interface PackageProps {
  data: PackageDetails;
  active?: boolean;
}

function PackageComponent(props: PackageProps) {
  const { data, active } = props;

  return (
    <div className={`p-4 border ${active ? `border-primary` : `border-gray-200`} rounded-xl`}>
      <div className="flex items-center justify-between">
        <h4 className="text-lg text-gray-700 font-medium">{data.title}</h4>
        {active && <Chip text="Recommended" className="bg-primary text-white text-sm" />}
      </div>
      <h3 className="text-xl font-bold text-primary mt-2">{data.amount}</h3>
      <ul className="mt-4">
        {data.packageList.map((d, i) => (
          <li className="mb-2 text-sm text-gray-600" key={i}>
            {d}
          </li>
        ))}
      </ul>
      <div className="mt-6">
        <Button primary isLoading className="w-full cursor-pointer text-sm">
          Edit
        </Button>
      </div>
      <div className="mt-4">
        <Button isLoading className="border w-full border-primary text-sm font-semibold text-gray-900 cursor-pointer">
          Disable
        </Button>
      </div>
      <div className="mt-2">
        <Button isLoading className="w-full text-error text-sm font-semibold cursor-pointer">
          <Bin className="mr-1" /> Delete
        </Button>
      </div>
    </div>
  );
}

export default PackageComponent;
