export default function useSearch() {
  function dataSearch(data, inputSearch) {
    let newArr = [];
    let valueSearch = inputSearch ? inputSearch.toUpperCase() : "";
    if (valueSearch.length > 0) {
      data.map((item) => {
        let textEmail = item.email;
        let txtEmailUp = textEmail.toUpperCase();
        let txtSearchEmail = txtEmailUp.includes(valueSearch);

        let textDepartment = item.department;
        let txtDepartmentUp = textDepartment.toUpperCase();
        let txtDepartmentSearch = txtDepartmentUp.includes(valueSearch);

        let textPosition = item.position;
        let txtPositionUp = textPosition.toUpperCase();
        let txtPositionSearch = txtPositionUp.includes(valueSearch);

        if (txtSearchEmail || txtPositionSearch || txtDepartmentSearch) {
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
