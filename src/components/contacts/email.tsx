import { emaillist } from "@/core/const/tab/email"
import Link from "next/link"
import TabLists from "./tab/tabdetail"


export default function EmailList(){
    return(
        <div className="flex flex-wrap gap-5 mt-5">
            {emaillist.map((item)=>(
                <Link
                href={""}
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
    )
}