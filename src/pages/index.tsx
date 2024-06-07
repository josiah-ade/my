import Image from "next/image";
import { Inter } from "next/font/google";
import UserLayout from "@/layout/user";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <UserLayout>
      <div className="pt-10  ">
      <h1>
        Hi Welcome to ExpertNaire.
      </h1>
      <h3 className=" text center">
      Marketplace
      </h3>
      <p>
      Mobile Marketplace AppUI Design + Prototype
      </p>

      </div>
      </UserLayout>
  );
}
