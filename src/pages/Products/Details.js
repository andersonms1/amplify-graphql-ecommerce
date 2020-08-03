import React from "react";
import { FlexGrid, FlexGridItem } from "baseui/flex-grid";
import { useStyletron } from "baseui";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
} from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { Paragraph4, Paragraph3 } from "baseui/typography";

import { PHOTO_AHMED, PHOTO_HILL } from "../../assets/imgs";

function Details() {
  let { id } = useParams();
  return <div>{id}</div>;
}

export default Details;
