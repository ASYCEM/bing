import { styled } from "baseui";

export const TableContainer = styled("div", ({ $theme, $outline }) => ({
  "overflow-x": "auto",
  border: `${$outline ? "none" : `solid 1px ${$theme.colors.primary}`}`,
  borderRadius: `${$outline ? "none" : "10px 10px 10px 10px"}`,
  boxShadow: $outline ? "none" : "3px 3px 6px #2e58ff4d",
  gridArea: "1 / 1 / 2 / 2",
  padding: "5px",
  fontFamily: "Poppins",
}));

export const TableStyles = styled("table", ({ $theme, $outline }) => ({
  color: `${$theme.colors.secondaryDark}`,
  width: "100%",
  "border-collapse": `${$outline ? "separate" : "collapse"}`,
  borderSpacing: `${$outline ? "0 15px" : "none"}`,
}));

export const Th = styled("th", ({ $theme, $outline }) => ({
  color: `${$theme.colors.primaryDark}`,
  padding: "7px 10px",
  "text-align": "initial",
  fontSize: `${$outline ? "12px" : "10px"}`,
  fontWeight: "bold",
}));

export const Tr = styled("tr", ({ $theme, $outline }) => ({
  height: "31px",
  fontSize: `${$outline ? "16px" : "12px"}`,
  borderBottom: `${$outline ? "none" : `solid 1px ${$theme.colors.primary}`}`,
  border: `${$outline ? `solid 1px ${$theme.colors.primary}` : "none"}`,
  ":nth-child(odd) td": {
    background: `${$outline ? "#FFFFFF" : "#F2F5FF"}`,
  },
  ":nth-child(n) td": {
    borderTop: `${$outline ? `solid 1px ${$theme.colors.primary}` : "unset"}`,
    borderBottom: `${
      $outline ? `solid 1px ${$theme.colors.primary}` : "unset"
    }`,
  },
  borderRadius: `${$outline ? "10px" : "inherit"}`,
  boxShadow: `${$outline ? "1px 2px 6px #2E58FF29" : "none"}`,
}));

export const Td = styled("td", () => ({
  padding: "3px 10px",
}));
