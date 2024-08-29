import { ICreateFieldOption } from "@/typings/interface/form";
import { MdClear } from "react-icons/md";

interface IProps {
  option: ICreateFieldOption;
  options: ICreateFieldOption[];
  index: number;
  setOption: (options: ICreateFieldOption[]) => void;
}

export default function FormFieldOption(props: IProps) {
  const { index, option, setOption, options } = props;

  const handleOptionChange = (value: string) => {
    const optionsUpdates = [...options];
    optionsUpdates[index].title = value;
    setOption(optionsUpdates);
  };

  const handleDeleteOption = () => {
    const optionsUpdates = [...options];
    if (optionsUpdates.length <= 1) return;
    optionsUpdates.splice(index, 1);
    setOption(optionsUpdates);
  };

  return (
    <div key={`sort_options_${option.sort_order}`} className="flex items-center space-x-1">
      <input
        type="text"
        className="block w-full focus:outline-none p-2 rounded-md border border-gray-300 shadow-sm"
        placeholder={`Option ${index + 1}`}
        value={option.title}
        onChange={(e) => handleOptionChange(e.target.value)}
      />
      {options.length > 1 && (
        <button type="button" className="p-2 rounded" onClick={() => handleDeleteOption()}>
          <MdClear />
        </button>
      )}
    </div>
  );
}
