const activeNavlink = (value) => {
  let navlink = document.querySelectorAll(value);
  console.log("navlink", navlink);
  navlink.forEach((item) => {
    item.addEventListener("click", () => {
      item.classList.add("active");
      navlink.forEach((nav) => {
        console.log("nav", nav);
        nav.classList.remove("active");
      });
    });
  });
};
export default function useNavLinkActive() {
  return { activeNavlink };
}
