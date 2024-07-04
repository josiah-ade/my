import Button from "@/components/button/button";
import { Plus } from "@/core/const/icons/icons";

 interface IProps{
    title:string,
    description:string,
    buttontittle:string,
    onClick?:()=>void,
 }
export default function PageHeading(props:IProps) {
    const {title, description, buttontittle, onClick}=props
    const handleRedirect =()=>{
      onClick && onClick()
  }
    return (
        <div className="flex justify-between items-center  py-8">
        <section>
          <h2 className="text-xl font-semibold text-[1.3rem] ">{props.title}</h2>
          <p className="text[0.9rem] mt-2">{props.description}</p>
        </section>
        <section className="flex items-center space-x-2">
          <Button
            className="bg-orange-500 text-white px-4 py-2 rounded-lg"
            icon={<Plus />}
            onClick={handleRedirect}
          >
            {props.buttontittle}
          </Button>
        </section>
      </div>
    );
}