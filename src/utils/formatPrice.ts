export function formatPrice(price: number) {
  return price ? Intl.NumberFormat("en-us").format(price) : null;
}
