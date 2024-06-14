import { whatsapplist } from "@/core/const/tab/whatsapp";
import Link from "next/link";
import TabLists from "./tab/tabdetail";

export default function WhatsAppList() {
  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(22rem,1fr))] gap-4 mt-5">
      {whatsapplist.map((item) => (
        <Link href={`/user/contacts/${item.id}`} key={item.id} className="border p-5 rounded-[0.6rem] w-full">
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
