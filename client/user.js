

let total = document.getElementById("total")
let easy = document.getElementById("easy")
let medium = document.getElementById("medium")
let hard = document.getElementById("hard")
let userid = document.getElementById("leetcode_username")
let days = document.getElementById("submissions-count")
let imgurl = document.getElementById("imgurl")
let avatarSection = document.getElementById("avatar-section")
let username = document.getElementById("username")

document.addEventListener("DOMContentLoaded", async () => {
    const params = new URLSearchParams(window.location.search);
    // console.log(params);
    // console.log(params.get("easy"));
    let userData = {
        userid: params.get("userid"),
        username: params.get("username"),
        total: params.get("total"),
        easy: params.get("easy"),
        medium: params.get("medium"),
        hard: params.get("hard"),
        days: params.get("days"),
        imgurl: params.get("imgurl")
    }
    console.log(typeof userData.imgurl);
    header.innerHTML = `
    <h1>
    <span class="leet">LeetCoder</span>
    ${userData.username}</h1>
    `
    total.innerText = userData.total
    userid.innerText = userData.userid
    easy.innerText = userData.easy
    medium.innerText = userData.medium
    hard.innerText = userData.hard
    days.innerText = userData.days
    username.innerText = userData.username
    
    // let avatar = document.createElement("img");
    // avatar.classList.add("avatar");
    // avatar.src = imgurl.value;
    // avatarSection.appendChild(avatar);

    let avatar = document.createElement("img");
    avatar.src = userData.imgurl; // Use the value from userData
    avatar.classList.add("avatar");

    if (avatarSection) {
        avatarSection.insertBefore(avatar, avatarSection.firstChild);
    } else {
        console.log("Avatar section not found");
    }



});


document.getElementById("back-btn").addEventListener('click',()=>{
    console.log('clicked');
    window.location.href = `https://leetcoder-umber.vercel.app/`
})
