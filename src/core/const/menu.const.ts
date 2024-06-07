import { Menu } from "@/typings/interface/component/layout/menu";

export const UserMenus: Menu[] = [
  {
    title: "Dashboard",
    id: "1",
    img: "./assets/icons/dashboard.svg",
    path: "/user",
  },
  {
    title: "Contacts",
    id: "1",
    img: "./assets/icons/dashboard.svg",
    path: "/user/contact",
  },
  {
    title: "Login",
    id: "1",
    img: "./assets/icons/dashboard.svg",
    path: "/login",
  },
];

export const UserMenuLookup = UserMenus.reduce<{ [key: string]: Menu }>((val, item) => {
  val = { ...val, [item.path]: item };
  return val;
}, {});
