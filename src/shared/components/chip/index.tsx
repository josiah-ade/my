interface IProps {
    text: string;
    field?: string;
    className?: string;
    color?: string;
  }
  
  export default function (props: IProps) {
    return (
      <span
        className={`px-4 py-1 rounded-full  ${props.color ?? getStatusColor(props.field || props.text)} ${
          props.className
        } `}
      >
        {props.text}
      </span>
    );
  }
  
  function getStatusColor(status: string) {
    const statusMap = new Map([
      ["delivered", "bg-success-50 text-success-700"],
      ["sent", "bg-secondary-50 text-secondary-700"],
      ["connected", "bg-success-50 text-success-700"],
      ["paused", "bg-warning-50 text-warning-700"],
      ["failed", "bg-error-50 text-error-700"],
      ["read", "bg-secondary-50 text-secondary-700"],
      ["active", "bg-secondary-50 text-secondary-700"],
      ["cancelled", "bg-red-50 text-error-700"],
      ["expired", "bg-gray-50 text-gray-700"],
    ]);
  
    return statusMap.get(status.toLowerCase()) || "bg-gray-200";
  }
  