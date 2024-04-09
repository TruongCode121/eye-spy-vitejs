export default function useSliceString() {
  function newSlice(string) {
    if (string.length > 0) {
      return string.slice(0, 5) + "..." + string.slice(30, string.length);
    }
  }
  return { newSlice };
}
