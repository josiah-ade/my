import Link from 'next/link';
import { useRouter } from 'next/router';

const nestedRoutes = [
  { title: 'Dashboard/', path: '/' },
  { title: 'Contacts', path: '/user//' },
  // { title: 'Contacts', path: '/user/nesteddetails' },
  // app/blog/[slug]/page.js
];

export default function NestedRoute() {
  const router = useRouter();

  return (
    <nav>
      <ul>
        {nestedRoutes.map((route, index) => {
          const isActive = router.pathname.startsWith(route.path);
          return (
            <li key={index}>
              <Link href={route.path}>
                <Link href={""} className={isActive ? 'active-link' : ''}>{route.title}</Link>
              </Link>
            </li>
          );
        })}
      </ul>
      <style jsx>{`
        nav {
          margin-bottom: 20px;
        }
        ul {
          list-style: none;
          padding: 0;
          display: flex;
          // gap: 15px;
        }
        .active-link {
          font-weight: bold;
          color: blue;
        }
      `}</style>
    </nav>
  );
}


// import { IRoute } from "@/typings/interface/component/nested/route";
// import Link from "next/link";
// import router, { useRouter } from "next/router";
// import { useReducer } from "react";

// const nested:IRoute[]=[
//     { title: 'dashboard', path: '/' },
//     { title: 'contact', path: '/user/contact' },
//   ]
//   export default function NestedRoute(){
//     const router = useRouter();
//     const { id } = router.query;

//     return(
//         <div>
//             <div>
//   {nested.map((links, index) => {
//     return (
//         <Link href={links.path} key={index}>
//         <span
//           className={
//             // router.pathname === links.path ||
//             router.pathname === `${links.path}/[/]` ||
//             router.pathname === `${links.path}/[user]/[contact]`
//               ? 'active-link'
//               : ''
//           }
//         >
//           /{links.title}
//         </span>
//       </Link>
//     )
//   })}
// </div>
//     {id}    
//         </div>
//     )
//   }
