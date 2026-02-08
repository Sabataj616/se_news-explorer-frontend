import "./RegisterModal.css";
import { useForm } from "../../hooks/useForm";
import { useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useState } from "react";

function RegisterModal({
  isOpen,
  onRegister,
  closeActiveModal,
  onToggleModal,
  activeModal,
}) {
  const [signupError, setSignupError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      return "Please enter an email address";
    }
    if (!emailRegex.test(email)) {
      return "invalid email address";
    }
    return "";
  };

  const validatePassword = (password) => {
    if (!password.trim()) {
      return "Please enter a password";
    }
    if (password.length < 8) {
      return "Password must be at least 8 characters long";
    }
    return "";
  };

  const defaultValues = {
    email: "",
    password: "",
    name: "",
  };

  const { values, handleChange, setValues } = useForm(defaultValues);

  useEffect(() => {
    if (isOpen) {
      setValues(defaultValues);
    }
  }, [isOpen]);
  const formFilled =
    values.email === "" || values.password === "" || values.password.length < 8
      ? false
      : true;

  const handleSignupChange = (evt) => {
    handleChange(evt);
    setSignupError("");
    setPasswordError("");
    setEmailError("");
  };

  function closeActiveSignupModal(evt) {
    closeActiveModal(evt);
    setSignupError("");
    setPasswordError("");
    setEmailError("");
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    const emailValidationError = validateEmail(values.email);
    const passwordValidationError = validatePassword(values.password);

    setEmailError(emailValidationError);
    setPasswordError(passwordValidationError);

    if (!emailValidationError && !passwordValidationError) {
      if (formFilled) {
        onRegister(values);
      } else {
        setSignupError("Please fill in all fields!");
      }
    }
  }

  return (
    <ModalWithForm
      buttonText="Sign Up"
      title="Sign Up"
      closeActiveModal={closeActiveSignupModal}
      isOpen={isOpen}
      onSubmit={handleSubmit}
      onToggleModal={onToggleModal}
      activeModal={activeModal}
      formFilled={formFilled}
    >
      <label htmlFor="register-email-input" className="modal__label">
        Email
      </label>
      <input
        className="modal__input"
        type="email"
        name="email"
        value={values.email}
        id="register-email-input"
        placeholder="Enter email address"
        required
        onChange={handleSignupChange}
      />
      <span id="register-email-input-error" className="modal__error">
        {emailError}
      </span>
      <label htmlFor="register-password-input" className="modal__label">
        Password
      </label>
      <input
        className="modal__input"
        type="password"
        name="password"
        value={values.password}
        id="register-password-input"
        placeholder="Enter password"
        required
        onChange={handleSignupChange}
      />
      <span id="register-password-input-error" className="modal__error">
        {passwordError}
      </span>
      <label htmlFor="name-input" className="modal__label">
        Username
      </label>
      <input
        className="modal__input"
        type="text"
        name="name"
        value={values.name}
        id="name-input"
        placeholder="Enter your username"
        required
        onChange={handleSignupChange}
      />

      <span id="sign-up-error" className="modal__error">
        {" "}
        {signupError}
      </span>
    </ModalWithForm>
  );
}

export default RegisterModal;
