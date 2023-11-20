let weekArr = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

// Global var for Calendar Begin
let yearHeaderCell;
let monthHeaderCell;
let dateHeaderCell;
let dayHeaderCell;
let firstDayHeaderCell;
let lastDayHeaderCell;

let currentYear;
let currentMonthIndex;
let currentMonth;
let currentDate;
let theDayofTheweekIndex;
let theDayofTheweek;
let firstDayOfThisMonth;
let lastDayOfThisMonth;
let firstDayofTheweekIndex;
// Global var for Calendar End

// Global var for Schedule Begin
let schedulteTable;
// Global var for Schedule End
 
function headerCellInit() {

    // Get Element Start
    yearHeaderCell = document.getElementById("year");
    monthHeaderCell = document.getElementById("month");
    dateHeaderCell = document.getElementById("date");
    dayHeaderCell = document.getElementById("day");
    // Get Element End

    // Clear innerText Begin
    yearHeaderCell.innerText = null;
    monthHeaderCell.innerText = null;
    dateHeaderCell.innerText = null;
    dayHeaderCell.innerText = null;
    // Clear innerText End
}

function setCalendar(dateObj) {

    // This year
    currentYear = dateObj.getFullYear();

    // This month
    currentMonthIndex = dateObj.getMonth();
    currentMonth = currentMonthIndex + 1;

    // This date
    currentDate = dateObj.getDate();

    // The day of this week
    theDayofTheweekIndex = dateObj.getDay();
    theDayofTheweek = theDayofTheweekIndex + 1;

    // First day of this month
    firstDayOfThisMonth = new Date(currentYear, currentMonthIndex, 1).getDate();

    // Last day of this month
    lastDayOfThisMonth = new Date(currentYear, currentMonth, 0).getDate();

    firstDayofTheweekIndex = new Date(currentYear, currentMonthIndex, 1).getDay();

    console.log(`1st of The week Index ${firstDayofTheweekIndex}`);

    yearHeaderCell.innerText = currentYear;
    monthHeaderCell.innerText = currentMonth;
    dateHeaderCell.innerText = currentDate;
    dayHeaderCell.innerText = weekArr[theDayofTheweekIndex];

    let dayDataCell = document.getElementsByClassName('dayDataCell');
    console.log(dayDataCell.length);

    let d = 1;
    for (let i = 0; i < dayDataCell.length; i++) {

        dayDataCell[i].style.backgroundColor = "transparent";
        if (i >= firstDayofTheweekIndex && d <= lastDayOfThisMonth) {


            dayDataCell[i].innerHTML = null;

            let anchor = document.createElement('a');
            let ISODate = `${currentYear}-${currentMonth}-${d}`;
            anchor.dataset.isodate = ISODate;
            anchor.href = `#${ISODate}`;
            let textnode = document.createTextNode(d);
            anchor.innerText = d;
            dayDataCell[i].appendChild(anchor);

            if (d == currentDate) {
                dayDataCell[i].style.backgroundColor = "yellow";
            }
            d++;

        } else {
            dayDataCell[i].innerHTML = null;
        }
    }
}

function showScheduleByDate(isodate) {
    schedulteTable = document.getElementById('schedule')
    schedulteTable.style.visibility = "visible";
    document.getElementById('dateOfSchedule').innerHTML = "";
    document.getElementById('dateOfSchedule').innerHTML = isodate;
}

document.addEventListener("DOMContentLoaded", event => {


    headerCellInit();

    let dateObj = new Date();
    setCalendar(dateObj);

    let minusYear = document.getElementById('minusYear');
    let addYear = document.getElementById('addYear');
    let minusDminusMonthate = document.getElementById('minusMonth');
    let addMonth = document.getElementById('addMonth');

    // Minus 1 Year Event
    minusYear.addEventListener("click", event => {
        let year = dateObj.getFullYear() - 1;
        dateObj.setFullYear(year);
        setCalendar(dateObj);

    });

    // Add 1 Year Event
    addYear.addEventListener("click", event => {
        let year = dateObj.getFullYear() + 1;
        dateObj.setFullYear(year);
        setCalendar(dateObj);
    });

    // Minus 1 Month Event
    minusMonth.addEventListener("click", event => {
        let month = dateObj.getMonth() - 1;
        dateObj.setMonth(month);
        setCalendar(dateObj);

    });

    // Add 1 Month Event
    addMonth.addEventListener("click", event => {
        let month = dateObj.getMonth() + 1;
        dateObj.setMonth(month);
        setCalendar(dateObj);
    });

    // showScheduleByDate(`${currentYear}-${currentMonth}-${currentDate}`);;

    let dayOfThisMonth = document.getElementById('dayOfThisMonth');
    dayOfThisMonth.addEventListener('click', event => {
        let isodate = event.target.getAttribute('data-isodate');
        if (!isNaN(Date.parse(isodate))) {                    
            showScheduleByDate(isodate);
        }
    });
});