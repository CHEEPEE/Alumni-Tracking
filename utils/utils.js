function ajaxHandler(objectData, callback,state) {
  $.ajax({
    url: "functions/index.php",
    method: "POST",
    data: { ...objectData },
    success: function(data) {
      callback(data,state);
    }
  });
}

function isSuccess(data) {
  console.log(data)
  if (data.trim() == "success") {
    return true;
  }
  console.log(data)
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

function calculateAge(birthday) { // birthday is a date
    var ageDifMs = Date.now() - birthday.getTime();
    var ageDate = new Date(ageDifMs); // miliseconds from epoch
    return Math.abs(ageDate.getUTCFullYear() - 1970);
}