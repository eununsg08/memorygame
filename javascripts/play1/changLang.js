const btn = document.body.querySelector('#changingLanguage');

//얘 아이디를 바꿔서 아이디에 따른 언어 변경
btn.addEventListener("click", () => {
    if(btn.className == "i0"){
        btn.classList.remove("i0");
        btn.classList.add("i1");
    } else{
        btn.classList.remove("i1");
        btn.classList.add("i0");
    }
})