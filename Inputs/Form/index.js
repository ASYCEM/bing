import { Input as InputBaseUi, SIZE as SIZE_INPUT } from "baseui/input";
import { MODAL_GENERAL_INPUT_OVERRIDE } from "components/Overrides/Input";
import PropTypes from "prop-types";

export const InputDefault = ({
  value,
  handleChange,
  placeholder,
  clearable,
  ...props
}) => (
  <InputBaseUi
    {...props}
    clearable={clearable}
    onChange={(e) => handleChange(e.target.value)}
    overrides={MODAL_GENERAL_INPUT_OVERRIDE}
    placeholder={placeholder}
    required
    size={SIZE_INPUT.compact}
    value={value}
  />
);

InputDefault.defaultProps = {
  handleChange: () => {},
  placeholder: "",
  clearable: true,
  value: "",
};

InputDefault.propTypes = {
  handleChange: PropTypes.func,
  placeholder: PropTypes.string,
  clearable: PropTypes.bool,
  value: PropTypes.string,
};
