'use client';

import { useState, useEffect, PropsWithChildren } from 'react';
import Link, { LinkProps } from 'next/link';
import { usePathname } from 'next/navigation';
import { CommonProps, WithChildren } from '@/types/UI';

type NavLinkProps = CommonProps &
  WithChildren &
  PropsWithChildren<LinkProps> & {
    activeClassName?: string;
    onClick?: () => void;
  };

const NavLink = ({
  children,
  className,
  activeClassName,
  onClick,
  ...props
}: NavLinkProps) => {
  const pathname = usePathname();
  const [computedClassName, setComputedClassName] = useState(className);

  useEffect(() => {
    const linkPath = new URL(
      props.as?.toString() || props.href.toString(),
      location.href,
    ).pathname;

    const activePathName = new URL(pathname, location.href).pathname;

    const newClass =
      linkPath === activePathName
        ? `${className} ${activeClassName || 'group active-link'}`.trim()
        : className;

    if (newClass !== computedClassName) {
      setComputedClassName(newClass);
    }
  }, [
    pathname,
    props.as,
    props.href,
    activeClassName,
    className,
    computedClassName,
  ]);

  return (
    <Link onClick={onClick} className={computedClassName} {...props}>
      {children}
    </Link>
  );
};

export default NavLink;
