export const FORM = {
  name: {
    elementType: "input",
    elementConfig: {
      type: "text",
      placeholder: "Your Name"
    },
    value: "",
    validation: {
      required: true
    },
    valid: false,
    touched: false
  },
  street: {
    elementType: "input",
    elementConfig: {
      type: "text",
      placeholder: "Your Street"
    },
    value: "",
    validation: {
      required: true
    },
    valid: false,
    touched: false
  },
  zipCode: {
    elementType: "input",
    elementConfig: {
      type: "text",
      placeholder: "Zip Code"
    },
    value: "",
    validation: {
      required: true,
      minLength: 4,
      maxLength: 4
    },
    valid: false,
    touched: false
  },
  country: {
    elementType: "input",
    elementConfig: {
      type: "text",
      placeholder: "Your Country"
    },
    value: "",
    validation: {
      required: true
    },
    valid: false,
    touched: false
  },
  email: {
    elementType: "input",
    elementConfig: {
      type: "email",
      placeholder: "Your Email"
    },
    value: "",
    validation: {
      required: true
    },
    valid: false,
    touched: false
  },
  deliveryMethod: {
    elementType: "select",
    elementConfig: {
      options: [
        { value: "fastest", displayValue: "Fastest" },
        { value: "cheapest", displayValue: "Cheapest" }
      ]
    },
    value: "fastest",
    validation: {},
    valid: true
  }
};
