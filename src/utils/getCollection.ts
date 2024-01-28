export function getCollections(
  collection: any[],
  key: string,
  condition?: any
) {
  const filteredItems = [];
  const remainingItems = [];

  for (const item of collection) {
    if ((condition && item[key] === condition) || (item[key] && !condition)) {
      filteredItems.push(item);
    } else {
      remainingItems.push(item);
    }
  }

  return [filteredItems, remainingItems];
}
