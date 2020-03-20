const BASE_URL = 'https://jsonplaceholder.typicode.com/';

const makeApiCall = async (url, method = 'GET', data = null) => {
  try {
    const response = await fetch(`${BASE_URL}${url}`);
    const jsonData = await response.json();
    return jsonData;
  } catch (err) {
    console.log(`Error fetching data from server: ${err}`);
  }
};

export { makeApiCall };
