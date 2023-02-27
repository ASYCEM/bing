import { styled } from "baseui";

export const LoginInput = styled("input", ({ $theme }) => ({
  color: $theme.colors.primary,
  width: "100%",
  backgroundColor: "transparent",
  borderTop: "none",
  borderRight: "none",
  borderLeft: "none",
  borderBottom: `solid 1px ${$theme.colors.grayLight}`,
  fontSize: "1.3rem",
  padding: "5px",
  lineHeight: "28px",

  ":focus": {
    outline: "none !important",
    border: "1px solid #2e58ff",
    borderRadius: "0.5rem",
  },
}));

export const AddressInput = styled("input", ({ $theme }) => ({
  height: "37px",
  width: "100%",
  background: "#F8F8F8",
  border: `1px solid ${$theme.colors.inputBorderColor}`,
  borderRadius: "5px",
  padding: "0 1.5rem",
  color: $theme.colors.primary,
  outline: "transparent",
  fontFamily: $theme.typography.primaryFontFamily,
  fontSize: "14px",

  ":focus": {
    border: `1px solid ${$theme.colors.primary}`,
  },

  "::placeholder": {
    color: $theme.colors.grayLight,
  },
}));

export const WelcomeAddressInput = styled("input", ({ $theme }) => ({
  height: "37px",
  width: "100%",
  background: $theme.colors.welcomeInputFill,
  border: "none",
  borderRadius: "3px",
  boxShadow: "0px 3px 6px #2E58FF53",
  padding: "0 1.5rem",
  color: $theme.colors.secondaryDark,
  outline: "transparent",
  fontFamily: $theme.typography.primaryFontFamily,
  fontSize: "16px",
  "::placeholder": {
    color: $theme.colors.welcomeInputPlaceholder,
  },
}));

export const SearchInput = styled("input", ({ $theme }) => ({
  height: "37px",
  width: "100%",
  background: "#F8F8F8",
  border: `1px solid ${$theme.colors.primary}`,
  borderRadius: ".25px",
  padding: "0 1.5rem",
  color: $theme.colors.primary,
  outline: "solid .1rem",
  fontFamily: $theme.typography.primaryFontFamily,
  fontSize: "14px",

  ":focus": {
    outline: "solid .15rem",
    border: "1px solid #2e58ff",
    borderRadius: "0.5rem",
  },

  "::placeholder": {
    color: $theme.colors.grayDark,
  },
}));
