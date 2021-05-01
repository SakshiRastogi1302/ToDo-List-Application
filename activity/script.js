//Date and Time
var today = new Date();
var date = today.getDate()+'.'+(today.getMonth()+1)+'.'+today.getFullYear();
var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

let mainContainer=document.querySelector(".main_container");
let addTaskInputContainer=document.querySelector(".fa-plus");
let removeTaskInputContainer=document.querySelector(".fa-trash-alt");

addTaskInputContainer.addEventListener("click",function(e){
    let checkElement=document.querySelector(".task_container");
    if(checkElement==null){
        let taskInputContainer=document.createElement("div");
        taskInputContainer.setAttribute("class","task_container");
        taskInputContainer.innerHTML=` <div class="input_container">
        <span class="date">Date : ${date}</span>
        <span class="time">Time : ${time}</span>
        <input type="text" class="task_content" placeholder="Enter Your Text Here">
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

    let clearInputBtn=document.querySelector(".clear");
    let inputText=document.querySelector(".task_content");
    inputText.value="";
    clearInputField(clearInputBtn,inputText);


    
});

function removeTaskInput(taskInputContainer){
    removeTaskInputContainer.addEventListener("click",function(){
        mainContainer.removeChild(taskInputContainer);
    });
}

function clearInputField(clearInputBtn,inputText){
    clearInputBtn.addEventListener("click",function(){
        inputText.value="";
    });
}

