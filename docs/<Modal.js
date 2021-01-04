<Modal
onClose={() => setIsOpen(false)}
closeable
isOpen={isOpen}
animate
autoFocus
size={SIZE.default}
role={ROLE.dialog}
unstable_ModalBackdropScroll
>
<ModalHeader>Escolha o tamanho e quantidade</ModalHeader>
<ModalBody>
  <FormControl label="Tamanho" caption="Teste">
    <Select
      options={handleCombo()}
      value={size}
      // placeholder={
      //   handleStateComparation() && isOpen && !size
      //     ? `${cart.products[currentItem].amount[0].size}`
      //     : `${size}`
      // }
      onChange={(params) => {
        setSize(params.value);
      }}
    />
  </FormControl>
  <FormControl
    label="Quantidade"
    placeholder="1"
    caption={`Quantidade máxima ${
      handleStateComparation() && isOpen
        ? `${cart.products[currentItem].amount[0].amount}`
        : ""
    }
    `}
    disabled={size ? false : true}
  >
    <Input
      value={quantity}
      onChange={(e) => {
        setQuantity(e.target.value);
      }}
      placeholder=""
      clearOnEscape
    />
  </FormControl>
</ModalBody>

<ModalFooter>
  <ModalButton
    kind={ButtonKind.tertiary}
    onClick={() => {
      setIsOpen(false);
    }}
  >
    Cancelar
  </ModalButton>
  <ModalButton onClick={() => handleSelected()}>Salvar</ModalButton>
</ModalFooter>
</Modal>
