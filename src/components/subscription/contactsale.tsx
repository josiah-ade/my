import Button from "../button/button";

export default function ContactSales(){
    return(
        <div className=" border mt-8  rounded-lg">
             <div className="border-l-8 border-l-primary  p-5  rounded-lg flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex flex-row  gap-2 w-full">
            <div className="rounded-lg border border-primary-75 bg-primary-50 w-[ 32px] h-[32px] p-[0.39rem]" >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g id="support_agent">
                <g id="Vector">
                <path d="M17.5 10.1833C17.5 5.60833 13.95 2.5 9.99999 2.5C6.09166 2.5 2.49999 5.54167 2.49999 10.2333C1.99999 10.5167 1.66666 11.05 1.66666 11.6667V13.3333C1.66666 14.25 2.41666 15 3.33332 15H4.16666V9.91667C4.16666 6.69167 6.77499 4.08333 9.99999 4.08333C13.225 4.08333 15.8333 6.69167 15.8333 9.91667V15.8333H9.16666V17.5H15.8333C16.75 17.5 17.5 16.75 17.5 15.8333V14.8167C17.9917 14.5583 18.3333 14.05 18.3333 13.45V11.5333C18.3333 10.95 17.9917 10.4417 17.5 10.1833Z" fill="#AD3307"/>
                <path d="M7.49999 11.6667C7.96023 11.6667 8.33332 11.2936 8.33332 10.8333C8.33332 10.3731 7.96023 10 7.49999 10C7.03975 10 6.66666 10.3731 6.66666 10.8333C6.66666 11.2936 7.03975 11.6667 7.49999 11.6667Z" fill="#AD3307"/>
                <path d="M12.5 11.6667C12.9602 11.6667 13.3333 11.2936 13.3333 10.8333C13.3333 10.3731 12.9602 10 12.5 10C12.0398 10 11.6667 10.3731 11.6667 10.8333C11.6667 11.2936 12.0398 11.6667 12.5 11.6667Z" fill="#AD3307"/>
                <path d="M15 9.19167C14.6 6.81667 12.5333 5 10.0417 5C7.51666 5 4.79999 7.09167 5.01666 10.375C7.07499 9.53333 8.62499 7.7 9.06666 5.46667C10.1583 7.65833 12.4 9.16667 15 9.19167Z" fill="#AD3307"/>
                </g>
                </g>
                </svg>
            </div>
            <div>
                <h3 className="text-lg font-bold">Looking for a custom solution?</h3>
                <p className="text-[0.85rem]">Can’t find a plan that suits your business needs?, contact sales lets craft a solution specifically to suit your business needs</p>
            </div>
            </div>
            <div className="w-[100%] md:w-[15rem] flex flex-col md:flex-row ">
                <Button primary className="px-4 py-2 rounded-lg w-full">
                    Contact Sales
                </Button>
            </div>
             </div>
        </div>
    )
}