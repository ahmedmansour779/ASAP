export function debounce(callback: (...value: any[]) => void, wait = 500) {
  let timeoutId: ReturnType<typeof setTimeout>;

  return function (this: any, ...args: any[]) {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => callback.apply(this, args), wait);
  };
}

export function updateSearchParams(
  updatedSearchParams: string[],
  key: string,
  otherParams = {}
) {
  const searchParams = new URLSearchParams(otherParams);

  updatedSearchParams.forEach((item) => searchParams.append(key, item));

  return searchParams;
}
