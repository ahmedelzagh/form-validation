import { useState } from "react";

const useInput = (validationRules) => {
  const [value, setValue] = useState("");
  const [isTouched, setIsTouched] = useState(false);

  const valueIsValid = validationRules(value);
  const inputIsInvalid = !valueIsValid && isTouched;

  const onChange = (e) => {
    setValue(e.target.value);
  };
  const onBlur = () => {
    setIsTouched(true);
  };

  const reset = () => {
    setValue("");
    setIsTouched(false);
  };

  return { inputProps: { value, onChange, onBlur }, validationState: { inputIsInvalid, valueIsValid }, reset };
};

export default useInput;
