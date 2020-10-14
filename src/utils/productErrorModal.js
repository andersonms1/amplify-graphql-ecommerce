const productErrorModal = () => {
  return (
    <Modal
      onClose={() => setModalPhotos(false)}
      closeable
      isOpen={modalPhotos}
      animate
      autoFocus
      size={SIZE.default}
      role={ROLE.dialog}
      unstable_ModalBackdropScroll
    >
      <ModalHeader>Erro de envio de fotos</ModalHeader>
      <ModalBody>{erroPhotos}</ModalBody>
      <ModalFooter>
        <ModalButton onClick={() => setModalPhotos(false)} kind={KIND.tertiary}>
          Entendi
        </ModalButton>
      </ModalFooter>
    </Modal>
  );
};
