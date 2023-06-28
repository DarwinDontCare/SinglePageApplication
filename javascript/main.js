let main_screen = document.getElementById("main_screen");
let info_page = document.getElementById("identification_screen");
let send_message_button = document.getElementById("send_message");
let input_message = document.getElementById("input_message");

let user_list = [];
let screen_list = [];
let messages = [];

let current_email_messaging = "";

input_message.addEventListener("keypress", SendMessage);
send_message_button.addEventListener("click", SendMessage);

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
        CreateItemElement(json[i]);
        messages.push({
            "email": json[i].email,
            "messages": []
        });
    }
    console.log(user_list);
}

function ShowChatScreen(event) {
    document.getElementById("back_to_main_screen").style.display = "flex";
    screen_list.forEach(element => {
        if (element.id != "chat_screen") {
            element.style.display = "none";
        } else {
            document.getElementById("message_container").textContent = "";
            current_email_messaging = event.target.getElementsByClassName("email_text")[0].textContent;
            chat_message_array = messages.find(item => item.email == current_email_messaging).messages;
            LoadMessages(chat_message_array);
            element.style.display = "flex";
            document.getElementById("user_info").getElementsByClassName("username_text")[0].textContent = event.target.getElementsByClassName("username_text")[0].textContent;
        }
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
    });
}

function SendMessage(event) {
    if (event.target == send_message_button) {
        AddMessageToArray(input_message.value, "user");
        input_message.value = "";
    } else if (event.key == "Enter") {
        var isEmpty = true;
        input_message.value.split(" ").forEach(element => {
            if (element != "") isEmpty = false;
        });
        if (!isEmpty) {
            AddMessageToArray(input_message.value, "user");
            input_message.value = "";
        }
    }
}

function AddMessageToArray(text, user) {
    var date = new Date().toLocaleString({ hour12: false });

    var message = {
        "id" : user,
        "message" : text,
        "date" : date
    }
    chat_message_array = messages.find(item => item.email == current_email_messaging);
    chat_message_array.messages.push(message);
    CreateMessageElement(user, text);
}

function LoadMessages(messages) {
    for (var i = 0; i < messages.length; i++) {
        CreateMessageElement(messages[i].id, messages[i].message);
    }
}

function CreateMessageElement(user, text) {
    if (user == "user") {
        let div_parent = document.createElement("div");
        div_parent.className = "message_div";

        let div = document.createElement("div");
        div.className = "sender_message";

        let span = document.createElement("span");
        span.textContent = text;
        
        div_parent.appendChild(div);
        div.appendChild(span);

        document.getElementById("message_container").appendChild(div_parent);
    } else {
        let div_parent = document.createElement("div");
        div_parent.className = "message_div";

        let div = document.createElement("div");
        div.className = "receiver_message";

        let span = document.createElement("span");
        span.textContent = text;
        
        div_parent.appendChild(div);
        div.appendChild(span);

        document.getElementById("message_container").appendChild(div_parent);
    }
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
