const seats = getElementsByClass("seats");
let isClicked = [];
for (let seat of seats) {
    seat.addEventListener("click", function (event) {
        if (isClicked.includes(event.target.innerText) === true) {
            getSeatsLeft(true); //seats left
            getSelectedSeatCount(true); //selected seat count
            getSeatStyles(event.target, true); //selected seat styles
            seatList(event.target.innerText, true); //show selected seat list
            getTotalPrice(true); //total price

            let index = isClicked.indexOf(event.target.innerText); //get the index number 
            isClicked.splice(index, 1); //remove from the array
        } else {
            if (getElementById("seatCount").innerText === "4") {
                alert("Oops! You can only book up to 4 seats at once");
                return;
            }; //a person can book 4 seats at a time
            isClicked.push(event.target.innerText); //push to isClicked array

            getSeatsLeft(false); //seats left
            getSelectedSeatCount(false); //selected seat count
            getSeatStyles(event.target, false); //selected seat styles
            seatList(event.target.innerText, false); //show selected seat list
            getTotalPrice(false) //total price
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

//show selected seat list 
function seatList(seatName, boolean) {
    const seatsContainer = getElementById("selectedSeatList");
    if (boolean !== true) {
        seatsContainer.innerHTML += `
            <div id="${seatName}" class="flex items-center justify-between mt-4">
                <span class="text-base text-base_content_secondary/50 font-medium">${seatName}</span>
                <span class="text-base text-base_content_secondary/50 font-medium">Economy</span>
                <span class="text-base text-base_content_secondary/50 font-medium">550</span>
             </div>
        `;
    } else {
        const element = getElementById(seatName);
        element.remove();
    };

    const msg = getElementById("noSeatSelectedMsg");
    const length = seatsContainer.children.length;
    getDiscount(length); //get discount
    if (length <= 0) {
        msg.classList.remove("hidden");
    } else {
        msg.classList.add("hidden");
    }
};

//total price 
function getTotalPrice(boolean) {
    const total = getElementById("total");
    if(boolean !== true) {
        total.innerText = Number(total.innerText) + 550;
    } else {
        total.innerText = Number(total.innerText) - 550;
    };
};

//coupon and discount 
function getDiscount(num) {
    const couponContainer = getElementById("couponContainer");
    const couponInput = document.getElementById("couponCode");
    const couponBtn = getElementById("couponBtn");
    const discountContainer = getElementById("discountContainer");
    const discountAmount = getElementById("discountAmount");

    if(couponBtn.hasAttribute("disabled") && num === 4) {
        couponBtn.classList.remove("bg-base_content/10");
        couponBtn.classList.add("bg-primary");
        couponBtn.removeAttribute("disabled");
    } else {
        couponBtn.classList.remove("bg-primary");
        couponBtn.classList.add("bg-base_content/10");
        couponBtn.setAttribute("disabled", true);
    }; //coupon btn styles

    couponBtn.addEventListener("click", function() {
        if(couponInput.value.toLowerCase() === "new50") {
            couponContainer.classList.add("hidden");
            discountContainer.classList.remove("hidden");

            const total = Number(getElementById("total").innerText); //get total price
            discountAmount.innerText = total * 5 / 100; //calculate the discount and show

            for (let seat of seats) {
                seat.classList.add("pointer-events-none")
            } //after applied coupon code users not able to select any seat
        };
    });
};