// ex-01 takes str and reverse it
var strReverse = (str) => {
    let listOfChars = str.split("");
    // ['J', 'a', 'v', 'a', 'S', 'c', 'r', 'i', 'p', 't']
    let reverseListOfChar = listOfChars.reverse();
    // ['t', 'p', 'i', 'r', 'c', 'S', 'a', 'v', 'a', 'J']
    let reverseString = reverseListOfChar.join('');
    // tpircSavaJ
    return reverseString;
  }
    //   console.log(strReverse('JavaScript'));

//  ex-02  function to check for palindrome
var isPalindrome = (str) => {
  var reversedString = strReverse(str);
  return str === reversedString;
}

// ex 03 convert date to string
var convertDateToStr = (date) => {
  var dateStr = {
    day: "",
    month: "",
    year: ""
  };

  // add zer0 to day like '0'1 01
  if(date.day < 10){
    dateStr.day = '0'+ date.day;
  }
  else {
    dateStr.day = date.day.toString();
  }
  // add zer0 to month like '0'1 01
  if(date.month < 10){
    dateStr.month = '0'+ date.month;
  }
  else {
    dateStr.month = date.month.toString();
  }
  // no need to add zero so convert to string
  dateStr.year = date.year.toString();

  return dateStr;
}
// var date = {day: 8, month:4, year:1111}
// console.log(convertDateToStr(date));
// output {day: '08', month: '04', year: '1111'}

// ex 04 
var getAllDateFormats = (date) => {
  // helper function
  var dateStr = convertDateToStr(date);

  var ddmmyyyy = dateStr.day + dateStr.month + dateStr.year;
  var mmddyyyy = dateStr.month + dateStr.day + dateStr.year;
  var yyyymmdd = dateStr.year + dateStr.month + dateStr.day;
  // slice -2 would get last two numbers of year 2011 = 11
  var ddmmyy = dateStr.day + dateStr.month + dateStr.year.slice(-2);
  var mmddyy = dateStr.month + dateStr.day + dateStr.year.slice(-2);
  var yymmdd = dateStr.year.slice(-2) + dateStr.month + dateStr.day;

  return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];
}

// ex 05
var checkPalindromeForAllDateFormats = (date) => {
  var listOfPalindromes = getAllDateFormats(date);
  var bar = false;

  for(var i = 0; i < listOfPalindromes.length; i++){
    if(isPalindrome(listOfPalindromes[i])){
      bar = true;
      break;
    }
  }
  return bar;
}

// ex 06
// checks leap Year
var isLeapYear = (year) => {
  if(year % 400 === 0){
    return true;
  }
  if(year % 100 === 0){
    return false;
  }
  if(year % 4 === 0){
    return true;
  }
  return false;
}

// get next date
var getNextDate = (date) => {
  var day = date.day + 1;
  var month = date.month;
  var year = date.year;

  var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]; 
//  0-11 
  
  // check for february
  if (month === 2){
    // check for leap year
    if(isLeapYear(year)){
      if(day > 29){
        day = 1;
        month++;
      }
    }
    else{
      if(day > 28){
        day = 1;
        month++;
      }
    }
  }
  else{
    // checks if the day exceeds the max days in month
    if(day > daysInMonth[month -1]){
      day = 1;
      month++; //increment the month 
    }
  }

  // increment the year if month is greater than 12
  if(month > 12){
    month = 1;
    year++;
  }

  return{
    day: day,
    month: month,
    year: year
  };
}

var getNextPalindromeDate = (date) => {
  var ctr = 0;
  var nextDate = getNextDate(date);

  while(1){
    ctr++;
    var isPalindrome = checkPalindromeForAllDateFormats(nextDate);
    if(isPalindrome){
      break;
    }
    nextDate = getNextDate(nextDate);
  }

  return [ctr, nextDate];
}

var dateInput = document.getElementById('bday-input');
var check = document.getElementById('check-btn');
var resultRef = document.getElementById('result');

var clickHandler = (e) => {
  var bdayStr = dateInput.value;

resultRef.innerHTML = "<img src='images/calculate-result.gif' alt='gify processing gif image' width='400px'>";


 if(bdayStr !== ''){
    var listOfDate = bdayStr.split('-');
    var date = {
      day: Number(listOfDate[2]),
      month: Number(listOfDate[1]),
      year: Number(listOfDate[0])
    };
     var isPalindrome = checkPalindromeForAllDateFormats(date);
     

    setTimeout(function(){
     if(isPalindrome){
         resultRef.innerText = "Yay! your birthday is a palindrome!! 🎉";
     } else {
       var [ctr, nextDate] = getNextPalindromeDate(date);
       resultRef.innerText = `The next palindrome date is ${nextDate.day}-${nextDate.month}-${nextDate.year}. You missed it by ${ctr} days 😞`;
     }  
    }, 2000);
  } else {
    resultRef.innerHTML = "Please select the date 😬";
  }
}

check.addEventListener('click', clickHandler);
