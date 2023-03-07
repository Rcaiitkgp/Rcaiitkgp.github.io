const couponPrice = 200;
let couponNumber = 0;
const updateButton = () => {
    couponNumber = document.getElementById('couponNumbers').value;
    if (couponNumber) {
        totalPrice = couponNumber * couponPrice;
        document.getElementById('khamma-price-display').innerHTML = " - &#8377;" + totalPrice;
        console.log(totalPrice);
    }

    else {
        document.getElementById('khamma-price-display').innerHTML = "";
    }

}
