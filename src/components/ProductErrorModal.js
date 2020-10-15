import React, { useState } from "react";

import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalButton,
  SIZE,
  ROLE,
} from "baseui/modal";
import { KIND } from "baseui/button";

const ProductErrorModal = (isOpen, title, error) => {
  const [status, setStatus] = useState(isOpen);
  console.log("modal");
  console.log(isOpen);
  return (
    <Modal
      onClose={() => setStatus(false)}
      closeable
      isOpen={status}
      animate
      autoFocus
      size={SIZE.default}
      role={ROLE.dialog}
      unstable_ModalBackdropScroll
    >
      <ModalHeader>{title}</ModalHeader>
      <ModalBody>{error}</ModalBody>
      <ModalFooter>
        <ModalButton onClick={() => setStatus(false)} kind={KIND.tertiary}>
          Entendi
        </ModalButton>
      </ModalFooter>
    </Modal>
  );
};

export default ProductErrorModal;
