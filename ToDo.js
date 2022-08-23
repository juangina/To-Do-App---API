//Global Variables
var currenttodoListIndex = 0;
var todoTotal = 0;
//Add Event listener for JSON Data Request, Format JSON Data, Display HTML
var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        var todos = JSON.parse(xhttp.responseText);
        var JSONContainer = document.getElementsByClassName('JSONContainers')[0];
        previousUserId = "1";
        nextUserId = "";
        var newContainer = document.createElement('div');
        newContainer.classList.add('todoContainer', 'todoActive');

        var newH = document.createElement('h3');
        newH.textContent = `User ${1}`;
        newContainer.appendChild(newH);

        var newTodoListContainer = document.createElement('div');
        newTodoListContainer.classList.add('todoListContainer');
        newContainer.appendChild(newTodoListContainer);
        
        newContainer.id = `${1}`
        JSONContainer.appendChild(newContainer);

        for (todo of todos) {
            nextUserId = todo.userId
            if(nextUserId != previousUserId) {
                var newContainer = document.createElement('div');
                newContainer.classList.add('todoContainer');

                var newH = document.createElement('h3');
                newH.textContent = `User ${todo.userId}`;
                newContainer.appendChild(newH);
                
                var newTodoListContainer = document.createElement('div');
                newTodoListContainer.classList.add('todoListContainer');
                newContainer.appendChild(newTodoListContainer);

                newContainer.id = `${todo.userId}`
                JSONContainer.appendChild(newContainer);
            }
            var newP = document.createElement('p');
            if(todo.completed === true) {
                newP.textContent = '✔️' + ` ${todo.title}`;
            }
            else {
                newP.textContent = '☐' + ` ${todo.title}`;
            }
            newTodoListContainer.appendChild(newP);
            previousUserId = todo.userId;
        }
        document.getElementsByClassName("totalTodos")[0].textContent = document.getElementsByClassName("todoListContainer").length;
    }
};
//Get document Elements
var navButtons = document.getElementsByClassName("nav-button");
var todoContainers = document.getElementsByClassName('todoContainer');
//Add Event listeners for Navigation Buttons
for(var navButton of navButtons) {
    navButton.addEventListener('click', function(event) {
    var direction = event.target.textContent.toLowerCase().replace(" ","").replace(">","").replace("<","");
    todoTotal = todoContainers.length - 1;
        if(direction === "next") {
            if(currenttodoListIndex < todoTotal) {
                todoContainers[currenttodoListIndex].classList.remove('todoActive');
                todoContainers[currenttodoListIndex+1].classList.add('todoActive');
                document.getElementsByClassName("currentTodo")[0].textContent = todoContainers[currenttodoListIndex+1].id;
            }
            currenttodoListIndex++;
        } 
        else if (direction === "back") {
            if(currenttodoListIndex != 0) {
                todoContainers[currenttodoListIndex].classList.remove('todoActive');
                todoContainers[currenttodoListIndex-1].classList.add('todoActive');
                document.getElementsByClassName("currentTodo")[0].textContent = todoContainers[currenttodoListIndex-1].id;
            }
            currenttodoListIndex--;
        }
        if(currenttodoListIndex === todoTotal) {
            document.querySelector(".nav-next").textContent = "*****";
            document.querySelector(".nav-back").textContent = "< Back";
        }   else if (currenttodoListIndex === 0) {
                document.querySelector(".nav-next").textContent = "Next >"
                document.querySelector(".nav-back").textContent = "*****"
        }   else {
            document.querySelector(".nav-next").textContent = "Next >";
            document.querySelector(".nav-back").textContent = "< Back";
        }            
    })
}
//Get JSON Data Request
xhttp.open("GET", "https://jsonplaceholder.typicode.com/todos", true);
xhttp.send();
//Add Event listeners for Tab Color Buttons
var tabButtons = document.getElementsByClassName('colorTab');
for (var tabButton of tabButtons) {
    tabButton.addEventListener('click', function(event) {
        console.log(event.target);
        if(event.target.textContent === "Corn Flower Blue") {
            console.log('cornflowerblue');
            var navButtons = document.getElementsByClassName('nav-button');
            document.getElementsByClassName('page')[0].style.background = "#6495ed";
            for(navButton of navButtons) {
                navButton.style.background = "#edbc64";                    
            }
        }
        if(event.target.textContent === "Light Green") {
            console.log('lightgreen');
            var navButtons = document.getElementsByClassName('nav-button');
            document.getElementsByClassName('page')[0].style.background = "#90ee90";
            for(navButton of navButtons) {
                navButton.style.background = "#ee90ee";                    
            }
        }
        if(event.target.textContent === "Pale Violet Red") {
            console.log('palevioletred');
            var navButtons = document.getElementsByClassName('nav-button');
            document.getElementsByClassName('page')[0].style.background = "#db7093";
            for(navButton of navButtons) {
                navButton.style.background = "#70dbb8";                    
            }
        }
    })
}

/*
   This one will use everything we learned in the web dev section.
   
   For this one, jQuery is already installed for you.

   Ok! Here is a fake API we can use without any security credentials:
   https://jsonplaceholder.typicode.com/todos
   Open this URL browser bar to see the JSON

   (1) write an AJAX request to the URL above WITHOUT jQuery
   (you can copy the code from here... https://www.w3schools.com/xml/xml_http.asp)
        print out the result to the console

    This is a large array of "Todos". You will notice properties for user ID, title, and completed.
    Using this JSON DATA, we want to create HTML.

   (2)  For each user ID, create a new ".container" div, with an <h2> containing the user ID as textContent 
            - Be careful, we only want ONE container per user ID, there are 10 containers total. (Do this with JavaScript)
            - Set each container's ID to correspond to a user ID, ex id=1, id=2 and so on (use the "id" property)
            - HINT: Don't overthink it, just use a simple for loop counting from 1 to 10 (one for each user)

    (3) Now,You will need to loop over each todo...
            - For each todo, create a <p> element with the "title" property as textContent
                - Not only that, each ToDo should either have a '✔️' or a '☐' depending on whether it is "completed" or not...
                    HINT: if statement + think back to combining strings
                - Finally, append to the appropriate container ID (each container should have 20 todos)
                    HINT: select container by ID, and append ToDos inside the loop

    Your final result should look like the picture inside this folder! (Picture doesn't show full page, but you get the idea)
    Your solution should be 100% JavaScript at this point

    BONUS 1: Can you make it look better with CSS? Maybe find a good looking To-Do list online and copy it?
    BONUS 2: Can you "Re-factor" it to jQUery? (both your AJAX request, and all DOM methods!)
*/