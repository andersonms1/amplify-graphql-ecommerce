import React, { useState, useContext, useEffect } from "react";
import { useStyletron } from "baseui";
import { ListItem, ListItemLabel } from "baseui/list";
import Delete from "baseui/icon/delete";
import Show from "baseui/icon/show";
import ChevronDown from "baseui/icon/chevron-down";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalButton,
  SIZE,
  ROLE,
} from "baseui/modal";
import { StyledLink } from "baseui/link";
import { KIND as ButtonKind } from "baseui/button";
import { Button } from "baseui/button";
import { Textarea } from "baseui/textarea";
import { Combobox } from "baseui/combobox";
import { FormControl } from "baseui/form-control";
import { Input } from "baseui/input";
import { Select } from "baseui/select";
import {
  Display1,
  Display2,
  Display3,
  Display4,
  H4,
  H5,
  H6,
  Paragraph1,
  Paragraph2,
  Paragraph4,
  Label4,
} from "baseui/typography";
import { Tag } from "baseui/tag";
import { Block } from "baseui/block";
import { Grid, Cell } from "baseui/layout-grid";
import { useMediaQuery } from "react-responsive";

import { getObj, clear, setObj } from "../../../utils/localStorage";
import CheckoutContext from "../../../context/CheckoutContext";
import { BASE, getAddress } from "../../../utils/LINKS";
import { quantity as VAL_QUANTITY } from "../../Products/CreateUpdate/validations";
import ModalSelection from "./ModalSelection";
import { PRODUCT_SELECTION_TYPES as PS_TYPES } from "../../../utils/STATUS";

function Cart() {
  const {
    current,
    setCurrentStep,
    cart,
    addCartItem,
    addCartSelection,
    setCart,
    removeCartItem,
    modalOpen,
    setModalOpen,
  } = useContext(CheckoutContext);
  const [currentItem, setCurrentItem] = useState(0);
  const [isOpen, setIsOpen] = useState(false); //modal
  const [confirmRem, setConfirmRem] = useState(false); //modal
  const [size, setSize] = useState([]);
  const [quantity, setQuantity] = useState("1");
  const [captionSize, setCaptionSize] = useState("");
  const [captionQuantity, setCaptionQuantity] = useState("");
  const [css, theme] = useStyletron();

  const isLarge = useMediaQuery({
    query: `(min-width: ${theme.breakpoints.large}px)`,
  });

  useEffect(() => {
    setCart(getObj("cart"));
  }, []);

  const handleCombo = () => {
    if (handleStateComparation() && isOpen) {
      return cart.products[currentItem].amount.map((size, index) => {
        return { label: size.size, id: `${index}` };
      });
    } else {
      return [{ label: "Carregando...", id: "0" }];
    }
  };

  const handleEmptyCart = () => {
    return <H4 marginLeft="16px">O seu carrinho está vazio.</H4>;
  };

  const handleStateComparation = () => {
    // We need to wait until the cart state update
    if (Array.isArray(cart.products)) {
      if (cart.products.length) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  };

  const handleSelected = () => {
    // const validation = VAL_QUANTITY.validate(quantity);
    addCartSelection(currentItem, { size: size[0].label, quantity: quantity });
  };

  const handleUndefinedSelection = (selection, index) => {
    if (!selection) {
      setCurrentItem(index);
      setIsOpen(true);
    }
  };

  const renderListItems = () => {
    if (handleStateComparation()) {
      return cart.products.map((item, index) => {
        return (
          <ListItem
            onClick={() => console.log("Anderson")}
            key={index}
            overrides={{
              Content: {
                style: {
                  // marginLeft: "0px",
                  flexGrow: 1,
                },
              },
            }}
            endEnhancer={() => (
              <div
                className={css({
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                })}
              >
                <Button
                  onClick={() => {
                    setCurrentItem(index);
                    setModalOpen({ ...modalOpen, open: true });
                  }}
                  size="compact"
                  kind="secondary"
                  shape="round"
                >
                  <ChevronDown
                    onClick={() => {
                      setCurrentItem(index);
                      setModalOpen({ ...modalOpen, open: true });
                    }}
                  />
                </Button>

                <Label4>R${item.price}</Label4>
              </div>
            )}
          >
            <ListItemLabel
              description={`Tamanho: ${item?.selection?.size}, Quantidade: ${item?.selection?.quantity}`}
            >
              <StyledLink href={`${BASE}products/${item.id}`}>
                {item.title}
              </StyledLink>

              <br style={{ paddingTop: "5px" }} />
            </ListItemLabel>
          </ListItem>
        );
      });
    } else {
      return handleEmptyCart();
    }
  };

  const renderModal = () => {
    return (
      <div>
        <ModalSelection status={PS_TYPES.CART} currentItem={currentItem} />
        <Modal
          onClose={() => setConfirmRem(false)}
          closeable
          isOpen={confirmRem}
          animate
          autoFocus
          size={SIZE.default}
          role={ROLE.dialog}
          unstable_ModalBackdropScroll
        >
          <ModalHeader>Confirmação de exclusão</ModalHeader>
          <ModalBody>
            Deseja realmente excluir o item da sua lista de compras?
          </ModalBody>

          <ModalFooter>
            <ModalButton
              kind={ButtonKind.tertiary}
              onClick={() => {
                setConfirmRem(false);
              }}
            >
              Cancel
            </ModalButton>
            <ModalButton
              onClick={() => {
                setConfirmRem(false);
                removeCartItem(currentItem);
              }}
            >
              Okay
            </ModalButton>
          </ModalFooter>
        </Modal>
      </div>
    );
  };

  return (
    <>
      {/* <Display4 marginLeft="16px"> Meu carrinho</Display4> */}
      {cart ? (
        <>
          {/* <p>{JSON.stringify(cart.products.length)}</p> */}
          <ul
            className={css({
              paddingLeft: 0,
              paddingRight: 0,
              display: "flex",
              flexDirection: "column",
              alignContent: "stretch",
              width: isLarge ? "50vw" : "70vw",
            })}
          >
            {renderListItems()}
          </ul>
          {renderModal()}

          <Button onClick={() => setCurrentStep(1)}>Próximo</Button>
        </>
      ) : (
        <div>
          <Display4>O seu carrinho está vazio. </Display4>
        </div>
      )}
    </>
  );
}

export default Cart;
