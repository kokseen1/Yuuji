let countdown_div = document.createElement("DIV");
countdown_div.className = "spaceit";
var broadcast_xpath = "//span[contains(text(),'Broadcast:')]";
var broadcast_span_element = document.evaluate(broadcast_xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
var broadcast_div = broadcast_span_element.parentElement;
let broadcast_day_time = broadcast_div.lastChild.nodeValue.trim();
// let broadcast_day_time = "Mondays at 17:37" // For debugging
let weekdays_array = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const day_time_array = broadcast_day_time.split(" ");
const broadcast_weekday_int = weekdays_array.indexOf(day_time_array[0].slice(0, 3));
var today = new Date();
var today_weekday_int = today.getDay() - 1 // Monday is 0
var days_until_broadcast = (broadcast_weekday_int - today_weekday_int) % 7;
var broadcast_date = new Date(new Date(Date().slice(0, 16) + day_time_array[2]).getTime() + (days_until_broadcast * 24 * 60 * 60 * 1000 - 1 * 60 * 60 * 1000));

if (Date.parse(Date()) > Date.parse(broadcast_date)) {
    broadcast_date.setTime(broadcast_date.getTime() + (7 * 24 * 60 * 60 * 1000)); // Add 7 days if it already aired today
}

function getTimeRemaining(endtime) {
    const total = Date.parse(endtime) - Date.parse(new Date());
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
    const days = Math.floor(total / (1000 * 60 * 60 * 24));
    return {
        total,
        days,
        hours,
        minutes,
        seconds
    };
}

setInterval(function () {
    var countDownDate = getTimeRemaining(broadcast_date);
    countdown_div.innerHTML = "<span class=\"dark_text\">Countdown: </span>" + countDownDate.days + "d " + countDownDate.hours + "h "
        + countDownDate.minutes + "m " + countDownDate.seconds + "s ";
}, 1000);

broadcast_div.parentNode.insertBefore(countdown_div, broadcast_div.nextSibling);
next_date = document.createElement("DIV");
next_date.innerHTML = "<span class=\"dark_text\">Next broadcast date: </span>" + broadcast_date.toString().slice(0, -25);
broadcast_div.parentNode.insertBefore(next_date, countdown_div);
