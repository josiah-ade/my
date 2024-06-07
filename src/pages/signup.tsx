import { ILogin } from "@/typings/interface/login";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { IoPersonOutline } from "react-icons/io5";
import { RiLockPasswordFill } from "react-icons/ri";
import { FaRegEye, FaRegEyeSlash} from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { GrFacebookOption } from "react-icons/gr";

export default function LoginPage() {
  const router = useRouter();
  const [hidepassword, setHidePassword] = useState(false)
  const [data, setData] = useState<ILogin>({
    email: "",
    password: "",
  });
  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { value, name } = event.target;
    setData({ ...data, [name]: value });
    // console.log({ data });
  }
  const togglePasswordVisisbility = () =>{
    setHidePassword(!hidepassword)
  }

  return (
    <div
    className="flex flex-col items-center 
    justify-center min-h-[100vh] w-full px-6 md:px-0">
      <form className="w-full width-[100%] max-w-[600px] mx-auto py-10 rounded-md bg-white 
       border-primary border-solid border-4 px-6 md:px-0 ">
          <div className="w-full max-w-[500px] mx-auto align-center">
          <div className="text-4xl text-center font-bold text-primary">
              SignUp
            </div>
            <p className="text-[1.2rem] mt-2 text-center ">
            Already have an account?{" "}	
              <span className="text-primary text-2xl">
                <Link href="/login">Login</Link>
              </span>
            </p>
            <div
              className={`mt-5 relative `}
            >
              <div className="absolute inset-y-0 left-0 flex items-center pl-2 pointer-events-none">
                <IoPersonOutline className="text-gray-600" size="20px" />
              </div>
              <input
                name="email"
                autoComplete="off"
                placeholder="Enter Email"
                onChange={handleChange}
                value={data.email}
                className="pl-[40px]  rounded-2xl px-3 py-5 w-[100%] max-w-[900px] bg-gray-200 outline-none"
              />
            </div>
            <div
              className={`mt-10 relative   `}
            >
              <div className="absolute inset-y-0 left-0 flex items-center pl-2  pointer-events-none">
                <RiLockPasswordFill className="text-gray-600" size="23px" />
              </div>
              <div className="absolute right-3 bottom-[13px] cursor-pointer" onClick={togglePasswordVisisbility}>
              {hidepassword ? <FaRegEye size={20}  className="text-gray-600"/> : <FaRegEyeSlash size={20} className="text-gray-600" /> }
              </div>
              <input
                name="password"
                type={hidepassword? "text":"password"}
                placeholder="Enter Password"
                onChange={handleChange}
                value={data.password}
                className="pl-[40px] rounded-2xl px-3 py-5 w-[100%] max-w-[1500px] bg-gray-200  outline-none"
                autoComplete="off"
              />
            </div>
            <div className="mt-6 items-center flex justify-center flex-col">
            <Link href="/login">
              <button
                type="submit"
                className="items-center text-2xl bg-primary py-5 px-7 rounded-2xl text-white  max-w-[400px]"
              >
              Signup
              </button>
              </Link>
              </div>
              <div className="flex flex-row mt-8 ">
              <p className="text-1xl">Or signup with</p><button className="pl-2"><FcGoogle size={18} /></button>
              <button><GrFacebookOption  size={25} className="pl-3a text-blue-800"/></button>
              </div>
          </div>
      </form>
    </div>
  );
}
