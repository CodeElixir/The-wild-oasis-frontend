import { useState } from "react";
import Modal from "../../ui/Modal/Modal";
import Button from "../../ui/Button/Button";
import CreateCabinForm from "./CreateCabinForm";

function AddNewCabin() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div>
      <Modal
        open={showModal}
        onClose={() => setShowModal(false)}
        onOpen={() => setShowModal(true)}
        trigger={<Button>Add New Cabin</Button>}
        closeIcon
      >
        <Modal.Content>
          <CreateCabinForm onCloseModal={() => setShowModal(false)} />
        </Modal.Content>
      </Modal>
    </div>
  );
}

export default AddNewCabin;
