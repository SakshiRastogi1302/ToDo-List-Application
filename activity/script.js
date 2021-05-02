//Date and Time
let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
var today = new Date();
var month = today.getMonth();
var date = today.getDate() + ' ' + months[month] + ' ' + today.getFullYear();

let mainContainer = document.querySelector(".main_container");
let addTaskInputContainer = document.querySelector(".fa-plus");
let removeTaskInputContainer = document.querySelector(".fa-trash-alt");
let filterColorArr=document.querySelectorAll(".filter_color");
let currentColor="pink";


for(let i=0;i<filterColorArr.length;i++){
    filterColorArr[i].addEventListener("click",displayTask);
}
addTaskInputContainer.addEventListener("click", function (e) {
    let checkElement = document.querySelector(".task_container");
    if (checkElement == null) {
        let taskInputContainer = document.createElement("div");
        taskInputContainer.setAttribute("class", "task_container");
        taskInputContainer.innerHTML = ` <div class="input_container">
        <span class="date">${date}</span>
        <textarea class="task_content" placeholder="Enter Your Text Here"></textarea>
        <button class="clear">Clear</button>
    </div>
    <div class="color_palette">
        <div class="task_filter pink"></div>
        <div class="task_filter lightblue"></div>
        <div class="task_filter lightgreen"></div>
        <div class="task_filter lightsalmon"></div>
    </div>`;
        mainContainer.appendChild(taskInputContainer);
        removeTaskInput(taskInputContainer);
    }

    let clearInputBtn = document.querySelector(".clear");
    let inputText = document.querySelector(".task_content");
    inputText.value = "";
    clearInputField(clearInputBtn, inputText);
    let taskFilterArr = document.querySelectorAll(".task_filter");
    taskFilterArr[0].classList.add("border");
    for (let i = 0; i < taskFilterArr.length; i++) {
        taskFilterArr[i].addEventListener("click", addBorder);
    }
    inputText.addEventListener("keydown",getInputText);
});


function removeTaskInput(taskInputContainer) {
    removeTaskInputContainer.addEventListener("click", function () {
        mainContainer.removeChild(taskInputContainer);
    });
}

function clearInputField(clearInputBtn, inputText) {
    clearInputBtn.addEventListener("click", function () {
        inputText.value = "";
    });
}

function addBorder(e) {
    let clickFilter = e.currentTarget;
    currentColor=clickFilter.classList[1];
    let taskFilterArr = document.querySelectorAll(".task_filter");
    taskFilterArr.forEach(function (filter) {
        filter.classList.remove("border");
    })

    if (clickFilter.classList[2] == null) {
        clickFilter.classList.add("border");
    }

}

function getInputText(e){
    let inputText=e.currentTarget;
    let taskInputContainer=document.querySelector(".task_container");
    if(e.key=="Enter"){
        let inputData=inputText.value;
        mainContainer.removeChild(taskInputContainer);
        let uid=new ShortUniqueId();
        let id=uid();
        let taskBox=document.createElement("div");
        taskBox.setAttribute("class","task_box");
        taskBox.innerHTML=` <div class="task_border ${currentColor}"> ${date}
        </div>
        <div class="task_description">
            <h3 class="uid">#${id} <i class="fa fa-lock lock" aria-hidden="true"></i></h3>
            <div class="taskText">${inputData}</div>
        </div>`;
        currentColor="pink";
        mainContainer.appendChild(taskBox);
        let uIDArr=document.querySelectorAll(".uid");
        for(let i=0;i<uIDArr.length;i++){
            uIDArr[i].addEventListener("click",function(e){
                uIDArr[i].innerHTML=`#${id}<i class="fa fa-unlock-alt unlock" aria-hidden="true"></i>`;
            });
        }

        let taskTextArr=document.querySelectorAll(".taskText");
        for(let i=0;i<taskTextArr.length;i++){
            taskTextArr[i].addEventListener("click",makeDivContentEditable);
        }
    }
}

function displayTask(e){
    let filterColor=e.currentTarget;
    let color=filterColor.classList[1];
    let taskBoxArr=document.querySelectorAll(".task_box");
    let taskBorderArr=document.querySelectorAll(".task_box .task_border");
    for(let i=0;i<taskBorderArr.length;i++){
        if(color!=taskBorderArr[i].classList[1]){
            taskBoxArr[i].style.display="none";
        }
    }


}

function makeDivContentEditable(e){
    let taskText=e.currentTarget;
    taskText.setAttribute("contenteditable","true");
}