import Button from "@/components/button/button";
import { Plus } from "@/core/const/icons/icons";

interface IProps {
  title: string;
  description: string;
  buttonTitle?: string;
  hideIcon?: boolean;
  onClick?: () => void;
  titleClass?: string;
}
export default function PageHeading(props: IProps) {
  const { onClick } = props;
  const handleRedirect = () => {
    onClick && onClick();
  };
  return (
    <div className="flex justify-between items-center ">
      <section>
        <h2 className={`font-bold ${props.titleClass ?? "text-xl"}`}>{props.title}</h2>
        <p className="text-gray-600 mt-2">{props.description}</p>
      </section>
      {props.buttonTitle ? (
      <section className="flex items-center space-x-2">
        <Button
          className="text-white px-4 py-2 rounded-lg"
          primary
          icon={props.hideIcon ? null : <Plus />}
          onClick={handleRedirect}
        >
          {props.buttonTitle}
        </Button>
      </section>
      ): <></>}
    </div>
  );
}
