**_Some useful links:_**

## content

- [Performance](#performance)

## Performance

```js
// lazy loading and crating chunks
import { lazy, Suspense } from 'react';

const HomePage = lazy(() => import('../Home/HomePage'));

<Suspense fallback={<div>...Loading</div>}>
  <Route exact path="/" component={HomePage} />
</Suspense>;
```

```js
useCallback(); //  to memoize functions
useMemo(); // to memoize value of the function
memo(); // wrap component to memoize
```

[TOP](#content)

## Testing

[Jest cheat sheet](https://github.com/sapegin/jest-cheat-sheet)
