**_Some useful links:_**

[Axios](https://github.com/axios/axios)

## content

- [Axios](#axios)
- [Make Request](#request)

## axios

```console
npm install axios --save
```

```javascript
import axios from "axios";

const BASE_URL = "SOME BASE URL";

const HTTP = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    // Or configure pre function (POST, GET, PUT)
    Authorization: "AUTH TOKEN"
  }
});

// Access Authorization programmatically
// HTTP.defaults.headers.common['Authorization'] = 'AUTH TOKEN';
// Or look file utils/api/api.js line 80
export { HTTP };
```

[TOP](#content)

## request

**_componentDidMount_** is the best place to make HTTP request

```js
import { getApiData } from "../../utils/api/api";

async componentDidMount() {
    const data = await getApiData("/posts");
    console.log(data);
}
```

If you use **_componentDidUpdate_** for axios request be carful about infinite loop

[TOP](#content)
