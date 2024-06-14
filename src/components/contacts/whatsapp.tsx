import { whatsapplist } from "@/core/const/tab/whatsapp"
import Link from "next/link"
import TabLists from "./tab/tabdetail"


export default function WhatsAppList(){
    return(
        <div className="flex flex-wrap gap-5 mt-5">
            {whatsapplist.map((item)=>(
                <Link
                href={`/contact/lists/${item.id}`}
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