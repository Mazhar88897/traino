import PhoneInput from "react-phone-input-2";
import 'react-phone-input-2/lib/style.css';
import { Style } from "./style";

const CustomPhone = ({ inputProps, country, enableSearch, disableSearchIcon, autocompleteSearch, enableClickOutside, defaultErrorMessage, placeholder, countryCodeEditable, onChange, onBlur, enableAreaCodes, value, disabled }) => {
  return (
    <PhoneInput
      inputProps={inputProps}
      country={country}
      enableSearch={enableSearch}
      enableAreaCodes={enableAreaCodes}
      disableSearchIcon={disableSearchIcon}
      autocompleteSearch={autocompleteSearch}
      enableClickOutside={enableClickOutside}
      defaultErrorMessage={defaultErrorMessage}
      inputStyle={Style.input}
      buttonStyle={Style.button}
      dropdownStyle={Style.dropDown}
      containerStyle={Style.containerStyle}
      searchStyle={Style.searchStyle}
      placeholder={placeholder}
      value={value}
      disabled={disabled}
      countryCodeEditable={countryCodeEditable}
      onChange={onChange}
      onBlur={onBlur}
    />

  )
}

export default CustomPhone