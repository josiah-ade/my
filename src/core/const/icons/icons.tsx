import React from 'react';
import { GoPlus } from 'react-icons/go';
import { FaTrash, FaEdit, FaCheck, FaTimes } from 'react-icons/fa';
import { MdAddCircle, MdRemoveCircle } from 'react-icons/md';
import { LuScanLine } from "react-icons/lu";
import { MdOutlineQrCode2 } from "react-icons/md";
import { MdQrCode2 } from "react-icons/md";
import { FiMinusCircle } from "react-icons/fi";
import { BiMessageDetail } from "react-icons/bi";
import { LuHash } from "react-icons/lu";
import { IoRepeat } from "react-icons/io5";
import { ImBin } from "react-icons/im";
import { CiHome } from "react-icons/ci";

export const Link = (props: React.SVGProps<SVGSVGElement>) => <LuScanLine {...props} />;
export const Qr = (props: React.SVGProps<SVGSVGElement>) => <MdQrCode2 {...props} />;
export const Circle = (props: React.SVGProps<SVGSVGElement>) => <FiMinusCircle {...props} />;
export const Message = (props: React.SVGProps<SVGSVGElement>) => <BiMessageDetail {...props} />;
export const Hash = (props: React.SVGProps<SVGSVGElement>) => <LuHash {...props} />;
export const Repeat = (props: React.SVGProps<SVGSVGElement>) => <IoRepeat {...props} />;
export const Bin = (props: React.SVGProps<SVGSVGElement>) => <ImBin {...props} />;
export const Home = (props: React.SVGProps<SVGSVGElement>) => <CiHome {...props} />;

