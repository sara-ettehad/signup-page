const userInput = document.querySelector(".user-input");
const passInput = document.querySelector(".pass-input");
const confirmPassInput = document.querySelector(".confirm-pass-input");
const signInBtn = document.querySelector(".signin-button");
const userMessage = document.querySelector(".username-msg");
const passMessage = document.querySelector(".password-msg");
const confirmPassMessage = document.querySelector(".confirm-password-msg");
const signInStatus = document.querySelector(".signin-status");

signInBtn.addEventListener("click", signIn);

function signIn(event) {
    event.preventDefault();
    userMessage.innerText = "";
    passMessage.innerText = "";
    confirmPassMessage.innerText = "";
    const userValue = userInput.value;
    const passValue = passInput.value;
    const confirmPassValue = confirmPassInput.value;
    let isSendData = true;
    if (
        userValue.length === 0 ||
        userValue.indexOf("@") === -1 ||
        userValue.indexOf(".") === -1
    ) {
        userMessage.innerText = "please enter a valid email";
        isSendData = false;
    }
    if (passValue.length === 0) {
        passMessage.innerText = "Please enter your password";
        isSendData = false;
    } else if (passValue.length <= 4) {
        passMessage.innerText = "Your password is too short";
        isSendData = false;
    }
    if (confirmPassValue.length === 0) {
        confirmPassMessage.innerText = "Please enter your confirm password";
        isSendData = false;
    } else if (confirmPassValue != passValue) {
        confirmPassMessage.innerText = "Password mismatch";
        isSendData = false;
    }

    if (isSendData) {
        const body = JSON.stringify({
            username: userValue,
            password: passValue,
        });
        const headers = {
            "Content-type": "application/json",
        };
        fetch("https://jsonplaceholder.typicode.com/posts", {
            method: "POST",
            body: body,
            headers: headers,
        }).then((response) => {
            if (response.ok) {
                signInStatus.innerText = "Successfully sign in😊";
            }
        });
    }
    signInStatus.innerText = "";
    userInput.value = "";
    passInput.value = "";
    confirmPassInput.value = "";
}