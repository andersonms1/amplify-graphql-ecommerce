import React, { useState, useContext, useEffect } from "react";
import { useStyletron } from "baseui";
import { FormControl } from "baseui/form-control";
import { useMediaQuery } from "react-responsive";

import { Input, MaskedInput } from "baseui/input";
import _, { zip } from "lodash";
import { Button, KIND } from "baseui/button";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalButton,
  SIZE,
  ROLE,
} from "baseui/modal";

import CheckoutContext from "../../../context/CheckoutContext";
import { getInfoFromCEP } from "./api";
import { deliverTo as VAL_DELIVER } from "./CheckoutValidations";
import { state as VAL_UF } from "./CheckoutValidations";
import { city as VAL_CITY } from "./CheckoutValidations";
import { neighborhood as VAL_NEIGH } from "./CheckoutValidations";
import { street as VAL_STREET } from "./CheckoutValidations";
import { complematitionInfo as VAL_COMPL } from "./CheckoutValidations";
import { number as VAL_NUMBER } from "./CheckoutValidations";
import {
  getObj,
  clear,
  setObj,
  setItem,
  getItem,
} from "../../../utils/localStorage";
import { NIL } from "uuid";
import { currentCheckoutPage } from "../../../context/types";

function Cart() {
  const {
    current,
    setCurrentStep,
    cart,
    getAddress,
    setCart,
    address,
    updateAddress,
  } = useContext(CheckoutContext);
  const [lsAdrress, setLsAddress] = useState();

  const [css, theme] = useStyletron();
  const { breakpoints } = theme;
  const [inputEnable, setInputEnable] = useState(true);
  const [error, setError] = useState();

  const [deliverTo, setDeliverTo] = useState(""); //name
  const [captionDeliverTo, setCaptionDeliverTo] = useState("");
  const [delivetToErro, setDeliverToErro] = useState(false);

  const [ZIP, setZIP] = useState(""); //cep
  const [captionZIP, setCaptionZIP] = useState("");
  const [zipError, setZipError] = useState(false);

  const [UF, setUF] = useState("");
  const [captionUF, setCaptionUF] = useState("");
  const [UFError, setUFError] = useState(false);

  const [city, setCity] = useState("");
  const [captionCity, setCaptionCity] = useState("");
  const [cityError, setCityErro] = useState(false);

  const [neighborhood, setNeighborhood] = useState("");
  const [captionNeighborhood, setCaptionNeighborhood] = useState("");
  const [neighborhoodError, setNeighborhoodError] = useState(false);

  const [street, setStreet] = useState("");
  const [captionStreet, setCaptionStreeet] = useState("");
  const [streetError, setStreetError] = useState(false);

  const [complement, setComplement] = useState("");
  const [captionComplement, setCaptionComplement] = useState("");
  const [complementError, setComplementError] = useState(false);

  const [phone, setPhone] = useState("");
  const [captionPhone, setCaptionPhone] = useState("");
  const [phoneError, setPhoneError] = useState(false);

  const [number, setNumber] = useState("");
  const [captionNumber, setCaptionNumber] = useState("");
  const [numberError, setNumberError] = useState(false);

  /*
    local storage save
    trim! uppercase?
    validate next
    prevent complexity. create table for address

  */

  const PHONE_SIZE = 11;

  // useEffect(() => {
  //   setCart(getObj("cart"));
  //   console.log(getObj("cart"));
  // }, []);

  useEffect(() => {
    if (cart?.address) {
      console.log("here");
      console.log(cart?.address);
      const {
        deliverTo,
        ZIP,
        UF,
        city,
        neighborhood,
        street,
        complement,
        phone,
        number,
      } = cart.address;

      setDeliverTo(deliverTo);
      setZIP(ZIP);
      setUF(UF);
      setCity(city);
      setNeighborhood(neighborhood);
      setStreet(street);
      setComplement(complement);
      setPhone(phone);
      setNumber(number);
    }
  }, [cart, current]);

  useEffect(() => {
    updateAddress({
      deliverTo,
      ZIP,
      UF,
      city,
      neighborhood,
      street,
      complement,
      phone,
      number,
    });
    console.log(getObj("cart"));
  }, [
    deliverTo,
    ZIP,
    UF,
    city,
    neighborhood,
    street,
    complement,
    phone,
    number,
  ]);

  // useEffect(() => {
  //   const {
  //     deliverTo,
  //     ZIP,
  //     UF, // state
  //     city,
  //     neighborhood,
  //     street,
  //     number,
  //     haveNumber,
  //     aditionalInformation,
  //     homeOrWork,
  //   } = address;
  // }, [address]);

  const isLarge = useMediaQuery({
    query: `(min-width: ${breakpoints.large}px)`,
  });

  const cssInputs = css({
    paddingRight: "10px",
  });

  const getUnmasked = (masked) => {
    let unmasked = "";
    [...masked].forEach((c) => {
      if (Number.isInteger(parseInt(c))) {
        unmasked = unmasked + c;
      }
    });
    return unmasked;
  };

  const handleFormSubmit = () => {
    // Remember: This implementation validate the fields deliverTo, phone and number.
    // The other fields are linked to zip, so without a zip, without next button. Remember THIS!
    let erro = false;
    if (
      delivetToErro ||
      phoneError ||
      zipError ||
      UFError ||
      cityError ||
      neighborhoodError ||
      streetError ||
      numberError
    ) {
      setError(true);
    } else {
      setCurrentStep(2);
      setError(false);
    }
  };

  const setErrors = (condition) => {
    setUFError(condition);
    setCityErro(condition);
    setNeighborhoodError(condition);
    setStreetError(condition);
    // setComplementError(condition); Its not a required field, so no point
  };

  const handleInputs = () => {
    return (
      <div
        className={css({
          display: "flex",
          // flexDirection: isLarge ? "row" : "column",
          flexDirection: "row",
          flexWrap: "wrap",
        })}
      >
        <FormControl label="Entregar para" caption={`${captionDeliverTo}`}>
          <Input
            value={deliverTo}
            placeholder="Nome destinatário"
            error={captionDeliverTo}
            onChange={(e) => {
              const _deliverTo = `${e.target.value}`.toUpperCase();
              setDeliverTo(_deliverTo);

              const { error } = VAL_DELIVER.validate(
                { deliverTo },
                { abortEarly: false }
              );
              if (error) {
                setDeliverToErro(true);
                setCaptionDeliverTo(error.message);
              } else {
                setDeliverToErro(false);
                setCaptionDeliverTo("");
              }
            }}
            clearOnEscape
          />
        </FormControl>

        <FormControl label="Telefone" caption={`${captionPhone}`}>
          <MaskedInput
            value={phone}
            disabled={false}
            error={phoneError}
            mask="(99)9-9999.9999"
            placeholder="(99)9-9999.9999"
            // placeholder="Telefone destinatário"
            clearOnEscape
            onChange={(e) => {
              const _phone = `${e.target.value}`;
              setPhone(_phone);

              const unmasked = getUnmasked(_phone);
              const error = unmasked.length === PHONE_SIZE ? false : true;
              if (error) {
                setPhoneError(true);
                setCaptionPhone(
                  "Digite os 2 digítos do DD. E os 9 digítos do telefone"
                );
              } else {
                setPhoneError(false);
                setCaptionPhone("");
              }
            }}
          />
        </FormControl>

        <FormControl label="CEP" caption={`${captionZIP}`}>
          <MaskedInput
            mask="99.999-999"
            value={ZIP}
            error={zipError}
            onChange={async (e) => {
              const _ZIP = `${e.target.value}`;
              setZIP(_ZIP);

              let unmasked = getUnmasked(_ZIP);
              if (unmasked.length === 8) {
                const res = await getInfoFromCEP(unmasked);
                console.log(res);

                const { erro } = res.data;
                setInputEnable(false);
                if (erro) {
                  console.log(erro);
                  setZipError(true);
                  setCaptionZIP("Endereço não encontrado");
                  setErrors(true);
                } else {
                  setZipError(false);
                  setErrors(false);
                  setCaptionZIP("");
                  console.log("bp");
                  const {
                    uf,
                    localidade,
                    bairro,
                    logradouro,
                    complemento,
                  } = res.data;
                  console.log("bp");
                  setUF(uf);
                  setCity(localidade);
                  setNeighborhood(bairro);
                  setStreet(logradouro);
                  setComplement(complemento);
                  console.log("bp");
                  // setInputEnable(false);
                }
              }
              // setCaptionZIP(caption);
            }}
            placeholder="99.999-999"
            clearOnEscape
          />
        </FormControl>

        {!inputEnable ? (
          <>
            <FormControl label="Estado" caption={`${captionUF}`}>
              <Input
                value={UF}
                disabled={inputEnable}
                error={UFError}
                placeholder=""
                clearOnEscape
                onChange={(e) => {
                  setUF(e.target.value);
                  const { error } = VAL_UF.validate(
                    { state: `${e.target.value}` },
                    { abortEarly: false }
                  );

                  if (error) {
                    setUFError(true);
                    setCaptionUF(`${error.message}`);
                  } else {
                    setUFError(false);
                    setCaptionUF("");
                  }
                }}
              />
            </FormControl>

            <FormControl label="Cidade" caption={`${captionCity}`}>
              <Input
                value={city}
                // disabled={inputEnable}
                error={cityError}
                placeholder=""
                clearOnEscape
                onChange={(e) => {
                  setCity(e.target.value);
                  const { error } = VAL_CITY.validate(
                    { city: `${e.target.value}` },
                    { abortEarly: false }
                  );

                  if (error) {
                    setCityErro(true);
                    setCaptionCity(`${error.message}`);
                  } else {
                    setCityErro(false);
                    setCaptionCity("");
                  }
                }}
              />
            </FormControl>

            <FormControl label="Bairro" caption={`${captionNeighborhood}`}>
              <Input
                value={neighborhood}
                // disabled={inputEnable}
                error={neighborhoodError}
                placeholder=""
                clearOnEscape
                onChange={(e) => {
                  setNeighborhood(e.target.value);
                  const { error } = VAL_NEIGH.validate(
                    { neighborhood: `${e.target.value}` },
                    { abortEarly: false }
                  );

                  if (error) {
                    setNeighborhoodError(true);
                    setCaptionNeighborhood(`${error.message}`);
                  } else {
                    setNeighborhoodError(false);
                    setCaptionNeighborhood("");
                  }
                }}
              />
            </FormControl>

            <FormControl label="Rua/Avenida" caption={`${captionStreet}`}>
              <Input
                value={street}
                // disabled={inputEnable}
                error={streetError}
                placeholder=""
                clearOnEscape
                onChange={(e) => {
                  setStreet(e.target.value);
                  const { error } = VAL_STREET.validate(
                    { street: `${e.target.value}` },
                    { abortEarly: false }
                  );

                  if (error) {
                    setStreetError(true);
                    setCaptionStreeet(`${error.message}`);
                  } else {
                    setStreetError(false);
                    setCaptionStreeet("");
                  }
                }}
              />
            </FormControl>

            <FormControl label="Complemento" caption={`${captionComplement}`}>
              <Input
                value={complement}
                // disabled={inputEnable}
                error={complementError}
                placeholder=""
                clearOnEscape
                onChange={(e) => {
                  setComplement(e.target.value);
                  const { error } = VAL_COMPL.validate(
                    { complement: `${e.target.value}` },
                    { abortEarly: false }
                  );

                  if (error) {
                    setComplementError(true);
                    setCaptionComplement(`${error.message}`);
                  } else {
                    setComplementError(false);
                    setCaptionComplement("");
                  }
                }}
              />
            </FormControl>

            <FormControl label="Número" caption={`${captionNumber}`}>
              <Input
                value={number}
                // disabled={inputEnable}
                error={numberError}
                placeholder=""
                clearOnEscape
                onChange={(e) => {
                  setNumber(e.target.value);
                  const { error } = VAL_NUMBER.validate(
                    { number: `${e.target.value}` },
                    { abortEarly: false }
                  );

                  if (error) {
                    setNumberError(true);
                    // setCaptionNumber(`${error.message}`);
                    setCaptionNumber(
                      "É um campo obrigatório. Só é aceito dígitos"
                    );
                  } else {
                    setNumberError(false);
                    setCaptionNumber("");
                  }
                }}
              />
            </FormControl>
            <Modal
              onClose={() => setError(false)}
              closeable
              isOpen={error}
              size={SIZE.default}
              role={ROLE.dialog}
              unstable_ModalBackdropScroll
            >
              <ModalHeader>Erro na validação</ModalHeader>
              <ModalBody>
                É necessário corrigir o(s) erro(s) para poder continuar.
              </ModalBody>
              <ModalFooter>
                <ModalButton onClick={() => setError(false)}>Okay</ModalButton>
              </ModalFooter>
            </Modal>
          </>
        ) : null}

        <Button
          type="secondary"
          kind={KIND.secondary}
          onClick={() => setCurrentStep(0)}
        >
          Anterior
        </Button>
        <Button onClick={() => handleFormSubmit()}>Próximo</Button>
      </div>
    );
  };

  const isLoading = () => {
    if (address.items) {
      return true;
    }
    return false;
  };

  const renderContent = () => {
    if (!isLoading) {
      return <div>{JSON.stringify(address)}</div>;
    } else {
      return <>{handleInputs()}</>;
    }
  };

  return renderContent();
}

export default Cart;
