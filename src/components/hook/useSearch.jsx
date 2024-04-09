export default function useSearch() {
  function dataSearch(data, inputSearch) {
    let newArr = [];
    let valueSearch = inputSearch ? inputSearch.toUpperCase() : "";
    if (valueSearch.length > 0) {
      data.map((item) => {
        let textEmail = item.email;
        let txtEmailUp = textEmail.toUpperCase();
        let txtSearch = txtEmailUp.includes(valueSearch);
        if (txtSearch) {
          newArr = [...newArr, item];
        }
      });
      return newArr;
    } else {
      return data;
    }
  }
  return { dataSearch };
}
