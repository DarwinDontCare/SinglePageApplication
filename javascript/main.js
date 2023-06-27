let main_screen = document.getElementById("main_screen");
let info_page = document.getElementById("identification_screen");

let user_list = [];

let screen_list = [];

function GetAPIInfo() {
    fetch("https://jsonplaceholder.typicode.com/users")
    .then((response) => response.json())
    .then((json) => {
        AddUserToList(json);
    });
}

function GetAllScreens() {
    let screens = document.querySelectorAll("div");
    screens.forEach(element => {
        if (element.id.includes("_screen")) {
            screen_list.push(element);
        }
    });
}

function AddUserToList(json) {
    for (var i = 0; i < 10; i++) {
        user_list.push(json[i]);
    }
    for (var i = 0; i < user_list.length; i++) {
        CreateItemElement(user_list[i]);
    }
    console.log(user_list);
}

function ShowChatScreen(event) {
    document.getElementById("back_to_main_screen").style.display = "flex";
    screen_list.forEach(element => {
        if (element.id != "chat_screen") {
            element.style.display = "none";
        } else {
            element.style.display = "flex";
            document.getElementById("user_info").getElementsByClassName("username_text")[0].textContent = event.target.getElementsByClassName("username_text")[0].textContent;
        }
        console.log(element);
    });
}

function ShowMainScreen() {
    document.getElementById("back_to_main_screen").style.display = "none";
    screen_list.forEach(element => {
        if (element.id != "main_screen") {
            element.style.display = "none";
        } else {
            element.style.display = "flex";
        }
        console.log(element);
    });
}

function CreateItemElement(user_info) {

    let div = document.createElement("div");
    div.className = "user_element";

    let username_span = document.createElement("span");
    username_span.className = "username_text";
    username_span.textContent = user_info.username;

    let br = document.createElement("br");

    let email_span = document.createElement("span");
    email_span.className = "email_text";
    email_span.textContent = user_info.email;

    div.appendChild(username_span);
    div.appendChild(br);
    div.appendChild(email_span);

    div.addEventListener("click", ShowChatScreen);

    document.getElementById("list_container").appendChild(div);
}

GetAPIInfo();
GetAllScreens();
