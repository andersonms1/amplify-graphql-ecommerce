import { Cell, Grid } from "baseui/layout-grid";
import React from "react";
import {
  HeadingMedium,
  HeadingSmall,
  HeadingXSmall,
  LabelMedium,
} from "baseui/typography";
import { StyledLink } from "baseui/link";
import { Block } from "baseui/block";
import {
  InstagramLogo,
  FacebookLogo,
  TwitterLogo,
  Envelope,
} from "phosphor-react";
import { useStyletron } from "baseui";
import logo from "../../assets/imgs/logo_white.svg";

function Footer() {
  const [css, theme] = useStyletron();

  const color = css({
    color: theme.colors.primaryB,
  });

  const WhiteHead = ({ children }) => {
    return <HeadingSmall className={color}>{children}</HeadingSmall>;
  };

  const WhiteLabel = ({ children }) => {
    return (
      <LabelMedium className={color} paddingBottom={theme.sizing.scale400}>
        {children}
      </LabelMedium>
    );
  };

  const WhiteLink = ({ children }) => {
    return <StyledLink className={color}>{children}</StyledLink>;
  };

  return (
    <div className={css({ background: theme.colors.backgroundAlwaysDark })}>
      <Grid>
        <Cell span={[4, 8, 12]}>
          <div
            className={css({
              borderTop: `1px solid ${theme.colors.contentSecondary}`,
              boxShadow: theme.sizing.scale700,
            })}
          />
        </Cell>
        <Cell span={[2, 4, 3]}>
          <WhiteHead>Entrar</WhiteHead>
          <WhiteLink>Login</WhiteLink>
        </Cell>

        <Cell span={[2, 4, 3]}>
          <WhiteHead>Explore</WhiteHead>

          <WhiteLabel>
            <WhiteLink>Bolsas</WhiteLink>
          </WhiteLabel>
          <WhiteLabel>
            <WhiteLink>Calçados</WhiteLink>
          </WhiteLabel>
          <WhiteLabel>
            <WhiteLink>Academia</WhiteLink>
          </WhiteLabel>
          <WhiteLabel>
            <WhiteLink>Novidades</WhiteLink>
          </WhiteLabel>
        </Cell>
        <Cell span={[2, 4, 3]}>
          <WhiteHead>Siga</WhiteHead>
          <WhiteLabel>
            <WhiteLink>
              instagram <InstagramLogo size={22} />
            </WhiteLink>
          </WhiteLabel>
          <WhiteLabel>
            <WhiteLink>
              facebook <FacebookLogo size={22} />
            </WhiteLink>
          </WhiteLabel>
          <WhiteLabel>
            <WhiteLink>
              twitter <TwitterLogo size={22} />
            </WhiteLink>
          </WhiteLabel>

          <WhiteLabel>
            <WhiteLink>
              email <Envelope size={22} />
            </WhiteLink>
          </WhiteLabel>
        </Cell>
        <Cell span={[4, 8, 12]}>
          <div
            className={css({
              display: "flex",
              alignItems: "center",
              flexDirection: "row",
              justifyContent: "space-between",
              flexWrap: "wrap",
              paddingTop: theme.sizing.scale1200,
              paddingBottom: theme.sizing.scale1200,
            })}
          >
            <WhiteLabel>Copyright &copy; 2020. All rights reserved.</WhiteLabel>
            <div>
              <WhiteLink>Desenvolvido por: </WhiteLink>
              {/* <img
                alt=""
                src={logo}
                className={css({
                  marginLeft: theme.sizing.scale700,
                  marginBottom: theme.sizing.scale1200,
                })}
              /> */}
            </div>
            {/* <Block paddingRight={["0px", "16px", "16px"]} /> */}
            {/* <img src={logo} width="200px" height="auto" /> */}
          </div>
        </Cell>
      </Grid>
    </div>
  );
}

export default Footer;
