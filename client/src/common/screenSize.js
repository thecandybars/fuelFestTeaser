const topBarHeight = 55;
const botBarHeight = 35;

console.log(
  "🚀 ~ file: screenSize.js ~ line 6 ~ window.screen.availHeight",
  window.screen.availHeight
);
export const screenSize =
  window.screen.availHeight - topBarHeight - botBarHeight;
