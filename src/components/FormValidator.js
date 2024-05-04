export default class FormValidator {
  constructor(options, formElement) {
    this._inputSelector = options.inputSelector;
    this._formSelector = options.formSelector;
    this._submitButtonSelector = options.submitButtonSelector;
    this._inputErrorClass = options.inputErrorClass;
    this._errorClass = options.errorClass;

    this._form = formElement;

    this._inputElements = Array.from(
      this._form.querySelectorAll(this._inputSelector)
    );

    this._submitButton = this._form.querySelector(this._submitButtonSelector);
  }

  _showInputError(inputElement) {
    const errorMessageElement = this._form.querySelector(
      `#${inputElement.id}-error`
    );
    inputElement.classList.add(this._inputErrorClass);
    errorMessageElement.textContent = inputElement.validationMessage;
    errorMessageElement.classList.add(this._errorClass);
  }

  _hideInputError(inputElement) {
    const errorMessageElement = this._form.querySelector(
      `#${inputElement.id}-error`
    );
    inputElement.classList.remove(this._inputErrorClass);
    errorMessageElement.textContent = "";
    errorMessageElement.classList.remove(this._errorClass);
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      return this._showInputError(inputElement);
    }

    this._hideInputError(inputElement);
  }

  _disableButton() {
    this._submitButton.disabled = true;
  }

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._disableButton();
      return;
    }
    this._submitButton.disabled = false;
  }

  _hasInvalidInput() {
    return !this._inputElements.every(
      (inputElement) => inputElement.validity.valid
    );
  }

  _setEventListeners() {
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();

      this._disableButton();
    });

    this._inputElements.forEach((inputElement) => {
      inputElement.addEventListener("input", (evt) => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  }

  //add a reset Validation function...
  // resetValidation() {
  //   this._toggleButtonState(); <== controlling the submit button ==

  //   this._inputList.forEach((inputElement) => {
  //     this._hideError(inputElement) <== clearing errors ==
  //   });

  // }

  enableValidation() {
    this._setEventListeners();
  }
}
