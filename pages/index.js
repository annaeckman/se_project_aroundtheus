import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import ModalWithForm from "../components/ModalWithForm.js";
import UserInfo from "../components/UserInfo.js";

const initialCards = [
  {
    name: "Joshua Tree",
    link: "https://images.unsplash.com/photo-1596625820723-f0f481ff80be?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8am9zaHVhJTIwdHJlZXxlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    name: "Emigrant Wilderness",
    link: "https://images.unsplash.com/photo-1446575983799-470c50cfdd25?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGVtaWdyYW50JTIwd2lsZGVybmVzc3xlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    name: "Redwood National Forest",
    link: "https://images.unsplash.com/photo-1698410531000-bdbb42dc388e?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHJlZHdvb2QlMjBuYXRpb25hbCUyMGZvcmVzdHxlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    name: "Marin Headlands",
    link: "https://images.unsplash.com/photo-1536687485033-90afd5b75fb8?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fG1hcmluJTIwaGVhZGxhbmRzfGVufDB8fDB8fHww",
  },
  {
    name: "Trinity Alps",
    link: "https://images.unsplash.com/photo-1648847672613-ca4f0351acae?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHRyaW5pdHklMjBhbHBzfGVufDB8fDB8fHww",
  },
  {
    name: "Goat Rock Beach",
    link: "https://images.unsplash.com/photo-1578422212025-0e64506a0be9?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Z29hdCUyMHJvY2slMjBiZWFjaHxlbnwwfHwwfHx8MA%3D%3D",
  },
];

//Wrappers:
const cardListEl = document.querySelector(".cards__list");
const profileEditModal = document.querySelector("#edit-modal");
const addCardModal = document.querySelector("#add-card-modal");
const previewImageModal = document.querySelector("#preview-image-modal");
const profileFormElement = document.forms["edit-profile-form"];
const addCardFormElement = document.forms["add-card-form"];

//
//Buttons and Nodes:
const profileEditButton = document.querySelector(".profile__edit-button");
const closeButtons = document.querySelectorAll(".modal__close");
const profileName = document.querySelector(".profile__name");
const profileJob = document.querySelector(".profile__job");
const addNewCardButton = document.querySelector(".profile__add-button");
const previewSubtitle = previewImageModal.querySelector(
  ".modal__picture-subtitle"
);
const modalImage = document.querySelector(".modal__image-preview");

//Form Data:
const nameInput = document.querySelector("[name='name'");
const jobInput = document.querySelector("[name='job']");
const cardTitleInput = addCardFormElement.querySelector("#title");
const cardUrlInput = addCardFormElement.querySelector("#url");

const options = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__submit-button",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

////CLASS IMPLEMENTATION BELOW///////

const profileFormValidator = new FormValidator(options, profileFormElement);
profileFormValidator.enableValidation();

const addCardFormValidator = new FormValidator(options, addCardFormElement);
addCardFormValidator.enableValidation();

//Section Class instantiation:
const cardsSection = new Section(
  {
    items: initialCards,
    renderer: (cardData) => {
      const cardElement = new Card(cardData, "#card-template");
      cardsSection.addItem(cardElement.generateCard());
    },
  },
  ".cards__list"
);
cardsSection.renderItems();

//PROFILE MODAL INSTANTIATION:
const profileModal = new ModalWithForm("#edit-modal", handleProfileFormSubmit);
profileModal.setEventListeners();

//NEW CARD MODAL INSTANTIATION:
const cardModal = new ModalWithForm("#add-card-modal", handleAddCardFormSubmit);
cardModal.setEventListeners();

//USER INFO INSTANSTIATION:
const userInfo = new UserInfo({
  nameElementSelector: ".profile__name",
  jobElementSelector: ".profile__job",
});

//Event listeners for modal buttons:
profileEditButton.addEventListener("click", () => {
  const currentUser = userInfo.getUserInfo();
  nameInput.value = currentUser.name;
  jobInput.value = currentUser.job;

  profileModal.open();
});

addNewCardButton.addEventListener("click", () => {
  cardModal.open();
});

// closeButtons.forEach((button) => {
//   // const modal = button.closest(".modal");
//   button.addEventListener("click", () => {
//     profileModal.close();
//     //OR
//     cardModal.close();
//   });
// });

//Functions:
function handleProfileFormSubmit(inputValues) {
  profileName.textContent = inputValues.name;
  profileJob.textContent = inputValues.job;
}

function handleAddCardFormSubmit(inputValues) {
  const name = inputValues.name;
  const link = inputValues.url;
  const newCard = new Card({ name, link }, "#card-template", handleImageClick);

  cardListEl.prepend(newCard.generateCard());
}

function handleImageClick(card) {
  modalImage.src = card._image;
  modalImage.alt = `Photo of ${card._name}`;
  previewSubtitle.textContent = card._name;
  // previewImageModal.open()
}

//Event Listeners:

// profileEditButton.addEventListener("click", openEditProfileModal);

// profileFormElement.addEventListener("submit", handleProfileFormSubmit);
// addCardFormElement.addEventListener("submit", handleAddCardFormSubmit);

// closeButtons.forEach((button) => {
//   const modal = button.closest(".modal");
//   button.addEventListener("click", () => closeModal(modal));
// });

// addNewCardButton.addEventListener("click", () => {
//   openModal(addCardModal);
// });
