import React, { useState, useContext, useEffect } from "react";
import { useStyletron } from "baseui";
import { FormControl } from "baseui/form-control";
import { useMediaQuery } from "react-responsive";

import { Textarea } from "baseui/textarea";
import { Input, MaskedInput } from "baseui/input";
import { Tabs, Tab } from "baseui/tabs-motion";
import _ from "lodash";
import { Button, KIND } from "baseui/button";
import { Block } from "baseui/block";

import CheckoutContext from "../../../context/CheckoutContext";
import { deliverTo as VAL_DELIVER } from "./CheckoutValidations";
import { getInfoFromCEP } from "./api";
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

function Cart() {
  const { current, setCurrentStep, cart, getAddress, address } = useContext(
    CheckoutContext
  );
  const [lsAdrress, setLsAddress] = useState();

  const [css, theme] = useStyletron();
  const { breakpoints } = theme;
  const [inputEnable, setInputEnable] = useState(true);

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

  useEffect(() => {
    console.log("ola");
    getAddress();
    console.log(address);
  }, []);

  useEffect(() => {
    const {
      deliverTo,
      ZIP,
      UF, // state
      city,
      neighborhood,
      street,
      number,
      haveNumber,
      aditionalInformation,
      homeOrWork,
    } = address;
  }, [address]);

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
              const _deliverTo = `${e.target.value}`.trim().toUpperCase();
              setDeliverTo(_deliverTo);
              setObj({ ...lsAdrress, deliverTo: _deliverTo });
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
              setObj({ ...lsAdrress, phone: _phone });
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
              setObj({ ...lsAdrress, zip: _ZIP });
              let unmasked = getUnmasked(_ZIP);
              if (unmasked.length === 8) {
                const res = await getInfoFromCEP(unmasked);
                setInputEnable(false);

                const { erro } = res.data;

                if (erro) {
                  setZipError(true);
                  setCaptionZIP("Endereço não encontrado");
                  setErrors(true);
                } else {
                  setZipError(false);
                  setErrors(false);
                  setCaptionZIP("");
                  const {
                    uf,
                    localidade,
                    bairro,
                    logradouro,
                    complemento,
                  } = res.data;
                  setUF(uf);
                  setCity(localidade);
                  setNeighborhood(bairro);
                  setStreet(logradouro);
                  setComplement(complemento);
                }
                console.log(erro);
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
                disabled={inputEnable}
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
                disabled={inputEnable}
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
                disabled={inputEnable}
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
                disabled={inputEnable}
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
                disabled={inputEnable}
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

            <Button onClick={() => alert("click")}>Hello</Button>
          </>
        ) : null}
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
      return (
        <>
          <p>Carregando</p>
          {handleInputs()}
        </>
      );
    }
  };

  return renderContent();
}

export default Cart;
