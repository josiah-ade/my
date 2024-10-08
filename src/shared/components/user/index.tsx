import { SearchIcon } from "@/core/const/icons/icons";
import TextInput from "../common/input/textInput";
import Table from "../table";
import { data, headers } from "@/core/const/tabledata";

export default function UserPageComponent(){
    return(
        <div>
        <div className="mt-4">
            <Table
             search={true}
              headers={headers}
            data={data} 
            clickable={true} 
            />
        </div>
        </div>
    )
}