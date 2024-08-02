import Button from "@/components/button/button";
import { SubscriptionMenus } from "@/core/const/subscription/weekly";

export default function WeeklyPlan(){
    return(
        <>
        <div className="flex flex-col md:flex-row  gap-3 mt-10 ">
            {SubscriptionMenus.map((item, index)=>(
                <div key={index} className={`flex flex-col gap-2 border  border: ${index == 1 ? "border-primary": "border-gray-200" } p-5`}>
                    <div className="flex flex-row justify-between">
                    <h3 className="text-xl text-gray-700">{item.title}</h3>
                    {index == 1 ? (
                    <div>
                    <button className=" bg-primary text-white rounded-2xl px-3 py-1 text-center text-sm">Recommended</button>
                    </div>
                    ) : <></>}
                    </div>
                    <h2 className="text-2xl text-primary">{item.amount}</h2>
                    <p className="text-[0.85rem] leading-7">
                    {item.description}
                    </p>
                    <div className="">
                    <Button className=" bg-primary text-white  text-center text-sm w-full ">Select Plan</Button>
                    </div>

                </div>
            ))}
            
        </div>
        </>
    )
}