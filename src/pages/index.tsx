import Image from "next/image";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main
      className={`flex flex-col items-center justify-between p-24 bg-gray-600 ${inter.className} `}
    >
      <h1>
        Hi Welcome to ExpertNaire.
      </h1>
      <h3 className=" text center">
      Marketplace
      </h3>
      <p>
      Mobile Marketplace App UI Design + Prototype
      </p>
    </main>
  );
}
