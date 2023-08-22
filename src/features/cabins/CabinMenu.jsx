import { useState } from "react";
import {
  HiEllipsisVertical,
  HiOutlinePencil,
  HiOutlineSquare2Stack,
  HiOutlineTrash,
  HiPencil,
  HiSquare2Stack,
  HiTrash,
} from "react-icons/hi2";
import { useCreateCabin } from "./useCreateCabin";
import { useDeleteCabin } from "./useDeleteCabin";
import CreateCabinForm from "./CreateCabinForm";
import ConfirmDeletePopUp from "../../ui/ConfirmDeletePopUp";
import Modal from "../../ui/Modal";
import Menu from "../../ui/Menu";

function CabinMenu({ cabin }) {
  const [showModal, setShowModal] = useState(false);
  const { isCreating, createCabin } = useCreateCabin();
  const { isDeleting, deleteCabin } = useDeleteCabin();

  const {
    id: cabinId,
    name,
    maxCapacity,
    regularPrice,
    discount,
    description,
    image,
  } = cabin;

  const handleDuplicate = () => {
    createCabin({
      cabinData: {
        name: `Copy of ${name}`,
        maxCapacity,
        regularPrice,
        discount,
        description,
        image,
      },
      id: null,
    });
  };

  return (
    <>
      <Menu>
        <Menu.Button>
          <HiEllipsisVertical />
        </Menu.Button>
        <Menu.Items>
          <div className="w-40 px-2 py-4 leading-6">
            <Menu.Item>
              {({ active }) => (
                <button
                  className={`${
                    active ? " bg-gray-100 text-indigo-600" : ""
                  } group flex w-full items-center gap-4 rounded-md px-4 py-2 text-left text-sm`}
                  onClick={() => setShowModal(true)}
                  disabled={isCreating}
                >
                  {active ? (
                    <HiOutlinePencil className="h-4 w-4" aria-hidden="true" />
                  ) : (
                    <HiPencil className="h-4 w-4" aria-hidden="true" />
                  )}
                  <span>Edit</span>
                </button>
              )}
            </Menu.Item>

            <Menu.Item>
              {({ active }) => (
                <button
                  className={`${
                    active ? " bg-gray-100 text-indigo-600" : ""
                  } group flex w-full items-center gap-4 rounded-md px-4 py-2 text-left text-sm`}
                  onClick={handleDuplicate}
                >
                  {active ? (
                    <HiOutlineSquare2Stack
                      className="h-4 w-4"
                      aria-hidden="true"
                    />
                  ) : (
                    <HiSquare2Stack className="h-4 w-4" aria-hidden="true" />
                  )}
                  <span>Duplicate</span>
                </button>
              )}
            </Menu.Item>

            <Menu.Item>
              {({ active }) => (
                <ConfirmDeletePopUp
                  resourceName={"cabins"}
                  trigger={
                    <button
                      className={`${
                        active ? " bg-gray-100 text-indigo-600" : ""
                      } group flex w-full items-center gap-4 rounded-md px-4 py-2 text-left text-sm`}
                    >
                      {active ? (
                        <HiOutlineTrash
                          className="h-4 w-4"
                          aria-hidden="true"
                        />
                      ) : (
                        <HiTrash className="h-4 w-4" aria-hidden="true" />
                      )}
                      <span>Delete</span>
                    </button>
                  }
                  onConfirm={() => deleteCabin(cabinId)}
                  disabled={isDeleting}
                />
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Menu>

      <Modal
        open={showModal}
        onClose={() => setShowModal(false)}
        onOpen={() => setShowModal(true)}
        closeIcon
      >
        <Modal.Content>
          <CreateCabinForm
            onCloseModal={() => setShowModal(false)}
            cabinToEdit={cabin}
          />
        </Modal.Content>
      </Modal>
    </>
  );
}

export default CabinMenu;
