import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { HiBars3, HiOutlineXMark } from "react-icons/hi2";
import SidebarContent from "./SidebarContent";
import { useSidebarDialog } from "../../context/SidebarContext";

function Hamburger() {
  const { open, setOpen } = useSidebarDialog();

  return (
    <>
      <button
        className="m-[-0.625rem] cursor-pointer bg-transparent bg-none p-[0.625rem] normal-case lg:hidden"
        onClick={() => setOpen((open) => !open)}
      >
        <span className="sr-only">Open Sidebar</span>
        <HiBars3 className="h-6 w-6" />
      </button>

      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-in-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-900 bg-opacity-80 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 flex">
            <Transition.Child
              as={Fragment}
              enter="transform transition ease-in-out duration-300"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transform transition ease-in-out duration-300"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative mr-16 flex w-screen max-w-xs flex-1">
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-500"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-500"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute left-full top-0 flex w-16 justify-center pt-5 opacity-100">
                    <button
                      type="button"
                      className="m-[-0.625rem] cursor-pointer bg-transparent bg-none normal-case"
                      onClick={() => setOpen(false)}
                    >
                      <span className="sr-only">Close panel</span>
                      <HiOutlineXMark
                        className="h-6 w-6 text-white"
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                </Transition.Child>
                <div className="flex flex-grow flex-col gap-x-5 overflow-y-auto bg-white dark:bg-gray-900">
                  <SidebarContent />
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
}

export default Hamburger;
