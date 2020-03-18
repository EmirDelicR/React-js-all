const API_REQUEST_TYPES = {
  post: "POST",
  get: "GET",
  patch: "PATCH",
  put: "PUT",
  delete: "DELETE"
};

const API_REQUEST_URLS = {
  orders: "/orders.json",
  ingredients: "/ingredients.json",
  signup: "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=?key=",
  signin:
    "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key="
};

const CONTROLS = [
  { label: "Salad", type: "salad" },
  { label: "Bacon", type: "bacon" },
  { label: "Cheese", type: "cheese" },
  { label: "Meat", type: "meat" }
];

const INGREDIENTS = {
  salad: "salad",
  bacon: "bacon",
  cheese: "cheese",
  meat: "meat"
};

export { API_REQUEST_TYPES, API_REQUEST_URLS, CONTROLS, INGREDIENTS };
