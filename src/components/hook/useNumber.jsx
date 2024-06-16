export default function useNumber() {
  const convertToNumber = (number) => {
    let newNumber = new Intl.NumberFormat().format(number);
    return newNumber;
  };
  return { convertToNumber };
}
