**_Some useful links:_**

[Official Hooks Docs](https://reactjs.org/docs/hooks-intro.html)

## content

- [React Hooks](#hooks)

## hooks

#### Hook rules

- Can use hook only in functional components or in custom hooks
- Only use hooks on root level of component (no hooks nested in function, or in if, while ... statement)

#### function using hooks

```js
/* By convention start with uppercase */
const IngredientForm = React.memo(props => {
  /* React.memo is used to not render component if is not necessary */
  const submitHandler = event => {
    event.preventDefault();
    // ...
  };

  return <div></div>;
});

export default IngredientForm;
```

#### useState

```js
import React, { useState } from "react";

const SomeComponent = React.memo(props => {
  const [title, setTitle] = useState("");

  return (
    <input
      type="text"
      id="title"
      name="title"
      value={title}
      onChange={e => setTitle(e.target.value)}
    />
  );
});

export default SomeComponent;
```

#### Passing function as prop

```js
/* create a function in one component parent */
const addIngredientHandler = ingredient => {
  setIngredients(previousIngredients => [
    ...previousIngredients,
    { id: Math.random().toString(), ...ingredient }
  ]);
};
/* Pass as reference */
return <IngredientForm onAddIngredient={addIngredientHandler} />;

/* In childe component access */
const submitHandler = event => {
  event.preventDefault();
  props.onAddIngredient();
};
```

#### useEffect

This hook change life-cycle in react class. It is executed after every render cycle.
This hook acts like componentDidUpdate, it runs after every component update(re-render)

```js
const mockApiCall = (success, timeout) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (success) {
        const MOCK_DATA = [
          { id: Math.random().toString(), title: "Test_1", amount: 5 },
          { id: Math.random().toString(), title: "Test_2", amount: 3 }
        ];
        resolve({ isResolved: true, data: MOCK_DATA });
      } else {
        reject({ error: "Error occurred" });
      }
    }, timeout || 2000);
  });
};

const fetchDataFromServer = async () => {
  try {
    const { isResolved, data } = await mockApiCall(true);
    if (!isResolved) {
      return;
    }
    setIngredients(data);
  } catch (error) {
    console.log(error);
  }
};
/*
 * You can not use async function in useEffect
 * so make other function to be called inside
 */
useEffect(() => {
  fetchDataFromServer();
}, []);
```

#### useRef

```js
import { useRef } from "react";
const searchRef = useRef();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchBy === searchRef.current.value) {
        console.log(searchBy, searchRef.current.value);
        fetchAndFilterDataFromServer();
      }
    }, 500);
    /* way to clean up in useEffect like beforeDestroy */
    return () => {
      clearTimeout(timer);
    };
  }, [searchBy, searchRef]);

return(
 <input ref={searchRef} />;
)
```

#### useReducer

Use this when you need to update state that is depending on previous state or on the other state

```js
/* Create global reducer */
const ingredientReducer = (currentIngredients, action) => {
  switch (action.type) {
    case "SET":
      return action.ingredients;
    case "ADD":
      return [...action.ingredients, action.ingredient];
    case "DELETE":
      return currentIngredients.filter(ing => ing.id !== action.id);
    default:
      throw new Error("This should not be reached");
  }
};

/* In component */
const [ingredients, dispatch] = useReducer(ingredientReducer, []);

const removeIngredientsHandler = id => {
  dispatch({ type: "DELETE", id: id });
};

const filterIngredientsHandler = filteredIngredients => {
  dispatch({ type: "SET", ingredients: filteredIngredients });
};

const addIngredientHandler = ingredient => {
  dispatch({
    type: "ADD",
    ingredient: { id: Math.random().toString(), ...ingredient }
  });
};
```

#### use Context in react

```js
import React, { useState } from "react";

export const AuthContext = React.createContext({
  isAuth: false,
  login: () => {}
});

const AuthContextProvider = props => {
  const [isAuthenticate, setIsAuthenticated] = useState(false);

  const loginHandler = () => {
    setIsAuthenticated(true);
  };
  return (
    <AuthContext.Provider
      value={{ login: loginHandler, isAuth: isAuthenticate }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
```

In index.js

```js
import AuthContextProvider from "./context/auth-context";

ReactDOM.render(
  <AuthContextProvider>
    <App />
  </AuthContextProvider>,
  document.getElementById("root")
);
```

In App.js

```js
import React, { useContext } from "react";

import Ingredients from "./components/Ingredients/Ingredients";
import Auth from "./components/Auth/Auth";
import { AuthContext } from "./context/auth-context";

const App = props => {
  const authContext = useContext(AuthContext);

  let content = <Auth />;
  if (authContext.isAuth) {
    content = <Ingredients />;
  }
  return content;
};
```

In any component

```js
import React, { useContext } from "react";
const authContext = useContext(AuthContext);
<button onClick={authContext.login}>Log In</button>;
```

#### custom hooks

all custom hooks must start with **_use_**

```js
/* Look in hooks/http.js*/
import { useReducer, useCallback } from "react";
import { mockApiCall } from "../utils/helpers";

const httpReducer = (currentHttpState, action) => {
  switch (action.type) {
    case "SEND":
      return { loading: true, error: null, allData: null };
    case "RESPONSE":
      return { ...currentHttpState, loading: false, allData: action.data };
    case "ERROR":
      return { loading: false, error: action.message };
    case "CLEAR":
      return { ...currentHttpState, error: null };
    default:
      throw new Error("This should not be reached");
  }
};

const useHttp = () => {
  const [httpState, dispatchHttp] = useReducer(httpReducer, {
    loading: false,
    error: null,
    allData: null
  });

  /** Use callback (use just for functions) is just to prevent unnecessary rendering  */
  const sendRequest = useCallback(async () => {
    try {
      dispatchHttp({ type: "SEND" });
      const { isResolved, data } = await mockApiCall(true);
      dispatchHttp({ type: "RESPONSE", data: data });
      if (!isResolved) {
        return;
      }
    } catch (error) {
      dispatchHttp({ type: "ERROR", message: error.message });
      console.log(error.message);
    }
  }, []);

  return {
    isLoading: httpState.loading,
    allData: httpState.allData,
    error: httpState.error,
    sendRequest: sendRequest
  };
};

export default useHttp;
```

In component

```js
import useHttp from "../../hooks/http";

const { isLoading, error, allData, sendRequest } = useHttp();

const fetchDataFromServer = useCallback(async () => {
  await sendRequest();
}, [sendRequest]);

useEffect(() => {
  fetchDataFromServer();
}, []);

useEffect(() => {
  if (allData) {
    dispatch({ type: "SET", ingredients: allData });
  }
}, [allData]);
```

[TOP](#content)
