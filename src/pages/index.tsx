import { ILogin } from "@/typings/interface/login";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { MdMailOutline } from "react-icons/md";
import { useAuthContext } from "@/providers/context/auth";
import { GoDotFill } from "react-icons/go";
import AuthLoading from "@/components/common/loading/authloading";
import logo from "../assets/logo.png";
import Image from "next/image";
import { GoogleLogin } from "@react-oauth/google";

export default function LoginPage() {
  const router = useRouter();
  const { AdminLogin } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string[]>([]);
  const [hidePassword, setHidePassword] = useState(false);
  const [data, setData] = useState<ILogin>({
    email: "",
    password: "",
  });
  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { value, name } = event.target;
    setData({ ...data, [name]: value });
  }
  const togglePasswordVisibility = () => {
    setHidePassword(!hidePassword);
  };

  const handleClick = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError([]);
    try {
      setLoading(true);
      await AdminLogin(data);
      setLoading(false);
    } catch (e) {
      const loginError = e as Error;
      setError(loginError.message?.split("\n") ?? [loginError.message]);
      setLoading(false);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-[100vh] w-full px-6 md:px-0">
      <div className="flex w-full top-0 fixed justify-between p-8 items-center">
        <div className="flex h-full items-center gap-3 ">
          <div className="hidden  md:flex lg:flex cursor-pointer gap-8 ">
            <Image src={logo} alt="Logo" height={200} width={100} />
          </div>
        </div>
      </div>
     
      <form
        onSubmit={handleClick}
        className="w-full width-[100%] max-w-[350px] mx-auto py-20 rounded-md bg-white 
     px-6 md:px-0 "
      >
        <div className="w-full max-w-[500px] mx-auto align-center">
          <div className="text-[2rem] text-center font-bold">Log In</div>
          <p className="text-[1.2rem] mt-5 text-center text-gray-400">Enter your credentials to access your account </p>
          <div className="mt-2">
            {error?.length ? (
              <div className="flex flex-col">
                {error?.map((e) => (
                  <p key={e} className="text-red">
                    {" "}
                    <div className="flex flex-row  text-red-500">
                      <GoDotFill color="inherit" className="mt-1" />
                      <span>{e}</span>
                    </div>
                  </p>
                ))}
              </div>
            ) : null}
          </div>
          {/* email input */}
          <div className={`mt-10 relative `}>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 pt-6 pointer-events-none">
              <MdMailOutline className="text-gray-600" size="20px" />
            </div>
            <label className="font-bold">EMAIL ADDRESS</label>
            <br></br>
            <div className="mt-2">
              <input
                name="email"
                autoComplete="off"
                placeholder="Enter Email"
                onChange={handleChange}
                value={data.email}
                className="pl-[10px] rounded-2xl px-3 py-5 w-[100%] bg-white outline-gray-400 border focus:outline-none focus:border-primary"
              />
            </div>
          </div>
          {/* password input */}
          <div className={`mt-6 relative   `}>
            <div className="absolute right-3 bottom-[13px] cursor-pointer" onClick={togglePasswordVisibility}>
              {hidePassword ? (
                <FaRegEye size={20} className="text-gray-600" />
              ) : (
                <FaRegEyeSlash size={20} className="text-gray-600" />
              )}
            </div>
            <label className="font-bold">PASSWORD</label>
            <br></br>
            <div className="mt-2">
              <input
                name="password"
                type={hidePassword ? "text" : "password"}
                placeholder="Enter Password"
                onChange={handleChange}
                value={data.password}
                className="pl-[10px] rounded-2xl px-3 py-5  w-[100%]  bg-white outline-gray-400 border focus:outline-none focus:border-primary"
                autoComplete="off"
              />
            </div>
          </div>
          {/* forgotten password */}
          <div className="flex flex-row justify-between mt-6">
            <div>
              <input type="checkbox" className=" bg-primary" />
              {""} <span className="pl-2">Remember me for 30 days</span>
            </div>
            <div>
              <p className="text-primary">Forgot Password?</p>
            </div>
          </div>
          {/* button */}
          <div className="mt-10  flex flex-col">
            <button
              type="submit"
              className="items-center text-2xl bg-primary py-4 px-7 rounded-2xl text-white  max-w-[1000px] w-full"
            >
              {!loading ? ` Log into Account` : "Loading..."}
            </button>
          </div>
          <div className={`py-6 relative text-center `}>
            <h2>Or</h2>
          </div>
          <div>
            <p className="text-[1.2rem] mt-2 text-center ">
              Are you new here?{" "}
              <span className="text-primary text-lg">
                <Link href="/signup">Create Account</Link>
              </span>
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}
