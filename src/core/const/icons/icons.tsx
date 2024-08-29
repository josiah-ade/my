import React from "react";
import { GoPlus } from "react-icons/go";
import { FaTrash, FaEdit, FaCheck, FaTimes } from "react-icons/fa";
import { MdAddCircle, MdRemoveCircle } from "react-icons/md";
import { LuScanLine } from "react-icons/lu";
import { MdOutlineQrCode2 } from "react-icons/md";
import { MdQrCode2 } from "react-icons/md";
import { FiMinusCircle } from "react-icons/fi";
import { BiMessageDetail } from "react-icons/bi";
import { LuHash } from "react-icons/lu";
import { IoRepeat } from "react-icons/io5";
import { ImBin } from "react-icons/im";
import { CiHome } from "react-icons/ci";
import { FaUsers } from "react-icons/fa6";
import { HiOutlinePencilAlt } from "react-icons/hi";
import { FaUserTimes } from "react-icons/fa";
import { TiPencil } from "react-icons/ti";
import { FiSearch } from "react-icons/fi";
import { FaRegCircleQuestion } from "react-icons/fa6";
import { LuRefreshCcw } from "react-icons/lu";
import { GoCopy } from "react-icons/go";
import { MdOutlineArrowRightAlt } from "react-icons/md";
import { RiDeleteBin5Line } from "react-icons/ri";
// import { FaTrashAlt } from "react-icons/fa";

interface Icon {
  size?: number;
}

export const Link = (props: React.SVGProps<SVGSVGElement>) => <LuScanLine {...props} />;
export const Qr = (props: React.SVGProps<SVGSVGElement>) => <MdQrCode2 {...props} />;
export const Circle = (props: React.SVGProps<SVGSVGElement>) => <FiMinusCircle {...props} />;
export const Message = (props: React.SVGProps<SVGSVGElement>) => <BiMessageDetail {...props} />;
export const Hash = (props: React.SVGProps<SVGSVGElement>) => <LuHash {...props} />;
export const Repeat = (props: React.SVGProps<SVGSVGElement>) => <IoRepeat {...props} />;
export const Bin = (props: React.SVGProps<SVGSVGElement>) => <RiDeleteBin5Line {...props} />;
export const Home = (props: React.SVGProps<SVGSVGElement>) => <CiHome {...props} />;
export const Plus = (props: React.SVGProps<SVGSVGElement>) => <GoPlus {...props} />;
export const Userg = (props: React.SVGProps<SVGSVGElement>) => <FaUsers {...props} />;
export const Pencil = (props: React.SVGProps<SVGSVGElement>) => <HiOutlinePencilAlt {...props} />;
export const Usercancel = (props: React.SVGProps<SVGSVGElement>) => <FaUserTimes {...props} />;
export const Edit = (props: React.SVGProps<SVGSVGElement>) => <TiPencil {...props} />;
export const SearchIcon = (props: React.SVGProps<SVGSVGElement>) => <FiSearch {...props} />;
export const QuesCircle = (props: React.SVGProps<SVGSVGElement>) => <FaRegCircleQuestion {...props} />;
export const UploadDel = (props: React.SVGProps<SVGSVGElement>) => <ImBin {...props} />;
export const UploadRefresh = (props: React.SVGProps<SVGSVGElement>) => <LuRefreshCcw {...props} />;
export const Copy = (props: React.SVGProps<SVGSVGElement>) => <GoCopy {...props} />;
export const ArrowRight = (props: React.SVGProps<SVGSVGElement>) => <MdOutlineArrowRightAlt {...props} />;

// export const Usercancel = (props: React.SVGProps<SVGSVGElement>) => <FaUserTimes  {...props} />;
