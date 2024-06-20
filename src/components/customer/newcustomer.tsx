import Image from "next/image";
import Breadcrumb from "../breadcrumb/breadcrumb";
import Button from "../button/button";
import Default from "../default/default";

function Img() {
  return <Image src="/goggle-icon.png" alt="google" width={20} height={20} />;
}

export default function NewCustomer() {
  return (
    <section>
      <Breadcrumb />

      <div>
        <section>
          <h2 className="text-xl font-bold">Import Contacts manually</h2>
          <p className="text-gray-600 text-base">
            Manually type contact details to be imported
          </p>
        </section>
        <section className="flex items-center space-x-2">
          <Button className="border-2 border-primary text-primary text-sm">
            Import
          </Button>
          <Button className="" primary>
            Send Broadcast
          </Button>
        </section>
      </div>

      <div>
        <Default
          src="list.png"
          btn={true}
          btnText="Connect To Google"
          imgE={<Img />}
          alt="list"
          height={100}
          width={100}
          mainText="No Contacts Found"
          subText="Import your contacts to begin"
        />
      </div>
    </section>
  );
}
