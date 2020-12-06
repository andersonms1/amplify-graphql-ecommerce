const handleCombo = () => {
  return !product
    ? null
    : product.amount.map((item, index) => {
        return {
          label: item.size,
          quantity: item.amount,
          id: `${index}`,
        };
      });
};

const handleModal = () => {
  const _val = VAL_QUANTITY.validate({ quantity }, { abortEarly: false });
  const MAX_SIZE = `Quantidade máxima ${
    size[0] ? JSON.stringify(size[0].quantity) : "0"
  }`;
  if (_val.error) {
    //ser error
    setCaptionQuantity(`${JSON.stringify(_val.error.message)}`);
  } else {
    const filter = isComoboValid();
    if (quantity > filter[0].amount) {
      //set error
      setCaptionQuantity(MAX_SIZE);
    } else {
      //remove error
      setCaptionQuantity("");
      setIsOpen(false);
    }
  }
};

const handleBuy = () => {
  const filter = isComoboValid();

  const haveStock = filter[0].amount > quantity;

  product.selection = {
    amount: quantity,
    size: size[0].label,
  };

  addCartItem(product);
  history.push("/checkout");
};

const isComoboValid = () => {
  return product.amount.filter((_product) => _product.size === size[0].label);
};

const renderModal = () => {
  return (
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
          caption={`${captionQuantity}`}
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
        <ModalButton kind={ButtonKind.tertiary} onClick={() => handleModal()}>
          OK
        </ModalButton>
      </ModalFooter>
    </Modal>
  );
};
