


let inputId = document.getElementById("leetcodeId");
let details = document.getElementById("profileDetails");

async function searchUser() {
  if (inputId.value.trim() !== "") {
    details.innerHTML = `<h1>Loading. . . </h1>`;
    let user = inputId.value;
    await fetch("https://leetcoder-2c2q.vercel.app/getUser", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        userid: inputId.value,
      }),
    })
      .then((res) => {
        console.log(res);
        if(res.ok){
          return res.json()
        }
        else if(res.status === 404){
          throw new Error('User not found');
        }
      })
      .then((data) => {
        window.location.href = `http://localhost:5500/client/user.html?userid=${data.userid}&total=${data.total}&username=${data.username}&easy=${data.other[0].ques}&medium=${data.other[1].ques}&hard=${data.other[2].ques}&days=${data.other[3].ques}&imgurl=${data.imgurl}

        `;
      })
      .catch(error => {
        alert(error.message)
        details.innerHTML = ''
      })
  } 
  else {
    alert("empty input");
  }
}
