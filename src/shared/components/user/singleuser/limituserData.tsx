import { dashboardItems } from "@/core/const/users.const";
import { useAuthContext } from "@/shared/context/auth";
import { useState } from "react";


export default function UserLimitatedData() {
  const { auth } = useAuthContext();
  const [modal, setModal] = useState(false);
//   const account = accounts.filter((item) => item.status == "connected")[0] ?? accounts[0];
//   const stats = useLimitsStore((state) => state.limit);


  return (
    <div>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(8.5rem,1fr))]  gap-5 mt-3 items-center">
        {dashboardItems.map((item) => (
          <div key={item.field} className="border py-3 px-4 rounded-lg w-full ">
            <div className="text-start">
              <p className="text-sm text-gray-600">{item.title}</p>
              <p className="text-xl font-medium">
                {/* {stats[item.totalField][item.field] } */}
                {/* { stats?.[item.totalField] ?? 0}/{stats?.[item.field]?? 0} */}
              </p>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
