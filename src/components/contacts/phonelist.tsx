import { IconType } from "react-icons";
import Image from "next/image";
import profile from "../../assets/profile.png";
import { phonelist } from "@/core/const/tab/phone";
import Link from "next/link";
import TabLists from "./tab/tabdetail";

export default function PhoneList() {
    return (
        <div className="flex flex-wrap gap-5 mt-5">
            {phonelist.map((item) => (
                <Link
                    href={`/contacts/lists/${item.id}`}
                    key={item.id}
                    className="border py-5 px-4 rounded w-full max-w-[400px] flex-1"
                >
                    <TabLists
                        icon={item.icon}
                        phone={item.phone}
                        description={item.description}
                        total={item.total}
                        totaldescription={item.totaldescription}
                        path={item.path}
                    />
                </Link>
            ))}
        </div>
    );
}


 {/* {content.map((cont, index) => (
          <Link href={cont.path || ""} key={cont.path} >
          <div
            className={`${activeTab === index ? "block" : "hidden"}`}>
            <TabDetails
              icon={cont.icon}
              phone={cont.phone}
              description={cont.description}
              total={cont.total}
              totaldescription={cont.totaldescription}
              path={cont.path}          
              />
          </div>
          </Link>
        ))} */}