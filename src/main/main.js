//header部分
const themeModeDomList = Array.from(
  document.querySelectorAll(".header-theme-mode"),
);
let hiddenThemeModeDom = document.querySelector(".hidden_header-theme-mode");

/**
 * 主题模式默认是显示的，存在一个不显示的模式；
 * 每次点击一个模式，则对这个模式进行隐藏，另外的模式则自然显示出来了
 */
themeModeDomList.forEach((themeMode) => {
  themeMode.addEventListener("click", (e) => {
    if (hiddenThemeModeDom) {
      hiddenThemeModeDom.classList.remove("hidden_header-theme-mode");
      hiddenThemeModeDom = null;
    }
    themeMode.classList.add("hidden_header-theme-mode");
    hiddenThemeModeDom = themeMode;
    console.log(themeMode);
  });
});

//todo 主题切换功能函数
function changeThemeMode() {

}