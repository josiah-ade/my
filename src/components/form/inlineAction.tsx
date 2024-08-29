import { Bin, Copy, Pencil } from "@/core/const/icons/icons";
import { UserRoutes } from "@/core/const/routes.const";
import { FormTableAction } from "@/core/enum/form";
import { TableHeaderActionProp } from "@/typings/interface/component/table";
import { IFormList } from "@/typings/interface/form";
import Link from "next/link";

export function FormActionComp({ ...props }: TableHeaderActionProp<IFormList>) {
  return (
    <div {...props} className="flex items-center space-x-2">
      <Link href={`${UserRoutes.FORM}/${props.item?.id}`}>
        <span>
          <Pencil />
        </span>
      </Link>
      <span className="cursor-pointer">
        <Bin onClick={() => props.clickHandler && props.clickHandler(FormTableAction.delete, props.item!)} />
      </span>
      <span className="cursor-pointer">
        <Copy onClick={() => props.clickHandler && props.clickHandler(FormTableAction.copyFormLink, props.item!)} />
      </span>
    </div>
  );
}
