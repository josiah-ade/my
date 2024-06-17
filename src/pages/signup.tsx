import { ILogin,ISignUp } from "@/typings/interface/login";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { MdMailOutline } from "react-icons/md";
import { useAuthContext } from "@/providers/context/auth";
import { GoDotFill } from "react-icons/go";



export default function SignPage() {
  const router = useRouter();
  const { SignUpApi } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string[]>([]);
  const [hidepassword, setHidePassword] = useState(false)
  const [data, setData] = useState<ISignUp>({
    fullname: "",
    businessline: "",
    email: "",
    password: "",
  });
  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { value, name } = event.target;
    setData({ ...data, [name]: value });
    console.log({ data });
  }
  const togglePasswordVisisbility = () => {
    setHidePassword(!hidepassword);
  };

  const handleClick = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
        setLoading(true);
       await SignUpApi(data)
       console.log({ data });
        setLoading(false);
      } catch (e) {
        const loginError = e as Error
      setError( loginError.message?.split("\n") ?? [loginError.message])
        console.log("Error in Login:", error);
        setLoading(false);
      }
  }

  return (
    <div
    className="flex flex-col items-center 
    justify-center min-h-[100vh] w-full px-6 md:px-0">
      <form onSubmit={handleClick} className="w-full width-[100%] max-w-[350px] mx-auto py-10 rounded-md bg-white 
     px-6 md:px-0 ">
          <div className="w-full max-w-[500px] mx-auto align-center">
          <div className="text-4xl text-center font-bold">
          Create An Account
            </div>
            <p className="text-[1.2rem] mt-2 text-center text-gray-400">
            Enter your credentials to create your account{" "}
            </p>
            <div >
            {error?.length ? (
            <div className="flex flex-col">
              {error?.map((e) => (
                <p key={e} className="text-red">
                  {" "}
                  <div className="flex flex-row  text-red-500">
                  <GoDotFill color="inherit" className="mt-1" /><span>{e}</span>
                  </div>
                </p>
              ))}
            </div>
          ) : null}
            </div>
            <div
              className={`mt-5 relative flex flex-row gap-10`}>
                {/* name input */}
                <div  className={`mt-5 relative `}>
              <label className="font-bold">BUSINESS NAME</label><br></br>
              <div className="mt-2">
              <input
                name="fullname"
                autoComplete="off"
                placeholder="Enter Name"
                onChange={handleChange}
                value={data.fullname}
                className="pl-[10px]  rounded-2xl px-3 py-5 w-[100%]  bg-white outline-gray-400 border focus:outline-none focus:border-primary"
              />
              </div>
                </div>
                {/*Business Line email input */}
              <div  className={`mt-5 relative `}>
              <label className="font-bold">LINE OF BUSINESS</label><br></br>
              <div className="mt-2">
              <input
                name="businessline"
                autoComplete="off"
                placeholder="Enter business email"
                onChange={handleChange}
                value={data.businessline}
                className="pl-[10px]  rounded-2xl px-3 py-5 w-[100%] bg-white outline-gray-400 border focus:outline-none focus:border-primary"
              />
              </div>
              </div>
            </div>
            {/*Business Line email input */}
            <div className={`mt-5 relative `}>
              <label className="font-bold">LINE OF BUSINESS</label>
              <br></br>
              <div className="mt-2">
                <input
                  name="useremail"
                  autoComplete="off"
                  placeholder="Enter business email"
                  onChange={handleChange}
                  value={data.businessline}
                  className="pl-[10px]  rounded-2xl px-3 py-5 w-[100%] bg-white outline-gray-400 border focus:outline-none focus:border-primary"
                />
              </div>
            </div>
          </div>
          {/* email input */}
          <div className={`mt-5 relative `}>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 pt-6 pointer-events-none">
              <MdMailOutline className="text-gray-600" size="20px" />
            </div>
            <label className="font-bold">EMAIL</label>
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
          <div
              className={`mt-6 relative   `}
            >
              <div className="absolute right-3 bottom-[13px] cursor-pointer" onClick={togglePasswordVisisbility}>
              {hidepassword ? <FaRegEye size={20}  className="text-gray-600"/> : <FaRegEyeSlash size={20} className="text-gray-600" /> }
              </div>
              <label className="font-bold">PASSWORD</label><br></br>
              <div className="mt-2">
              <input
                name="password"
                type={hidepassword? "text":"password"}
                placeholder="Enter Password"
                onChange={handleChange}
                value={data.password}
                className="pl-[10px] rounded-2xl px-3 py-5  w-[100%]  bg-white outline-gray-400 border focus:outline-none focus:border-primary"
                autoComplete="off"
              />
              </div>
            </div>
            <div>
            <div className="mt-8  flex flex-col">
            {loading ? (
              <button
              disabled
              className="items-center text-2xl bg-primary-2  py-4 px-7 rounded-2xl text-black  max-w-[1000px] w-full">
              Loading...
            </button>
            ):(
              <button
                type="submit"
                className="items-center text-2xl bg-primary py-4 px-7 rounded-2xl text-white  max-w-[1000px] w-full">
             Create Account
              </button>
            )}
              </div>
              <div  className={`py-6 relative text-center `}>
                <h2>Or</h2>
              </div>
              {/* <div className="flex flex-row mt-8 ">
              <p className="text-1xl">Or signup with</p><button className="pl-2"><FcGoogle size={18} /></button>
              <button><GrFacebookOption  size={25} className="pl-3a text-blue-800"/></button>
              </div> */}
          <div>
            <p className="text-[1.2rem] mt-2 text-center ">
              Already have an account?{" "}
              <span className="text-primary text-1xl">
                <Link href="/">Login Here</Link>
              </span>
            </p>
          </div>
            </div>
      </form>
    </div>
  );
}
