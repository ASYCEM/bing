import { styled } from "baseui";

export const Label = styled("label", () => ({
  position: "relative",
  display: "inline-block",
  width: "36px",
  height: "18px",
}));

export const Input = styled("input", ({ $theme }) => ({
  opacity: 0,
  width: 0,
  height: 0,
  ":checked + span": {
    background: `${$theme.colors.primary}`,
  },
  ":focus + span": {
    "box-shadow": "0 0 1px #2196F3",
  },
  ":checked + span:before": {
    transform: "translateX(18px)",
  },
}));

export const Span = styled("span", () => ({
  position: "absolute",
  cursor: "pointer",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: "#C1C1C1",
  transition: "0.4s",
  "border-radius": "14px",
  "::before": {
    content: "''",
    position: "absolute",
    height: "16px",
    width: "16px",
    left: "1px",
    bottom: "1px",
    background: "white",
    transition: ".4s",
    "border-radius": "50%",
  },
}));
