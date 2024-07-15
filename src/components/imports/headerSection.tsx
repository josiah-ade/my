import { GoPlus } from "react-icons/go";
import Button from "../button/button";

interface IProps {
  title: string;
  text: string;
  buttonText?: string;
}

export default function HeaderSection({ title, text, buttonText = "Import Contacts" }: IProps) {
  return (
    <section className="flex justify-between items-center mt-12">
      <div>
        <h2 className="text-xl font-bold">{title} </h2>
        <p className="text-gray-600">{text} </p>
      </div>
      <div>
        <Button disabled primary icon={<GoPlus />}>
          {buttonText}
        </Button>
      </div>
    </section>
  );
}
