import React from "react";
import { useRouter } from "next/router";

interface BreadcrumbProps {
  customItems?: { label: string; path?: string }[];
}

const routeLabels: { [key: string]: string } = {
  user: "User",
  payment: "Payment",
  import: "Import Contacts",
  contacts: "Contacts",
  account: "Accounts",
  // Add more route segments and their labels as needed
};

function Breadcrumb({ customItems }: BreadcrumbProps) {
  const router = useRouter();
  const { pathname } = router;

  const pathSegments = pathname.split("/").filter((segment) => segment);

  const handleNavigation = (path: string | undefined) => {
    if (path) {
      router.push(path);
    }
  };

  const breadcrumbItems = pathSegments.map((segment, index) => {
    const path = `/${pathSegments.slice(0, index + 1).join("/")}`;
    return {
      label: routeLabels[segment] || segment,
      path,
    };
  });

  return (
    <nav className="flex items-center space-x-2 text-sm text-gray-500">
      {breadcrumbItems.map((item, index) => (
        <React.Fragment key={index}>
          <span>/</span>
          <button
            className={`hover:text-primary text-sm ${
              item.path ? "text-gray-500" : "text-primary"
            }`}
            onClick={() => handleNavigation(item.path)}
          >
            {item.label}
          </button>
        </React.Fragment>
      ))}
    </nav>
  );
}

export default Breadcrumb;
