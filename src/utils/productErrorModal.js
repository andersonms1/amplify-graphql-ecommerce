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

const productErrorModal = (title, error) => {
  var isOpen = true;

  return (
    <Modal
      onClose={() => (isOpen = false)}
      closeable
      isOpen={isOpen}
      animate
      autoFocus
      size={SIZE.default}
      role={ROLE.dialog}
      unstable_ModalBackdropScroll
    >
      <ModalHeader>{title}</ModalHeader>
      <ModalBody>{error}</ModalBody>
      <ModalFooter>
        <ModalButton onClick={() => (isOpen = false)} kind={KIND.tertiary}>
          Entendi
        </ModalButton>
      </ModalFooter>
    </Modal>
  );
};

export default productErrorModal;
