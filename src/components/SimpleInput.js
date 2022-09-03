import useInput from "../hooks/use-input";

const SimpleInput = () => {
  const [nameInputProps, nameValidation, resetNameInput] = useInput((value) => value.trim() !== "");
  const [emailInputProps, emailValidation, resetEmailInput] = useInput((value) => value.includes("@"));

  let formIsValid = nameValidation.valueIsValid && emailValidation.valueIsValid;

  const formSubmissionHandler = (event) => {
    event.preventDefault();

    if (!formIsValid) {
      return;
    }

    console.log(`Name: ${nameInputProps.value}, Email: ${emailInputProps.value}`);

    resetNameInput();
    resetEmailInput();
  };

  const nameInputClasses = nameValidation.inputIsInvalid ? "invalid" : "";
  const emailInputClasses = emailValidation.inputIsInvalid ? "invalid" : "";

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
          <input type="email" id="email" {...emailInputProps} />
          {emailValidation.inputIsInvalid && <p className="error-text">Email must include @ and must not be empty.</p>}
        </div>
      </div>
      <div className="form-actions">
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
