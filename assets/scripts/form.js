const nameInputField = getElementById("nameInputField");
const phnInputField = getElementById("phnInputField");
const nextBtn = getElementById("nextBtn");

phnInputField.addEventListener("input", getNextBtn)
nameInputField.addEventListener("input", getNextBtn)

function getNextBtn() {
    if(phnInputField.value.length === 11 && nameInputField.value !== "") {
        nextBtn.classList.remove("bg-base_content/10");
        nextBtn.classList.add("bg-primary");
        nextBtn.removeAttribute("disabled");
    } else {
        nextBtn.classList.remove("bg-primary");
        nextBtn.classList.add("bg-base_content/10");
        nextBtn.setAttribute("disabled", true);
    };
};

nextBtn.addEventListener("click", function(event) {
    event.preventDefault();
});