import "./ModalWithForm.css";

function ModalWithForm({
  children,
  title,
  buttonText,
  isOpen,
  closeActiveModal,
  formFilled,
  onSubmit,
  onToggleModal,
  activeModal,
}) {
  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`} id="form-modal">
      <div className="modal__form-container">
        <button
          onClick={closeActiveModal}
          type="button"
          className="modal__white-close-btn"
        ></button>
        {isOpen && (
          <button
            type="button"
            className="mobile__modal-close-btn"
            onClick={closeActiveModal}
          />
        )}
        <h2 className="modal__title">{title}</h2>
        <form
          onSubmit={onSubmit}
          className="modal__form"
          id="item-form"
          noValidate
        >
          {children}
          <div className="modal__submit-btn_container">
            <button
              type="submit"
              className={`modal__submit-btn ${
                formFilled ? "" : "modal__submit-btn_disabled"
              }`}
            >
              {buttonText}
            </button>
            {(activeModal === "log-in" || activeModal === "register") && (
              <button
                onClick={onToggleModal}
                type="button"
                className="modal__submit-btn_toggle"
              >
                {activeModal === "log-in" && "or Sign Up"}
                {activeModal === "register" && "or Sign In"}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
