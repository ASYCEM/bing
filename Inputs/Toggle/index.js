import PropTypes from "prop-types";
import React from "react";

import { Input, Label, Span } from "./styles";

export const ToggleInput = ({ checked, onChange }) => (
  <Label>
    <Input checked={checked} onChange={(e) => onChange(e)} type="checkbox" />
    <Span />
  </Label>
);

ToggleInput.propTypes = {
  checked: PropTypes.bool,
  onChange: PropTypes.func,
};

ToggleInput.defaultProps = {
  checked: false,
  onChange: () => {},
};
