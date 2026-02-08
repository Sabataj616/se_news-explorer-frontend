import "./LoginModal.css";

import { useForm } from "../../hooks/useForm";
import { useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useState } from "react";

function LoginModal({
  isOpen,
  onLogin,
  closeActiveModal,
  onToggleModal,
  activeModal,
}) {
  const [loginError, setLoginError] = useState("");
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
  const handleLoginChange = (evt) => {
    handleChange(evt);
    setLoginError("");
    setPasswordError("");
    setEmailError("");
  };

  function closeActiveLoginModal(evt) {
    closeActiveModal(evt);
    setLoginError("");
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
        onLogin(values);
      } else {
        setLoginError("Please fill in all fields!");
      }
    }
  }
  return (
    <ModalWithForm
      buttonText="Sign in"
      title="Sign in"
      closeActiveModal={closeActiveLoginModal}
      isOpen={isOpen}
      onSubmit={handleSubmit}
      formFilled={formFilled}
      onToggleModal={onToggleModal}
      activeModal={activeModal}
    >
      <span className="modal__error">{loginError}</span>
      <label htmlFor="user-email-input" className="modal__label">
        Email
      </label>
      <input
        className="modal__input"
        type="email"
        name="email"
        value={values.email}
        id="user-email-input"
        placeholder="Enter email"
        required
        onChange={handleLoginChange}
      />
      <span id="user-email-input-error" className="modal__error">
        {emailError}
      </span>
      <label htmlFor="user-password-input" className="modal__label">
        Password
      </label>
      <input
        className="modal__input"
        type="password"
        name="password"
        value={values.password}
        id="user-password-input"
        placeholder="Enter password"
        required
        onChange={handleLoginChange}
      />
      <span id="user-password-input-error" className="modal__error">
        {passwordError}
      </span>
    </ModalWithForm>
  );
}

export default LoginModal;
