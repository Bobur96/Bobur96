function generatePage(selector, callback) {
  selector.innerHTML = "";
  selector.innerHTML += `

        <div class="inp-div">
            <input type="text">
        </div>
        <div class="container">
        <div class="calendar">
            <div class="header">
                <p>Select day</p>
                <p class="month-year"></p>
            </div>

            <div class="content">
                <div class="change-year-month">
                    <div>
                        <p class="month-name">May</p>
                        <p class="number-year">2021</p>
                        <p class="button-show-year">^</p>
                    </div>
                    <div>
                        <h3 class="button-change-month prev"><</h3>
                        <h3 class="button-change-month next">></h3>
                    </div>
                </div>
            </div>

            <div class="days-years">
                <div class="weekdays-days">
                    <div class="weekday">
                        <p>S</p>
                        <p>M</p>
                        <p>T</p>
                        <p>W</p>
                        <p>T</p>
                        <p>F</p>
                        <p>S</p>
                    </div>
                    
                    <div class="days">
                    
                    </div>
                </div>
                
                <div class="years">
                
                </div>
            </div>

            <div class="footer">
                <button class="cancel">Cancel</button>
                <button class="ok">Ok</button>
            </div>
        </div>
    </div>
    `;
  callback();
}

function generatePageFuncs() {
  const dataMonth = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "Nowember",
    "December",
  ];
  const dataDays = ["Sun", "Mon", "Teu", "Wed", "Thu", "Fri", "Sat"];
  const days = document.querySelector(".days");
  const years = document.querySelector(".years");
  const chooseYear = document.querySelector(".button-show-year");
  const weekdaysDays = document.querySelector(".weekdays-days");
  const monthName = document.querySelector(".month-name");
  const numberYear = document.querySelector(".number-year");
  const monthYear = document.querySelector(".month-year");
  const next = document.querySelector(".next");
  const prev = document.querySelector(".prev");
  const ok = document.querySelector(".ok");
  const cancel = document.querySelector(".cancel");
  const input = document.querySelector(".inp-div input");
  const date = new Date();

  chooseYear.addEventListener("click", clickYear);
  next.addEventListener("click", clickNext);
  prev.addEventListener("click", clickPrev);
  ok.addEventListener("click", clickOk);
  cancel.addEventListener("click", clickCancel);
  input.addEventListener("click", clickInput);

  function clickInput() {
    document.querySelector(".container").style.display = "block";
  }

  function clickNext() {
    const indexMonth = dataMonth.indexOf(monthName.innerHTML);
    if (indexMonth != 11) {
      monthName.innerHTML = dataMonth[indexMonth + 1];
    } else {
      monthName.innerHTML = dataMonth[0];
      numberYear.innerHTML = numberYear.innerHTML * 1 + 1;
    }
    showDays();
  }

  function clickPrev() {
    const indexMonth = dataMonth.indexOf(monthName.innerHTML);
    if (indexMonth != 0) {
      monthName.innerHTML = dataMonth[indexMonth - 1];
    } else {
      monthName.innerHTML = dataMonth[11];
      numberYear.innerHTML = numberYear.innerHTML * 1 - 1;
    }
    showDays();
  }

  function clickYear() {
    chooseYear.classList.add("button-transform");
    weekdaysDays.classList.add("change");
    showYears();
  }

  function showYears() {
    years.style.display = "grid";
    const year = date.getFullYear();
    years.innerHTML = "";
    for (let i = 2001; i <= 2021; i++) {
      years.innerHTML += `
            <div id="${i}" class="class-year">${i}</div>
            `;
    }
    const yearDiv = document.querySelectorAll(".class-year");
    const tempyear = numberYear.innerHTML;
    for (let i = 0; i < yearDiv.length; i++) {
      if (yearDiv[i].innerHTML == tempyear) {
        yearDiv[i].classList.add("background-year");
      }
      yearDiv[i].onclick = () => {
        yearDiv.forEach((y) => {
          y.classList.remove("background-year");
        });
        numberYear.innerHTML = yearDiv[i].innerHTML;
        years.style.display = "none";
        chooseYear.classList.remove("button-transform");
        showDays();
        yearDiv[i].classList.add("background-year");
      };
    }
  }

  function showDays() {
    const thisDay = date.getDate();
    const thisMonth = dataMonth.indexOf(monthName.innerHTML);
    const thisYear = numberYear.innerHTML;
    date.setFullYear(thisYear, thisMonth, 1);
    let firstday = date.getDay();
    date.setFullYear(thisYear, thisMonth, thisDay);
    let allday = new Date(thisYear, thisMonth + 1, 0).getDate();
    days.innerHTML = "";
    date.setDate(thisDay);
    for (let i = 1; i <= allday + firstday; i++) {
      console.log(i);
      days.innerHTML += `
                <div id=${i}></div>
            `;
    }

    const daysOfMonth = document.querySelectorAll(".days div");
    let k = 1;
    for (let i = firstday; i < allday + firstday; i++) {
      daysOfMonth[i].innerHTML = k;
      console.log(
        daysOfMonth,
        " k " + k,
        " first " + firstday,
        " allday " + allday
      );
      if (daysOfMonth[i].innerHTML == thisDay) {
        daysOfMonth[i].style.border = "2px solid rgb(62, 39, 214)";
      }
      k++;
    }
    daysOfMonth.forEach((day) => {
      day.onclick = () => {
        daysOfMonth.forEach((d) => {
          d.classList.remove("select-day");
        });
        if (day.innerHTML != "") {
          day.classList.add("select-day");
          const dayy = date.getDate();
          date.setDate(day.innerHTML);
          monthYear.innerHTML =
            dataDays[date.getDay()] +
            ", " +
            dataMonth[date.getMonth()] +
            " " +
            day.innerHTML;
          date.setDate(dayy);
        }
      };
    });
  }
  function f() {
    monthYear.innerHTML =
      dataDays[date.getDay()] +
      ", " +
      dataMonth[date.getMonth()] +
      " " +
      date.getDate();
  }
  function changeMonth() {
    const monthIndex = date.getMonth();
    monthName.innerHTML = dataMonth[monthIndex];
    numberYear.innerHTML = date.getFullYear();
  }

  function clickOk() {
    input.value = monthYear.innerHTML + " " + numberYear.innerHTML;
    document.querySelector(".container").style.display = "none";
  }

  function clickCancel() {
    document.querySelector(".container").style.display = "none";
  }

  changeMonth();
  f();
  showDays();
}
