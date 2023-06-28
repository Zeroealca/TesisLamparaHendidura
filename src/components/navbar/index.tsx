import React, { useContext } from "react";
import Icon, { UserIcon, CaretDown } from "../icons";
import { Menu } from "@headlessui/react";
import Link from "next/link";
import { signOut } from "next-auth/react";
import UserContext from "../../context/context";

const Navbar = () => {
  const { user } = useContext(UserContext);

  return (
    <section className="lg:px-20 px-10 md:px-24 fixed right-0 z-50">
      <div className="p-4">
        <Menu>
          <Menu.Button className="bg-black p-1 pr-3 rounded-full flex items-center hover:bg-blacksecondary shadow">
            <span className="sr-only">Open user menu</span>
            <div className="flex items-center bg-blacktertiary rounded-full p-1">
              <Icon width={25} height={25} fill="white" viewBox="16 16">
                <UserIcon />
              </Icon>
            </div>
            <div className="flex flex-col ml-2">
              <span className="text-white font-medium capitalize">
                {user?.name}
              </span>
            </div>
            <div className="flex items-center ml-2">
              <Icon width={15} height={15} fill="white" viewBox="16 16">
                <CaretDown />
              </Icon>
            </div>
          </Menu.Button>
          <Menu.Items className="absolute z-10 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded shadow dark:bg-black dark:divide-gray-600 top-12 lg:right-24 right-16 md:right-28">
            <Menu.Items className="px-4 py-3">
              <Menu.Item disabled>
                <p
                  className="text-sm text-gray-900 dark:text-white"
                  role="none"
                >
                  Iniciado sesión como
                </p>
              </Menu.Item>
              <Menu.Item disabled>
                <p
                  className="text-sm font-medium text-gray-900 truncate dark:text-grayprimary"
                  role="none"
                >
                  {user?.email}
                </p>
              </Menu.Item>
              <Menu.Item disabled>
                <p
                  className="text-sm font-medium text-gray-900 truncate dark:text-grayprimary"
                  role="none"
                >
                  Eres <span className="dark:text-red-600">{user?.rol}</span>
                </p>
              </Menu.Item>
            </Menu.Items>
            <Menu.Items className="py-1">
              {user.rol === "ADMIN" ? (
                <Menu.Item>
                  <Link
                    href="/administracion"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-grayprimary dark:hover:bg-blacksecondary dark:hover:text-white"
                  >
                    Administración
                  </Link>
                </Menu.Item>
              ) : null}
              <Menu.Item>
                <Link
                  href="/mi-perfil"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-grayprimary dark:hover:bg-blacksecondary dark:hover:text-white"
                >
                  Mi perfil
                </Link>
              </Menu.Item>
              <Menu.Item>
                <button
                  onClick={() => signOut()}
                  className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-grayprimary dark:hover:bg-blacksecondary dark:hover:text-white text-left"
                >
                  Cerrar sesión
                </button>
              </Menu.Item>
            </Menu.Items>
          </Menu.Items>
        </Menu>
      </div>
    </section>
  );
};
export default Navbar;
