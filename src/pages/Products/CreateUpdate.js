import * as React from "react";
import { Button } from "baseui/button";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalButton,
} from "baseui/modal";
export default (props) => {
  // const [isOpen, setIsOpen] = React.useState(false);
  // setIsOpen(props.modal);
  console.log(props.modal);
  // function close() {
  //   setIsOpen(false);
  // }
  return (
    <div>
      {/* <p>{props.modal}</p> */}
      <Modal onClose={props.close} isOpen={props.modal}>
        <ModalHeader>Hello world</ModalHeader>
        <ModalBody>
          Proin ut dui sed metus pharetra hend rerit vel non mi. Nulla ornare
          faucibus ex, non facilisis nisl. Maecenas aliquet mauris ut tempus.
        </ModalBody>
        <ModalFooter>
          <ModalButton kind="tertiary" onClick={props.close}>
            Cancel
          </ModalButton>
          <ModalButton onClick={props.close}>Okay</ModalButton>
        </ModalFooter>
      </Modal>
    </div>
  );
};
