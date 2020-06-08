**_Some useful links:_**

## content

- [Redux-saga](#redux-saga)
- [Generators](#generators)

## Redux Saga

[TOP](#content)

## Generators

```js
function* gen(num) {
  yield num;
  yield num + 10;
  return 25;
}

const g = gen(5);
console.log(g.next());
// { "value": 5, "done": false }
console.log(g.next());
// { "value": 15, "done": false }
console.log(g.next());
// { "value": 25, "done": true }
```

[TOP](#content)
