$(document).ready(function () {
  let daysElem = $("#days");
  let monhtsElem = $("#months");
  let yearsElem = $("#years");
  let buttonElem = $(".btn");

  let dayElemError = true;
  let monthElemError = true;
  let yearElemError = true;

  $(".days-validate").hide();
  daysElem.keyup(function () {
    validateDayField();
  });

  $(".months-validate").hide();
  monhtsElem.keyup(function () {
    validateMonthField();
  });

  $(".years-validate").hide();
  yearsElem.keyup(function () {
    validateYearField();
  });

  const now = new Date();
  var today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  var thisYear = now.getFullYear();
  var thisMonth = now.getMonth() + 1;
  var thisDate = now.getDate();

  console.log("today 👍", today);
  console.log("this year 👍", thisYear);
  console.log("this Month 👍", thisMonth);
  console.log("this Date 👍", thisDate);

  function validateDayField() {
    let dayValue = daysElem.val();
    let dayNumber = parseInt(dayValue);

    if (dayValue.length === "" || isNaN(dayNumber)) {
      $("#days").removeClass("input-field");
      $("#days").addClass("input-field-error");
      $(".day-lab").removeClass("lab");
      $(".day-lab").addClass("lab-error");
      $(".days-validate").show();
      $(".days-validate").html("This field is required");
      dayElemError = false;
      return false;
    } else if (dayNumber < 1 || dayNumber > 31) {
      $(".days-validate").show();
      $(".day-input").removeClass("input-field");
      $(".day-input").addClass("input-field-error");
      $(".day-lab").removeClass("lab");
      $(".day-lab").addClass("lab-error");
      $(".days-validate").html("Must be a valid day");
      dayElemError = false;
      return false;
    } else {
      $("#days").removeClass("input-field-error");
      $("#days").addClass("input-field");
      $(".day-lab").removeClass("lab-error");
      $(".day-lab").addClass("lab");
      $(".days-validate").hide();
      dayElemError = true;
    }
    return dayNumber;
  }

  function validateMonthField() {
    let monthValue = monhtsElem.val();
    let monthNumber = parseInt(monthValue);

    if (monthValue.length === "" || isNaN(monthNumber)) {
      $("#months").removeClass("input-field");
      $("#months").addClass("input-field-error");
      $(".month-lab").removeClass("lab");
      $(".month-lab").addClass("lab-error");
      $(".months-validate").show();
      $(".months-validate").html(" This field is required");
      monthElemError = false;
      return false;
    } else if (monthNumber < 1 || monthNumber > 12) {
      $(".months-validate").show();
      $("#months").removeClass("input-field");
      $("#months").addClass("input-field-error");
      $(".month-lab").removeClass("lab");
      $(".month-lab").addClass("lab-error");
      $(".months-validate").html("Must be a valid Month");
      monthElemError = false;
      return false;
    } else {
      $("#months").removeClass("input-field-error");
      $("#months").addClass("input-field");
      $(".month-lab").removeClass("lab-error");
      $(".month-lab").addClass("lab");
      $(".months-validate").hide();
      monthElemError = true;
    }
    return monthNumber;
  }

  function validateYearField() {
    let yearValue = yearsElem.val();
    let yearNumber = parseInt(yearValue);

    if (yearValue.length === "" || isNaN(yearNumber)) {
      $(".years-validate").show();
      $("#years").removeClass("input-field");
      $("#years").addClass("input-field-error");
      $(".year-lab").removeClass("lab");
      $(".year-lab").addClass("lab-error");
      $(".years-validate").html("This field is required");
      yearElemError = false;
      return false;
    } else if (yearNumber < 1 || yearNumber >= thisYear) {
      $(".years-validate").show();
      $("#years").removeClass("input-field");
      $("#years").addClass("input-field-error");
      $(".year-lab").removeClass("lab");
      $(".year-lab").addClass("lab-error");
      $(".years-validate").html("Must be in the past");
      yearElemError = false;
      return false;
    } else {
      $("#years").removeClass("input-field-error");
      $("#years").addClass("input-field");
      $(".year-lab").removeClass("lab-error");
      $(".year-lab").addClass("lab");

      $(".years-validate").hide();
      yearElemError = true;
    }
    return yearNumber;
  }

  function calculateAge(yearNumber, monthNumber, dayNumber) {
    const birthday = new Date(`${yearNumber}, ${monthNumber},${dayNumber}`);

    var bdYear = birthday.getFullYear();
    var bdMonth = birthday.getMonth() + 1;
    var bdDate = birthday.getDate();

    console.log("My birthday 👍", birthday);
    console.log("My birthday Date 👍", bdDate);
    console.log("My birthday Month 👍", bdMonth);
    console.log("My birthday Year 👍", bdYear);

    let outputMonth;
    let outputDate;

    let outputYear = thisYear - bdYear;

    if (thisMonth >= bdMonth) outputMonth = thisMonth - bdMonth;
    else {
      outputYear--;
      outputMonth = 12 + thisMonth - bdMonth;
    }

    if (thisDate >= bdDate) outputDate = thisDate - bdDate;
    else {
      outputMonth--;
      outputDate = 31 + thisDate - bdDate;

      if (outputMonth < 0) {
        outputMonth = 11;
        outputYear--;
      }
    }

    showDate(outputDate, outputMonth, outputYear);

    return birthday;
  }

  function showDate(date, month, year) {
    $("span#isYear").html(year);
    $("span#isMonth").html(month);
    $("span#isDay").html(date);
  }

  buttonElem.click(function () {
    validateDayField();
    validateMonthField();
    validateYearField();

    let yearNumber = parseInt(yearsElem.val());
    let monthNumber = parseInt(monhtsElem.val());
    let dayNumber = parseInt(daysElem.val());

    calculateAge(yearNumber, monthNumber, dayNumber);

    if (
      dayElemError == true &&
      monthElemError == true &&
      yearElemError == true
    ) {
      daysElem.val("");
      monhtsElem.val("");
      yearsElem.val("");
      return true;
    } else {
      return false;
    }
  });
});
