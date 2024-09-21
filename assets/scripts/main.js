const seats = getElementsByClass("seats");
let isClicked = [];
for (let seat of seats) {
    seat.addEventListener("click", function (event) {
        if (isClicked.includes(event.target.innerText) === true) {
            getSeatsLeft(true); //seats left
            getSelectedSeatCount(true); //selected seat count
            getSeatStyles(event.target, true); //selected seat styles
            let index = isClicked.indexOf(event.target.innerText); //get the index number 
            isClicked.splice(index, 1); //remove from the array
        } else {
            isClicked.push(event.target.innerText); //push to isClicked array
            getSeatsLeft(false); //seats left
            getSelectedSeatCount(false); //selected seat count
            getSeatStyles(event.target, false); //selected seat styles
        };
    });
};

//seats left 
function getSeatsLeft(boolean) {
    const seatsLeft = getElementById("seatsLeft");
    const num = Number(seatsLeft.innerText);
    return boolean === true ? seatsLeft.innerText = num + 1 : seatsLeft.innerText = num - 1;
};

//selected seat count
function getSelectedSeatCount(boolean) {
    const seatCount = getElementById("seatCount");
    const num = Number(seatCount.innerText);
    return boolean === true ? seatCount.innerText = num - 1 : seatCount.innerText = num + 1;
}

//selected seat styles
function getSeatStyles(element, boolean) {
    if (boolean === true) {
        element.classList.add("bg-base_content/5");
        element.classList.add("text-base_content_secondary/50");
        element.classList.add("hover:bg-base_content/10");
        element.classList.remove("bg-primary");
        element.classList.remove("text-primary_content");
        element.classList.remove("hover:bg-primary/80");
    } else {
        element.classList.remove("bg-base_content/5");
        element.classList.remove("text-base_content_secondary/50");
        element.classList.remove("hover:bg-base_content/10");
        element.classList.add("bg-primary");
        element.classList.add("text-primary_content");
        element.classList.add("hover:bg-primary/80");
    }

};