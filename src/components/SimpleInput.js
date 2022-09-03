import { useState } from "react";

const SimpleInput = (props) => {
  const [enteredName, setEnteredName] = useState("");
  const [enteredNameTouched, setEnteredNameTouched] = useState(false);

  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredEmailTouched, setEnteredEmailTouched] = useState(false);

  const enteredNameIsValid = enteredName.trim() !== "";
  const nameInputIsInvalid = !enteredNameIsValid && enteredNameTouched;

  const enteredEmailIsValid = enteredEmail.trim() !== "" && enteredEmail.includes("@");
  const emailInputIsInvalid = !enteredEmailIsValid && enteredEmailTouched;

  let formIsValid = enteredNameIsValid && enteredEmailIsValid;

  const nameInputChangeHandler = (event) => {
    setEnteredName(event.target.value);
  };
  const nameInputBlurHandler = (event) => {
    setEnteredNameTouched(true);
  };

  const emailInputChangeHandler = (event) => {
    setEnteredEmail(event.target.value);
  };
  const emailInputBlurHandler = (event) => {
    setEnteredEmailTouched(true);
  };

  const formSubmissionHandler = (event) => {
    event.preventDefault();
    setEnteredNameTouched(true);
    setEnteredEmailTouched(true);
    if (!formIsValid) {
      return;
    }

    console.log(`Name: ${enteredName}, Email: ${enteredEmail}`);

    setEnteredName("");
    setEnteredEmail("");
    setEnteredEmailTouched(false);
    setEnteredNameTouched(false);
  };

  const nameInputClasses = nameInputIsInvalid ? "invalid" : "";
  const emailInputClasses = emailInputIsInvalid ? "invalid" : "";

  return (
    <form onSubmit={formSubmissionHandler}>
      <div className="form-control">
        <div className={nameInputClasses}>
          <label htmlFor="name">Your Name</label>
          <input type="text" id="name" onChange={nameInputChangeHandler} onBlur={nameInputBlurHandler} value={enteredName} />
          {nameInputIsInvalid && <p className="error-text">Name must not be empty.</p>}
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
