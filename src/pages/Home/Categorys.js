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
import {
  ResponsiveProperty,
  MediaQuerie,
} from "../../mediaQueries/mediaQueries";

function Categorys() {
  const [css, theme] = useStyletron();

  const Item = ({ children }) => {
    return (
      <LabelSmall
        overrides={{
          Block: {
            style: {
              // textDecoration: "underline",
              // paddingRight: theme.sizing.scale400,
              // paddingLeft: theme.sizing.scale400,
              // marginTop: theme.sizing.scale400,
              // marginBottom: theme.sizing.scale400,
              // background: "#e0e0e0",
            },
          },
        }}
        marginTop={theme.sizing.scale400}
      >
        {children}
      </LabelSmall>
    );
  };

  // const Item = ({ children }) => {
  //   return (
  //     <Tag marginTop={theme.sizing.scale400} closeable={false}>
  //       {children}
  //     </Tag>
  //   );
  // };

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
    const ALL = [{ label: "TUDO" }, ...SUBCATEGORYS];
    return ALL.map((item, index) => {
      return <Item key={index}>{`${item.label}`}&nbsp;&nbsp;&nbsp;&nbsp;</Item>;
    });
  };

  return (
    <div
    // className={css({
    //   display: "flex",
    //   flexDirection: "row",
    //   justifyContent: "flex-end",
    //   alignItems: "flex-end",
    //   alignContent: "flex-end",
    //   alignSelf: "center",
    // })}
    >
      <div
        className={css({
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          // display: "inline-block",
          // whiteSpace: "nowrap",
          // whiteSpaceCollapsing: "discard",
          // scrollbarWidth: "none",
          // paddingRight: "10px",
        })}
      >
        {renderList()}
      </div>
    </div>
  );
}

export default Categorys;
