let tasks = [];

const addTask = ()=> {
    const taskInput = document.getElementById('taskInput');
    const text = taskInput.value.trim();

    if(text){
        tasks.push({text:text , completed:false});
        taskInput.value = "";
        updateTasksList();
        updateStats();
    }
}; 

const toggleTaskComplete = (index) =>{
    tasks[index].completed = !tasks[index].completed;
    updateTasksList();
    updateStats();
}

const deleteTask = (index) => {
    tasks.splice(index , 1);
    updateTasksList();
    updateStats();
}

const editTask = (index) => {
    const taskInput = document.getElementById('taskInput');
    taskInput.value = tasks[index].text;

    tasks.splice(index , 1);
    updateTasksList();
    updateStats();
}

const updateStats = () =>{
    const completedTasks = tasks.filter((task) => task.completed).length;
    const totalTask = tasks.length;
    const progress = totalTask === 0 ? 0 : (completedTasks / totalTask) * 100;
    const progressBar = document.getElementById("progress");

    progressBar.style.width = `${progress}%`;

    document.getElementById("numbers").innerText = `${completedTasks} / ${totalTask}`;
}

const updateTasksList = ()=> {
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = '';

    tasks.forEach((task , index) => {
        const listItem = document.createElement('li');

        listItem.innerHTML = `
        <div class="taskItem">
            <div class="task ${task.completed ? 'completed' : ''}">
                <input type="checkbox" class="checkbox" ${task.completed ? 'checked' : ''}/>
                <p>${task.text}</p>
            </div>
            <div class="icons">
                <img src="./img/edit.png" onClick="editTask(${index})" alt="Edit"/>
                <img src="./img/bin.png" onClick="deleteTask(${index})" alt="Delete"/>
            </div>
        </div>
        `;
        
listItem.addEventListener('change', ()=> toggleTaskComplete(index))
        taskList.append(listItem);
    });
};



document.getElementById("newTask").addEventListener("click" , function(e){
    e.preventDefault();

    addTask();
});