import React, { useState, useContext, useEffect } from "react";
import { useStyletron } from "baseui";
import { ListItem, ListItemLabel } from "baseui/list";
import ChevronDown from "baseui/icon/chevron-down";
import { StyledLink } from "baseui/link";
import { KIND as ButtonKind } from "baseui/button";
import { Button } from "baseui/button";
import { Display4, H4, Label4 } from "baseui/typography";
import { useMediaQuery } from "react-responsive";

import { getObj } from "../../../utils/localStorage";
import CheckoutContext from "../../../context/CheckoutContext";
import { BASE } from "../../../utils/LINKS";
import ModalUpdateItem from "./ModalUpdateItem";

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
  const [css, theme] = useStyletron();

  const isLarge = useMediaQuery({
    query: `(min-width: ${theme.breakpoints.large}px)`,
  });

  useEffect(() => {
    setCart(getObj("cart"));
  }, []);

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

  return (
    <>
      <ModalUpdateItem currentItem={currentItem} />
      {cart ? (
        <>
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
