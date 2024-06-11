import { dashboardItem } from "@/core/const/dashboard.consr";
import { dashboard } from "@/typings/interface/component/layout/menu";
import { IoAddSharp } from "react-icons/io5";
import DashBoardAction from "./dashboardactons";

export default function DashBoardItems(){
    return(
        <div>
            <div  className="flex md:flex-row lg:flex-row sm:flex-row justify-between gap-5 xs:flex-col">
            <div  className="flex flex-row justify-between border w-full max-w-[600px] py-3 rounded px-5 flex-wrap">
                <div>
                    <h4>Sammys Luxe Store</h4>
                    <h3 className="font-bold text-2xl">Free Plan</h3>
                </div>
                <div className="xs:mt-3">
                    <button className="bg-primary text-white rounded-2xl px-5 py-2 text-center text-md">Upgrade</button>
                </div>
            </div>
            <div  className="flex flex-row justify-between border w-full max-w-[600px] py-3 rounded px-5 flex-wrap">
                <div>
                    <h4>Accounts</h4>
                    <h3 className="font-bold">+234 567 899 4212</h3>
                </div>
                <div  className="xs:mt-3">
                    <button  className="bg-primary text-white rounded-2xl text-center text-md px-7 py-2"><span className="text-xl mr-2">+</span> {""} Add Account</button>
                </div>
            </div>
            </div>
            <div className="flex flex-row  gap-10 mt-[3rem] flex-wrap items-center">
                {
                    dashboardItem.map((item: dashboard)=>(
                        <div key={item.id} className="border py-3 px-4 rounded-2xl w-full max-w-[120px] " >
                            <div className="text-start">
                                <p>{item.title}</p>
                                <div>
                                <span className="font-bold" >{item.amount}/</span>
                                <span className="font-bold">{item.total}</span>

                                </div>


                            </div>
                        </div>

                    ))
                }
            </div>
        </div>
    )
}