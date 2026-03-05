// 数据变量放到最上面
// dom变量分布在区域

// 全局数据部分
const taskList = [];
let showedTaskList = [];

let selectedClassify = "";
let searchContent = "";

/**
 * 数据关系梳理
 * taskList是总的任务列表
 * showedTaskList是需要呈现的任务列表
 * selectedClassify和searchContent是用来筛选的数据项
 * selectedClassify + searchContent on taskList ==>> showedTaskList
 */

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

//主题切换功能函数
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

const showboardTotalNumDom = document.querySelector(".showboard-total");
// 统计卡片的数据
showboardTotalNumDom.textContent = String(showedTaskList.length);

//搜索区域
const controlSearchDom = document.querySelector(".control-search");
const controlSearchInputDom = document.querySelector(".control-search_input");

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

controlCreateCardManipulateAddDom.addEventListener("click", (e) => {
  addNewTask();
  showedTaskList = taskList;
  renderTaskList();
});

function addNewTask() {
  const newTask = {};
  newTask.id = Date.now();
  newTask.content = newTaskContent;
  newTask.createTime = new Date().toTimeString();
  newTask.status = false;
  taskList.push(newTask);
}

const taskContainerDom = document.querySelector(".tasks");
const tasksVoidDom = document.querySelector(".tasks-void");
//任务列表的渲染
function renderTaskList() {
  if (showedTaskList.length === 0) {
    tasksVoidDom.style.display = "block";
  } else {
    tasksVoidDom.style.display = "none";

    const fragment = document.createDocumentFragment();
    showedTaskList.forEach((task) => {
      const taskDiv = document.createElement("div");
      taskDiv.className = `task ${task.status ? "done_task" : "doing_task"}`;
      taskDiv.innerHTML = `
          <div class="task-status >
            <svg
              t="1772723834387"
              class="icon"
              viewBox="0 0 1329 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="19374"
              width="32"
              height="32"
            >
              <path
                d="M1164.147376 0.374572l164.581473 164.581473-858.140125 858.140125L0.37585 552.880739l164.581473-164.581473 305.633958 305.632679z"
                fill="#1CBB48"
                p-id="19375"
              ></path>
            </svg>
          </div>
          <div class="task-info">
            <div class="task-info-content">${task.content}</div>
            <div class="task-info-time">${task.time}</div>
          </div>
          <div class="task-control">
            <div class="task-control-edit">
              <svg
                t="1772722186087"
                class="icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="10627"
                width="24"
                height="24"
              >
                <path
                  d="M192.008043 1024A192.265427 192.265427 0 0 1 0 831.991957V255.967827A192.136735 192.136735 0 0 1 192.008043 63.959784h192.008043a64.02413 64.02413 0 0 1 0 128.048259H192.008043a64.345859 64.345859 0 0 0-64.024129 63.959784v576.02413a63.959784 63.959784 0 0 0 64.024129 63.895438h575.959784a63.895438 63.895438 0 0 0 64.02413-63.895438V639.983914a64.02413 64.02413 0 0 1 128.048259 0v192.008043a192.329773 192.329773 0 0 1-192.008043 192.008043z m127.983914-256.032173a64.345859 64.345859 0 0 1-64.02413-64.345859V511.935654a64.345859 64.345859 0 0 1 18.788991-45.042101L722.732688 18.982028a63.831092 63.831092 0 0 1 90.534624 0l192.008043 191.943698a63.959784 63.959784 0 0 1 0 90.534623l-447.97587 447.911525a63.573709 63.573709 0 0 1-45.042102 18.788991z m64.345859-229.586025v101.602112H485.811235l384.016087-384.016087-101.537766-101.47342z"
                  fill="currentColor"
                  p-id="10628"
                ></path>
              </svg>
            </div>
            <div class="task-control-delete">
              <svg
                t="1772722384824"
                class="icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="12542"
                width="24"
                height="24"
              >
                <path
                  d="M519.620465 0c-103.924093 0-188.511256 82.467721-192.083349 185.820279H85.015814A48.91386 48.91386 0 0 0 36.101953 234.686512a48.91386 48.91386 0 0 0 48.913861 48.866232h54.010046V831.345116c0 102.852465 69.822512 186.844279 155.909954 186.844279h439.200744c86.087442 0 155.909953-83.491721 155.909954-186.844279V284.100465h48.91386a48.91386 48.91386 0 0 0 48.913861-48.890046 48.91386 48.91386 0 0 0-48.913861-48.866233h-227.756651A191.559442 191.559442 0 0 0 519.620465 0z m-107.234232 177.080558c3.548279-49.771163 46.627721-88.540279 99.851907-88.540279 53.224186 0 96.327442 38.745302 99.351813 88.540279h-199.20372z m-111.997024 752.044651c-30.981953 0-65.083535-39.15014-65.083535-95.041488V287.744h575.488v546.839814c0 55.915163-34.077767 95.041488-65.059721 95.041488H300.389209v-0.500093z"
                  fill="currentColor"
                  p-id="12543"
                ></path>
                <path
                  d="M368.116093 796.814884c24.361674 0 44.27014-21.670698 44.27014-48.818605v-278.623256c0-27.147907-19.908465-48.818605-44.27014-48.818604-24.33786 0-44.27014 21.670698-44.27014 48.818604v278.623256c0 27.147907 19.360744 48.818605 44.293954 48.818605z m154.933581 0c24.361674 0 44.293953-21.670698 44.293954-48.818605v-278.623256c0-27.147907-19.932279-48.818605-44.293954-48.818604-24.33786 0-44.27014 21.670698-44.270139 48.818604v278.623256c0 27.147907 19.932279 48.818605 44.293953 48.818605z m132.810419 0c24.33786 0 44.27014-21.670698 44.27014-48.818605v-278.623256c0-27.147907-19.932279-48.818605-44.27014-48.818604s-44.27014 21.670698-44.27014 48.818604v278.623256c0 27.147907 19.360744 48.818605 44.27014 48.818605z"
                  fill="currentColor"
                  p-id="12544"
                ></path>
              </svg>
            </div>
          </div>
      `;
      fragment.appendChild(taskDiv);
    });
    taskContainerDom.replaceChildren(fragment);
  }
}

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
