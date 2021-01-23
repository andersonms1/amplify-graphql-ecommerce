import {
  H2,
  H5,
  H6,
  LabelLarge,
  LabelMedium,
  LabelSmall,
  LabelXSmall,
  Paragraph3,
  Paragraph4,
} from "baseui/typography";
import React from "react";
import { useStyletron } from "baseui";
import {
  FEMININO,
  MASCULINO,
  INFANTIL,
  CATEGORYS,
  SUBCATEGORYS,
} from "../../utils/CATEGORYSUBCATEGORYS";
import { Tag, KIND, VARIANT, SIZE } from "baseui/tag";
import Options from "./Options";
import {
  ResponsiveProperty,
  MediaQuerie,
} from "../../mediaQueries/mediaQueries";

function Categorys() {
  const [css, theme] = useStyletron();

  // const Item = ({ children }) => {
  //   return (
  //     <LabelSmall marginTop={theme.sizing.scale400}>{children}</LabelSmall>
  //   );
  // };

  const Item = ({ children }) => {
    return (
      <Tag marginTop={theme.sizing.scale400} closeable={false}>
        {children}
      </Tag>
    );
  };

  // const renderList = () => {
  //   return SUBCATEGORYS.map((item, index) => {
  //     return (
  //       <div
  //         className={css({
  //           display: "flex",
  //           // display: "inline-block",
  //           // whiteSpace: "nowrap",
  //           // whiteSpaceCollapsing: "discard",
  //           // scrollbarWidth: "none",
  //           // paddingRight: "10px",
  //         })}
  //         key={index}
  //       >
  //         <Item>{`${item.label}`}</Item>&nbsp;&nbsp;
  //       </div>
  //     );
  //   });
  // };

  const renderList = () => {
    return SUBCATEGORYS.map((item, index) => {
      return (
        <div
          className={css({
            display: "flex",
            // display: "inline-block",
            // whiteSpace: "nowrap",
            // whiteSpaceCollapsing: "discard",
            // scrollbarWidth: "none",
            // paddingRight: "10px",
          })}
          key={index}
        >
          <Item>{`${item.label}`}</Item>
        </div>
      );
    });
  };

  return (
    <div
      className={css({
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "flex-end",
        alignContent: "flex-end",
        alignSelf: "center",
      })}
    >
      {/* <div
        className={css({
          overflow: "auto",
          scrollbarWidth: "none",
          whiteSpace: "nowrap",
        })}
      >
        <div
          className={css({
            display: "inline-block",

            // overflow: "auto",
            // whiteSpace: "nowrap",
          })}
        >
          <Item>TUDO</Item>&nbsp;&nbsp;
          {renderList()}
        </div>
      </div> */}
      <div
        className={css({
          display: "flex",
          flexWrap: "wrap",
        })}
      >
        <Item>TUDO</Item>&nbsp;&nbsp;
        {renderList()}
      </div>
      {/* <Options /> */}
    </div>
  );
}

export default Categorys;
