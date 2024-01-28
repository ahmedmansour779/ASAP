export function getPaginationNumbers(
  currentPage: number,
  totalPages: number,
  limit = 5
) {
  const pageNumbers = [];
  const numbersLimit = Math.floor((limit - 1) / 2);

  for (
    let number = currentPage - numbersLimit;
    number <= currentPage + numbersLimit;
    number++
  ) {
    if (number > 0 && number <= totalPages) {
      pageNumbers.push(number);
    }
  }

  return pageNumbers;
}
