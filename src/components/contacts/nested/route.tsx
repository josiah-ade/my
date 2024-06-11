import { IRoute } from "@/typings/interface/component/nested/route";
import Link from "next/link";
import router, { useRouter } from "next/router";
import { useReducer } from "react";

const nested:IRoute[]=[
    { title: 'dashboard', path: '/' },
    { title: 'contact', path: '/user/contact' },
  ]
  export default function NestedRoute(){
    const router = useRouter();
    const { id } = router.query;

    return(
        <div>
            <div>
  {nested.map((links, index) => {
    return (
        <Link href={links.path} key={index}>
        <span
          className={
            // router.pathname === links.path ||
            router.pathname === `${links.path}/[/]` ||
            router.pathname === `${links.path}/[user]/[contact]`
              ? 'active-link'
              : ''
          }
        >
          /{links.title}
        </span>
      </Link>
    )
  })}
</div>
    {id}    
        </div>
    )
  }
