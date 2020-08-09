import Link from 'next/link';
import { useRouter } from 'next/router';
import clsx from 'clsx';

const MenuLink = ({ href, label }) => {
  const router = useRouter();
  const isActive = router.pathname === href;

  return (
    <li className="flex">
      <Link href={href}>
        <a
          className={clsx(
            'py-4',
            'px-5',
            'font-bold',
            'text-gray-700',
            'hover:text-accent-1',
            isActive && 'text-accent-1',
            'active:text-accent-1'
          )}
        >
          {label}
        </a>
      </Link>
    </li>
  );
};

const Header = () => (
  <header className="z-10">
    <menu className="flex justify-center p-0 m-0 list-none">
      <MenuLink href="/" label="Home" />
      <MenuLink href="/currently" label="Currently" />
    </menu>
  </header>
);

export default Header;
