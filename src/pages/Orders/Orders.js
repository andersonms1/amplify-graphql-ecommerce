import React, { useState, useEffect, useContext } from "react";
import { useStyletron } from "baseui";
import { Spinner } from "baseui/spinner";
import { ListItem, ListItemLabel, ARTWORK_SIZES } from "baseui/list";
import { Check } from "baseui/icon";

import { H4, LabelLarge, LabelMedium, LabelSmall } from "baseui/typography";
import { status as all_status, cart } from "../../context/types";
import { Alert, ChevronRight } from "baseui/icon";
import { StyledLink } from "baseui/link";
import { Receipt, Storefront } from "phosphor-react";
import { Button, KIND, SIZE, SHAPE } from "baseui/button";

/*
Apagar para quando as informações vierem das tabelas
*/
import { getObj } from "../../utils/localStorage";

//

function Orders() {
  const { products, address, total } = getObj(cart);
  const status = "Teste";
  const data = "10/10/21";
  const [selected, setSelected] = useState(-1); // era bom pegar pelo o id do pedido

  const [css, theme] = useStyletron();

  const orders = [
    {
      data: "18/02/2021",
      products,
      address,
      total,
      status: all_status.wait_payment_confimation,
    },
    {
      data: "05/01/2021",
      products,
      address,
      total,
      status: all_status.delivered_post_office,
    },
  ];

  const handleStatus = (status) => {
    switch (status) {
      case all_status.wait_payment_confimation:
        return <Alert size={22} />;
      case all_status.delivered_post_office:
        return <Check />;
      default:
        return "Não encontrado";
    }
  };

  const handleSelected = (index) => {
    if (index === selected) {
      setSelected(-1);
    } else {
      setSelected(index);
    }
  };

  const handleProducts = (_products) => {
    /*
      https://stackoverflow.com/questions/36652580/how-to-add-three-dots-to-text-when-overflow-in-html
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
      width:100px; // some width
    */
    return _products.map((item, index) => {
      return `${item.title}`;
    });
  };

  const renderOrder = (_products, _address, _status, _total) => {
    const {
      deliverTo,
      phone,
      ZIP,
      UF,
      city,
      neighborhood,
      street,
      number,
      complement,
    } = _address;

    const Label = ({ children }) => {
      return (
        <LabelMedium
          className={css({
            textAlign: "left",
            paddingLeft: theme.sizing.scale600,
          })}
        >
          {children}
        </LabelMedium>
      );
    };

    const LabelAddrss = ({ label, item, children }) => {
      return (
        <>
          <LabelMedium
            className={css({
              textAlign: "left",
              paddingLeft: theme.sizing.scale600,
            })}
          >
            {children}
          </LabelMedium>
          {/* <LabelSmall>New line?</LabelSmall> */}
        </>
      );
    };

    const LabelTitle = ({ children }) => {
      return (
        <H4
          className={css({
            textAlign: "left",
            paddingLeft: theme.sizing.scale600,
          })}
        >
          {children}
        </H4>
      );
    };

    const handleItems = (_products) => {
      return _products.map((item, index) => {
        return (
          <ListItem
            key={index}
            // artwork={(props) => <Storefront {...props} />}
            // artworkSize={ARTWORK_SIZES.SMALL}
            endEnhancer={() => <ListItemLabel>R${item.price}</ListItemLabel>}
            sublist
          >
            <ListItemLabel
              description={`Tamanho: ${item?.selection?.size}, Quantidade: ${item?.selection?.quantity}`}
            >
              <StyledLink>{item.title}</StyledLink>

              <br style={{ paddingTop: "5px" }} />
            </ListItemLabel>
          </ListItem>
        );
      });
    };
    return (
      <div>
        <LabelTitle>Produtos</LabelTitle>
        {handleItems(_products)}
        <LabelMedium
          className={css({
            textAlign: "right",
            paddingRight: theme.sizing.scale600,
            paddingTop: theme.sizing.scale600,
          })}
        >
          R${_total}
        </LabelMedium>
        <LabelTitle>Endereço</LabelTitle>
        <LabelAddrss>{`Entregar para: ${deliverTo}`}</LabelAddrss>
        <LabelAddrss>{`Telefone: ${phone}`}</LabelAddrss>
        <Label>{`CEP:  ${ZIP}`}</Label>
        <Label>{`Cidade e estado: ${city} - ${UF}`}</Label>
        <Label>{`Bairro: ${neighborhood}`}</Label>
        <Label>{`Rua:  ${street}`}</Label>
        <Label>{`Número:  ${number}`}</Label>
        <Label>{`Complemento:  ${complement}`}</Label>

        <LabelTitle>Status</LabelTitle>
        <LabelMedium
          className={css({
            textAlign: "left",
            paddingLeft: theme.sizing.scale600,

            paddingRight: theme.sizing.scale600,
            paddingBottom: "10px",
          })}
        >
          {_status}
        </LabelMedium>
      </div>
    );
  };

  const renderOrders = () => {
    return orders.map((item, index) => {
      return (
        <div
          key={index}
          // key={item.id}
        >
          <ListItem
            artwork={() => handleStatus(item.status)}
            artworkSize={ARTWORK_SIZES.MEDIUM}
            endEnhancer={() => (
              <Button
                onClick={() => handleSelected(index)}
                kind={KIND.secondary}
                size={SIZE.default}
                shape={SHAPE.round}
              >
                <ChevronRight size={22} onClick={() => handleSelected(index)} />
              </Button>
            )}
          >
            <ListItemLabel>{`${item.data} - ${handleProducts(
              item.products
            )}`}</ListItemLabel>
          </ListItem>
          {selected === index ? (
            <>
              {renderOrder(
                item.products,
                item.address,
                item.status,
                item.total
              )}
            </>
          ) : null}
        </div>
      );
    });
  };

  return (
    <div>
      <H4
        className={css({
          paddingRight: theme.sizing.scale600,
          paddingLeft: theme.sizing.scale600,
        })}
      >
        Meus pedidos
      </H4>
      {renderOrders()}
    </div>
  );
}

export default Orders;
