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

// Elements
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;

//Wrappers:
const cardListEl = document.querySelector(".cards__list");
const profileEditModal = document.querySelector("#edit-modal");
const profileFormElement = document.querySelector(".modal__form");
const addCardModal = document.querySelector("#add-card-modal");
//
//Buttons and Nodes:
const profileEditButton = document.querySelector(".profile__edit-button");
const profileCloseButton = profileEditModal.querySelector(".modal__close");
const addCardCloseButton = addCardModal.querySelector(".modal__close");
const profileName = document.querySelector(".profile__name");
const profileJob = document.querySelector(".profile__job");
const profileEditForm = profileEditModal.querySelector("#edit-profile-modal");
const addNewCardButton = document.querySelector(".profile__add-button");

//Form Data:
const nameInput = document.querySelector("[name='name'");
const jobInput = document.querySelector("[name='job']");

//Functions:

function closeModal(modal) {
  modal.classList.remove("modal_opened");
}

function openModal(modal) {
  modal.classList.add("modal_opened");
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closeModal();
}

function getCardElement(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageEl = cardElement.querySelector(".card__image");
  const cardTitleEl = cardElement.querySelector(".card__title");

  cardImageEl.src = cardData.link;
  cardTitleEl.textContent = cardData.name;
  cardImageEl.alt = cardData.name;
  return cardElement;
}

initialCards.forEach((cardData) => {
  const cardElement = getCardElement(cardData);
  cardListEl.prepend(cardElement);
});

//Event Listeners:

profileEditButton.addEventListener("click", () => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  openModal(profileEditModal);
});
profileEditForm.addEventListener("submit", handleProfileFormSubmit);
profileCloseButton.addEventListener("click", () =>
  closeModal(profileEditModal)
);
//add new card button
addNewCardButton.addEventListener("click", () => openModal(addCardModal));
addCardCloseButton.addEventListener("click", () => closeModal(addCardModal));
