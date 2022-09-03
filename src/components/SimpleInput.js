import { useState } from "react";
import useInput from "../hooks/use-input";

const SimpleInput = () => {
  // const [enteredName, setEnteredName] = useState("");
  // const [enteredNameTouched, setEnteredNameTouched] = useState(false);

  const { inputProps: nameInputProps, validationState: nameValidation, reset: resetNameInput } = useInput((value) => value.trim() !== "");

  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredEmailTouched, setEnteredEmailTouched] = useState(false);

  // const enteredNameIsValid = enteredName.trim() !== "";
  // const nameInputIsInvalid = !enteredNameIsValid && enteredNameTouched;

  const enteredEmailIsValid = enteredEmail.trim() !== "" && enteredEmail.includes("@");
  const emailInputIsInvalid = !enteredEmailIsValid && enteredEmailTouched;

  let formIsValid = nameValidation.valueIsValid && enteredEmailIsValid;

  // const nameInputChangeHandler = (event) => {
  //   setEnteredName(event.target.value);
  // };
  // const nameInputBlurHandler = (event) => {
  //   setEnteredNameTouched(true);
  // };

  const emailInputChangeHandler = (event) => {
    setEnteredEmail(event.target.value);
  };
  const emailInputBlurHandler = (event) => {
    setEnteredEmailTouched(true);
  };

  const formSubmissionHandler = (event) => {
    event.preventDefault();

    if (!formIsValid) {
      return;
    }

    console.log(`Name: ${nameInputProps.value}, Email: ${enteredEmail}`);

    resetNameInput();
    setEnteredEmail("");
    setEnteredEmailTouched(false);
  };

  const nameInputClasses = nameValidation.inputIsInvalid ? "invalid" : "";
  const emailInputClasses = emailInputIsInvalid ? "invalid" : "";

  return (
    <form onSubmit={formSubmissionHandler}>
      <div className="form-control">
        <div className={nameInputClasses}>
          <label htmlFor="name">Your Name</label>
          <input type="text" id="name" {...nameInputProps} />
          {nameValidation.inputIsInvalid && <p className="error-text">Name must not be empty.</p>}
        </div>
        <div className={emailInputClasses}>
          <label htmlFor="email">Your Email</label>
          <input type="email" id="email" onChange={emailInputChangeHandler} onBlur={emailInputBlurHandler} value={enteredEmail} />
          {emailInputIsInvalid && <p className="error-text">Email must include @ and must not be empty.</p>}
        </div>
      </div>
      <div className="form-actions">
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
