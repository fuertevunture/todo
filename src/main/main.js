// 全局数据部分
const taskList = [];
let showedTaskList = [];

const selectedClassify = "";

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
    changeThemeMode(themeMode.dataset.mode);
    console.log(themeMode);
  });
});

//todo 主题切换功能函数
const rootDom = document.querySelector(":root");
function changeThemeMode(theme) {
  rootDom.className = "";
  rootDom.classList.add(`theme-${theme}`);
}

//main区域
//user部分
const userAvatarImgDom = document.querySelector(".user-avatar_img");
const userAvatarInputDom = document.querySelector(".user-avatar_input");

userAvatarInputDom.addEventListener("change", (e) => {
  const userAvatarFiles = e.target.files;

  // 检查是否选择了文件
  if (userAvatarFiles && userAvatarFiles.length > 0) {
    const file = userAvatarFiles[0];

    // 检查文件类型是否为图片
    if (file.type.startsWith("image/")) {
      const reader = new FileReader();

      // 读取文件完成后，更新头像图片
      reader.onload = (event) => {
        userAvatarImgDom.src = event.target.result;
        userAvatarImgDom.style.width = "100%";
        userAvatarImgDom.style.height = "100%";
        userAvatarImgDom.style.objectFit = "cover";
      };

      // 读取文件内容
      reader.readAsDataURL(file);
    } else {
      console.warn("请选择图片文件");
    }
  }
});

//classify部分
const classifyTypeDomList = Array.from(
  document.querySelectorAll(".classify-type"),
);
let selectedClassifyTypeDom = document.querySelector(".selected_classify-type");

classifyTypeDomList.forEach((classifyType) => {
  classifyType.addEventListener("click", (e) => {
    if (selectedClassifyTypeDom) {
      selectedClassifyTypeDom.classList.remove("selected_classify-type");
    }
    classifyType.classList.add("selected_classify-type");
    selectedClassifyTypeDom = classifyType;
  });
});

//todo 列表过滤函数
function filterTaskList() {}

const showboardTotalNum = document.querySelector(".showboard-total");
// 统计卡片的数据
showboardTotalNum.textContent = String(showedTaskList.length);

//搜索区域
const controlSearchDom = document.querySelector(".control-search");
const controlSearchInputDom = document.querySelector(".control-search_input");
let searchContent = "";

controlSearchInputDom.addEventListener("focus", (e) => {
  controlSearchDom.classList.add("active_control-search");
});
controlSearchInputDom.addEventListener("blur", (e) => {
  controlSearchDom.classList.remove("active_control-search");
});

controlSearchInputDom.addEventListener("input", (e) => {
  searchContent = e.target.value;
  console.log(searchContent);
});

const controlCreateNewDom = document.querySelector(".control-create-new");
const controlCreateCardDom = document.querySelector(".control-create-card");

controlCreateNewDom.addEventListener("click", (e) => {
  controlCreateCardDom.classList.toggle("active_control-create-card");
});

//新任务区域
const controlCreateCardContentDom = document.querySelector(
  ".control-create-card-content",
);
const controlCreateCardContentInputDom = document.querySelector(
  ".control-create-card-content_input",
);

let newTaskContent = "";

controlCreateCardContentInputDom.addEventListener("focus", (e) => {
  controlCreateCardContentDom.classList.toggle(
    "active_control-create-card-content",
  );
});

controlCreateCardContentInputDom.addEventListener("blur", (e) => {
  controlCreateCardContentDom.classList.toggle(
    "active_control-create-card-content",
  );
});

controlCreateCardContentInputDom.addEventListener("input", (e) => {
  newTaskContent = e.target.value;
});

const controlCreateCardManipulateCancelDom = document.querySelector(
  ".control-create-card-manipulate-cancel",
);
const controlCreateCardManipulateAddDom = document.querySelector(
  ".control-create-card-manipulate-add",
);

controlCreateCardManipulateCancelDom.addEventListener("click", (e) => {
  controlCreateCardDom.classList.remove("active_control-create-card");
  newTaskContent = "";
});

controlCreateCardManipulateAddDom.addEventListener("click", (e) => {});

function addNewTask() {
  const newTask = {};
  newTask.content = newTaskContent;
  newTask.createTime = new Date().toTimeString();
  newTask.status = false;
  taskList.push(newTask);
}

const taskContainerDom = document.querySelector(".tasks");
//任务列表的渲染
function renderTaskList() {}

function computeShowTaskList() {
  showedTaskList = taskList.filter((task) => {
    let rightType = true;
    if (selectedClassify === "doing") {
      rightType = false !== task.status;
    } else if (selectedClassify === "done") {
      rightType = true !== task.status;
    }
    return rightType && task.content.startsWith(searchContent);
  });
}
