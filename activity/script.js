//Creating Months Array
let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
//Get Date Of The Current Day
var today = new Date();
var month = today.getMonth();
var date = today.getDate() + ' ' + months[month] + ' ' + today.getFullYear();

let mainContainer = document.querySelector(".main_container");
let addTaskInputContainer = document.querySelector(".fa-plus");
let removeTaskInputContainer = document.querySelector(".fa-trash-alt");
let filterColorArr=document.querySelectorAll(".filter_color");
let currentColor="pink";


//Display only those tasks that have border similar to color clicked.
for(let i=0;i<filterColorArr.length;i++){
    filterColorArr[i].addEventListener("click",displayTask);
}

// ******************************************** GET INPUT TASK CONTAINER ****************************************

// Click on plus button to get task input container to create a task.
addTaskInputContainer.addEventListener("click", function (e) {
    let checkElement = document.querySelector(".task_container");
    // If task container is not created, then create one.
    if (checkElement == null) {
        let taskInputContainer = document.createElement("div");
        taskInputContainer.setAttribute("class", "task_container");
        taskInputContainer.innerHTML = ` <div class="input_container">
        <span class="date">${date}</span>
        <textarea class="task_content" placeholder="Enter Your Text Here"></textarea>
        <button class="clear">Clear
           <span class="text">Clear Data</span>
        </button>
        </div>
        <div class="color_palette">
            <div class="task_filter pink">
            <span class="text">Pink</span>
            </div>
            <div class="task_filter lightblue">
            <span class="text">LightBlue</span>
            </div>
            <div class="task_filter lightgreen">
            <span class="text">LightGreen</span>
            </div>
            <div class="task_filter lightsalmon">
            <span class="text">LightSalmon</span> 
            </div>
        </div>`;
        // Append task container as a child in main container.
        mainContainer.appendChild(taskInputContainer);
        // If clicked on delete button, remove task container.
        removeTaskInput(taskInputContainer);
    }

    // If task container is already created, then it will clear the input of the existing task container.
    let inputText = document.querySelector(".task_content");
    inputText.value = "";

    
    let clearInputBtn = document.querySelector(".clear");
    // If clicked on clear button, clear the input of the task container.
    clearInputField(clearInputBtn, inputText);

    let taskFilterArr = document.querySelectorAll(".task_filter");
    // By default, border is added to first task filter color.
    taskFilterArr[0].classList.add("border");
    for (let i = 0; i < taskFilterArr.length; i++) {
        // Whichever task filter color is clicked, add border to it
        taskFilterArr[i].addEventListener("click", addBorder);
    }
    // If after writing content in input box, if user press enter then store the text for future use.
    inputText.addEventListener("keydown",getInputText);
});


// ************************************** REMOVE INPUT TASK CONTAINER *******************************************

// Remove task input container
function removeTaskInput(taskInputContainer) {
    removeTaskInputContainer.addEventListener("click", function () {
        taskInputContainer.remove();
    });
}

// ************************************ CLEAR THE INPUT FIELD **************************************************** 

// Make the input field of input task container empty
function clearInputField(clearInputBtn, inputText) {
    clearInputBtn.addEventListener("click", function () {
        inputText.value = "";
    });
}

// ************************************ ADD BORDER TO CLICKED TASK FILTER **************************************** 

// This function will add border to the task filter color which is clicked
function addBorder(e) {
    let clickFilter = e.currentTarget;
    currentColor=clickFilter.classList[1];
    let taskFilterArr = document.querySelectorAll(".task_filter");
    // If the border is added to any task filter color then remove it.
    taskFilterArr.forEach(function (filter) {
        filter.classList.remove("border");
    })

    // If the border is not added to the clicked task filter color, then add border class to it.
    if (clickFilter.classList[2] == null) {
        clickFilter.classList.add("border");
    }

}

// ********************************** GET INPUT TEXT DATA ********************************************* 

// This function helps us in getting the text entered by the user in input task container
function getInputText(e){
    let inputText=e.currentTarget;
    let taskInputContainer=document.querySelector(".task_container");
    // If enter is pressed after writing content in input field, then store the text in inputData variable. 
    if(e.key=="Enter"){
        let inputData=inputText.value;
        // Once enter is pressed, remove task input container
        mainContainer.removeChild(taskInputContainer);
        // Get unique id
        let uid=new ShortUniqueId();
        let id=uid();
        // Now create a task box 
        let taskBox=document.createElement("div");
        taskBox.setAttribute("class","task_box");
        taskBox.innerHTML=` <div class="task_border ${currentColor}"> ${date}
        </div>
        <div class="task_description">
            <h3 class="uid">#${id}<i class="fa fa-lock lock" aria-hidden="true"></i> <i class="fas fa-check-circle check"></i> <i class="fas fa-trash-alt dustbin"></i></h3>
            <div class="taskText">${inputData}</div>
        </div>`;
        currentColor="pink";
        // Append the task box to main container
        mainContainer.appendChild(taskBox);

        // Change the border of task box by clicking on border
        let taskBorderArr=document.querySelectorAll(".task_border");
        for(let i=0;i<taskBorderArr.length;i++){
            taskBorderArr[i].addEventListener("click",priorityColor);
        }

        let taskBoxArr=document.querySelectorAll(".task_box");
        // If you click on delete in task box, it will delete the task box
        let dustbinClicked=document.querySelectorAll(".task_box .uid .dustbin");
        for(let i=0;i<dustbinClicked.length;i++){
            dustbinClicked[i].addEventListener("click",function(){
                taskBoxArr[i].remove();
        });
    }
}
}

// *********************************** DISPLAY SPECIFIC TASKS BASED ON COLOR *********************************  

// This function displays only those task boxes whose border is similar to the color being clicked.
function displayTask(e){
    let filterColor=e.currentTarget;
    let color=filterColor.classList[1];
    let taskBoxArr=document.querySelectorAll(".task_box");
    let taskBorderArr=document.querySelectorAll(".task_box .task_border");
    // Display only those task boxes that have border color same as the color that is being clicked.
    for(let i=0;i<taskBorderArr.length;i++){
        if(color!=taskBorderArr[i].classList[1]){
            taskBoxArr[i].style.display="none";
        }
    }

}

// ************************************* MAKE CONTENT EDITABLE **********************************************

// This function makes the task box content editable
function makeDivContentEditable(e){
    let taskText=e.currentTarget;
    taskText.setAttribute("contenteditable","true");
}

// ****************************** CHANGE THE COLOR OF TASK BOX ON THE BASIS OF PRIORITY **************************

// This function will change the border of task box upon clicking on border.
function priorityColor(e){
    let taskBorderClicked=e.currentTarget;
    // Create an array of colors available
    let colors=["pink","lightblue","lightgreen","lightsalmon"];
    let color=taskBorderClicked.classList[1];

    let idx=0;
    // Get the index of the color that is present on the task box right now.
    for(let i=0;i<colors.length;i++){
        if(color==colors[i]){
            idx=i;
            break;
        }
    }

    
    if(idx+1<colors.length){
        // If idx+1 is smaller, then replace current color with the next color in array
        taskBorderClicked.setAttribute("class",`task_border ${colors[idx+1]}`);
    }
    else{
        // If idx+1 is larger, then replace current color with the color on 0th index in the array
        taskBorderClicked.setAttribute("class",`task_border ${colors[0]}`);
    }
    
}
