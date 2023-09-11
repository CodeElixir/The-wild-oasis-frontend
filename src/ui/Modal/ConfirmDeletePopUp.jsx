import { forwardRef, useState } from "react";
import { HiOutlineExclamationTriangle } from "react-icons/hi2";
import Modal from "./Modal";
import Button from "../Button/Button";

const ConfirmDeletePopUp = forwardRef(function ConfirmDeletePopUp(
  { resourceName, trigger = null, onConfirm, disabled, ...rest },
  _ref,
) {
  const [showModal, setShowModal] = useState(false);

  return (
    <Modal
      open={showModal}
      onClose={() => setShowModal(false)}
      onOpen={() => setShowModal(true)}
      trigger={trigger}
      closeIcon={false}
      ref={_ref}
      {...rest}
    >
      <Modal.Content>
        <div className="sm:flex sm:items-start">
          <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
            <HiOutlineExclamationTriangle className="h-6 w-6 text-red-600" />
          </div>

          <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
            <h3
              className="text-base font-semibold leading-6 text-gray-900 dark:text-white"
              id="modal-title"
            >
              Delete {resourceName}
            </h3>
            <div className="mt-2">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Are you sure you want to delete this {resourceName} permanently?
                This action cannot be undone.
              </p>
            </div>
          </div>
        </div>
      </Modal.Content>
      <Modal.Actions>
        <Button
          danger
          size="lg"
          disabled={disabled}
          className="inline-flex w-full justify-center text-sm sm:ml-3 sm:w-auto"
          onClick={onConfirm}
        >
          Delete
        </Button>
        <Button
          secondary
          size="lg"
          disabled={disabled}
          className="mt-3 inline-flex w-full justify-center text-sm sm:mt-0 sm:w-auto"
          onClick={() => setShowModal(false)}
        >
          Cancel
        </Button>
      </Modal.Actions>
    </Modal>
  );
});

export default ConfirmDeletePopUp;
