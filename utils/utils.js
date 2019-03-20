import { isNumber } from "util";

function ajaxHandler(objectData, callback, state) {
  $.ajax({
    url: "functions/index.php",
    method: "POST",
    data: { ...objectData },
    success: function(data) {
      callback(data, state);
    }
  });
}

function isUserDetailsValidate(userDetails) {
  const {
    batch,
    first_name,
    last_name,
    middle_name,
    email,
    birthdate,
    gender,
    address,
    permanent_address,
    course,
    contact_number,
    user_type
  } = userDetails;
  if (
    batch == "" ||
    first_name == "" ||
    middle_name == "" ||
    last_name == "" ||
    email == "" ||
    birthdate == "" ||
    gender == "" ||
    address == "" ||
    permanent_address == "" ||
    course == "" ||
    contact_number == "" ||
    user_type == ""
  ) {
    alert("Please Fill up All fields");
    return false;
  } else {
    return isEmailValid(email) && isNumberValid(contact_number);
  }
}

function isPasswordValidate(password) {
  if (password.includes(" ")) {
    alert("Password must not contains Spaces (' ')");
    return false;
  } else if (password.length <= 5) {
    alert("Password Must minumum of 6 Characters");
    return false;
  } else {
    return true;
  }
}

function isNumberValid(number) {
  if (number.length == 10) {
    return true;
  } else {
    alert("Number must Be 10 Digits");
    return false;
  }
}

function isEmailValid(email) {
  let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(email)) {
    return true;
  } else {
    alert("Invalid Email Format");
    return false;
  }
}
function isSuccess(data) {
  console.log(data);
  if (data.trim() == "success") {
    return true;
  }
  console.log(data);
}

function isUserIdValid(userId) {
  let userIdAr = userId.split("-");
  if (
    userIdAr.length != 3 ||
    userIdAr[0].length != 4 ||
    userIdAr[1].length != 4 ||
    userIdAr[2].length != 1
  ) {
    alert("Invalid User ID");
    return false;
  } else if (!/^\d+$/.test(userIdAr[0]) || !/^\d+$/.test(userIdAr[1])) {
    alert("Invalid User ID");
    return false;
  } else if (/^\d+$/.test(userIdAr[2])) {
    alert("Invalid User ID");
    return false;
  }
  return true;
}

function clearValue(data) {
  let dataMap = data;
  for (var key in dataMap) {
    if (dataMap.hasOwnProperty(key)) {
      if (key != "requestType") {
        document.querySelector("#" + key).value = "";
      }
    }
  }
}

function calculateAge(birthday) {
  // birthday is a date
  var ageDifMs = Date.now() - birthday.getTime();
  var ageDate = new Date(ageDifMs); // miliseconds from epoch
  return Math.abs(ageDate.getUTCFullYear() - 1970);
}
