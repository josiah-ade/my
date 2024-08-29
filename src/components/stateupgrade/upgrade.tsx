import { UserRoutes } from "@/core/const/routes.const";
import Image from "next/image";
import { useRouter } from "next/navigation";
interface IProps {
    heading: string,
    description: string,
}
export default function DataUpgrade(props: IProps) {
    const { heading, description, } = props
    const router = useRouter()
    const handleRedirect = () => {
        router.push(UserRoutes.SUBSCRIPTION)
    }
    return (
        <section className="border border-gray-200 mt-5">
            <div className="border-l-8 border-warning-500  rounded-lg p-5 flex justify-between items-center">
                <div className="flex items-center">
                    <div className="bg-warning-50 text-warning-50 p-3 rounded-lg mr-4 border border-warning-500">
                        <Image src="/warning.jpg" alt="waring" width={30} height={30} />
                    </div>
                    <div>
                        <h3 className=" text-lg font-[600]">{heading}</h3>
                        <p className="text-gray-500">{description}</p>
                    </div>
                </div>
                <button
                    className="bg-primary-400 text-white px-4 py-2 rounded-lg"
                    onClick={handleRedirect}
                >
                    Upgrade
                </button>
            </div>
        </section>
    );
}
