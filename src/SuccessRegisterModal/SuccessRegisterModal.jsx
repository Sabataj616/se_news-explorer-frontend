import "./SuccessRegisterModal.css";

function SuccessRegisterModal({
  isOpen,
  onToggleModal,
  isSuccess,
  closeActiveModal,
}) {
  return (
    <div
      className={`success__modal ${
        isOpen && isSuccess ? "success__modal-opened" : ""
      }`}
    >
      <div className="success__modal-container">
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
        <h2 className="success__modal-title">
          Registration Successfully Completed!
        </h2>

        <button
          onClick={onToggleModal}
          type="button"
          className="success__modal-submit-btn-toggle"
        >
          Sign In
        </button>
      </div>
    </div>
  );
}

export default SuccessRegisterModal;
