// components/Breadcrumb.tsx
import React from "react";
import { useRouter } from "next/router";
import { AiOutlineArrowLeft } from "react-icons/ai";

interface BreadcrumbProps {
  items?: { label: string; path?: string }[];
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  const router = useRouter();

  const handleNavigation = (path: string | undefined) => {
    if (path) {
      router.push(path);
    }
  };

  const breadcrumbItems = [
    { label: "Broadcast Lists", path: "/user/broadcast" },
    { label: "Import Contacts" },
  ];

  return (
    <nav className="flex items-center space-x-2 text-sm text-gray-500">
      <button
        className="flex items-center space-x-1 text-gray-500 hover:text-gray-700"
        onClick={() => router.back()}
      >
        <AiOutlineArrowLeft />
        <span>Go Back</span>
      </button>
      {breadcrumbItems.map((item, index) => (
        <React.Fragment key={index}>
          <span>/</span>
          <button
            className={`hover:text-orange-700 ${
              item.path ? "text-gray-500" : "text-orange-500"
            }`}
            onClick={() => handleNavigation(item.path)}
            disabled={!item.path}
          >
            {item.label}
          </button>
        </React.Fragment>
      ))}
    </nav>
  );
};

export default Breadcrumb;
