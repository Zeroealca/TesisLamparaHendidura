import Icon, { UserIcon, CaretDown } from "../icons";
import { useState } from "react";
import { Menu } from "@headlessui/react";
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <section className="flex justify-end px-36">
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
              <span className="text-white font-medium">John Doe</span>
            </div>
            <div className="flex items-center ml-2">
              <Icon width={15} height={15} fill="white" viewBox="16 16">
                <CaretDown />
              </Icon>
            </div>
          </Menu.Button>
          <Menu.Items className="absolute z-50 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded shadow dark:bg-black dark:divide-gray-600 lg:top-14 top-[3.3rem] right-40">
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
                  John Doe
                </p>
              </Menu.Item>
            </Menu.Items>
            <Menu.Items className="py-1">
              <Menu.Item>
                <div className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-grayprimary dark:hover:bg-blacksecondary dark:hover:text-white">
                  Mi perfil
                </div>
              </Menu.Item>
              <Menu.Item>
                <div className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-grayprimary dark:hover:bg-blacksecondary dark:hover:text-white">
                  Cerrar sesión
                </div>
              </Menu.Item>
            </Menu.Items>
          </Menu.Items>
        </Menu>
      </div>
    </section>
  );
};
export default Navbar;
