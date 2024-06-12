import Button from "@/components/button/button";
import Table from "@/components/table/table";
import { TableHeader, AccountData } from "@/core/types/data.interface";
import UserLayout from "@/layout/user";
import { GoPlus } from "react-icons/go";

export default function ContactPage(){
    const headers :TableHeader[] = [
        {field:'whatsAppNumber',title:"Phone Number"},
        {field:'purpose',title:"Country"},
        {field:'plan',title:"Name"},
        
      ];
      const data: AccountData[] = [
        {
            'whatsAppNumber': '+234 915 632 9332',
            'purpose': 'For RJStores',
            'plan': 'Free Plan',
            "expiry": "",
            "serviceStatus": ""
        },
      ];
    return(
        <UserLayout>
        <div>
            <div className="mt-5 flex flex-row justify-between">
            <div>
                <h1 className="font-bold text-2xl">Imported Contacts</h1>
                <p className="mt-2">View all your contacts here</p>
             </div>
             <div>
                <Button 
                  secondary
                  icon={<GoPlus />}
                  >
                Add to List
                </Button>
              </div>
        </div>
             <div className="mt-5">
             <Table  headers={headers} data={data}   />
             </div>
        </div>
        </UserLayout>
    )
}