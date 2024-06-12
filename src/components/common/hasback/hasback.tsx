import { useRouter } from "next/router";
import { IconType } from "react-icons";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { HiArrowSmLeft } from "react-icons/hi";


interface Goback{
    window?: () => Window;
    hasBack?:boolean,
    title:string,
}

export default function HasBack(props:Goback){
    const  {title, hasBack}=props;
    const router = useRouter();
    // const [canGoBack, setCanGoBack] = useState(false);
    const canGoBack = typeof window !== 'undefined' ? window?.history?.length >= 2 : false;
    // const canGoBack = window?.history?.length >= 2;
    const goBack = () => {
        router.back();
      };
    return(
        <div>
            <div>
            {hasBack && canGoBack ? (
            <button onClick={goBack}>
                <div className="flex flex-row gap-2">
                    <div className=" border">
              <HiArrowSmLeft  size={20}  />
                    </div>
                <div className="ml-4 text-primary-6">{props.title}</div>
                </div>
            </button>
          ) : null}
            </div>
        </div>
    )
}