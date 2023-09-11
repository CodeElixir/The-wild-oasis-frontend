import { cloneElement, forwardRef, useEffect, useState } from "react";
import { Transition } from "@headlessui/react";
import { createPortal } from "react-dom";
import { HiXMark } from "react-icons/hi2";
import useOnClickOutside from "../../hooks/useOnClickOutside";
import ModalActions from "./ModalActions";
import ModalContent from "./ModalContent";
import ModalOverlay from "./ModalOverlay";
import Button from "../Button/Button";

const Modal = forwardRef(function Modal(props, _ref) {
  const {
    open = false,
    trigger = null,
    closeIcon = true,
    onClose = () => {},
    onOpen = () => {},
    children,
    ...rest
  } = props;
  const [openModal, setOpenModal] = useState(open);

  useEffect(() => {
    setOpenModal(open);
  }, [open]);

  const handleClose = () => {
    setOpenModal(false);
    onClose();
  };

  const handleOpen = () => {
    setOpenModal(true);
    onOpen();
  };

  const ref = useOnClickOutside(handleClose, true);

  return (
    <>
      {trigger &&
        cloneElement(trigger, {
          ...rest,
          ...trigger.props,
          ref: _ref,
          onClick: (e) => {
            // Call original event handler
            trigger.props.onClick?.apply(trigger, e);

            if (openModal) {
              handleClose(e);
            } else if (!openModal) {
              handleOpen(e);
            }
          },
        })}
      {createPortal(
        <Transition show={openModal} appear={true}>
          <div
            className="relative z-[1000]"
            aria-labelledby="modal-title"
            role="dialog"
            aria-modal="true"
          >
            {/* Background backdrop, show/hide based on modal state.

          Entering: "ease-out duration-300"
            From: "opacity-0"
            To: "opacity-100"
          Leaving: "ease-in duration-200"
            From: "opacity-100"
            To: "opacity-0" */}
            <Transition.Child
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <ModalOverlay openModal={openModal} />
            </Transition.Child>
            <div className="fixed inset-0 z-[1000] overflow-y-auto">
              <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                {/* Modal panel, show/hide based on modal state.

                Entering: "ease-out duration-300"
                  From: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                  To: "opacity-100 translate-y-0 sm:scale-100"
                Leaving: "ease-in duration-200"
                  From: "opacity-100 translate-y-0 sm:scale-100"
                  To: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" */}
                <Transition.Child
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                  enterTo="opacity-100 translate-y-0 sm:scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                  leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                >
                  <div
                    className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all dark:bg-gray-900 dark:text-gray-200 sm:my-8 sm:w-full sm:max-w-lg"
                    ref={ref}
                  >
                    {closeIcon && (
                      <div className="absolute right-4 top-3">
                        <Button
                          secondary
                          className="!shadow-none !ring-0"
                          onClick={() => handleClose()}
                        >
                          <HiXMark className="h-6 w-6 stroke-gray-500 text-gray-500 dark:text-gray-200" />
                        </Button>
                      </div>
                    )}
                    {children}
                  </div>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Transition>,
        document.body,
      )}
    </>
  );
});

Modal.Content = ModalContent;
Modal.Actions = ModalActions;

export default Modal;
