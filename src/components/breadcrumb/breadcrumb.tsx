import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

const Breadcrumb: React.FC = () => {
  const router = useRouter();
  const { pathname } = router;

  const generateBreadcrumbs = () => {
    const pathnames = pathname.split('/').filter((x) => x);
    return (
      <nav aria-label="breadcrumb">
        <ol className="flex space-x-2">
          <li>
            <Link href="/" passHref>
              <a className="text-blue-500 hover:underline">Home</a>
            </Link>
            {pathnames.length > 0 && <span className="mx-2">/</span>}
          </li>
          {pathnames.map((value, index) => {
            const to = `/${pathnames.slice(0, index + 1).join('/')}`;
            const isLast = index === pathnames.length - 1;
            return (
              <li key={to}>
                {isLast ? (
                  <span className="text-gray-500">{value}</span>
                ) : (
                  <>
                    <Link href={to} passHref>
                      <a className="text-blue-500 hover:underline">{value}</a>
                    </Link>
                    <span className="mx-2">/</span>
                  </>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    );
  };

  return (
    <div className="my-4">
      {generateBreadcrumbs()}
    </div>
  );
};

export default Breadcrumb;
