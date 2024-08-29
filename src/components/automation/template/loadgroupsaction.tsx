import Button from "@/components/button/button"

export default function LoadGroupAutomation(){
    const loadAutomation=["Load Automation in Groups",]
    return(
        <div>
            {loadAutomation.map((item)=>(
                <div key={item}>
                    <Button className="bg-primary w-full text-white">{item}</Button>
                </div>
            ))}
            

        </div>
    )
}