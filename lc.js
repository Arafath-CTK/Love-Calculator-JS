function calcSubmit() {
  var yNameInput = document.getElementById("yname");
  var cNameInput = document.getElementById("cname");

  var ynameError = document.getElementById("yname-error");
  var cnameError = document.getElementById("cname-error");

  var isValidYName = /^[a-zA-Z\s]{3,}$/.test(yNameInput.value);
  var isValidCName = /^[a-zA-Z\s]{3,}$/.test(cNameInput.value);

  if (!isValidYName) {
    ynameError.style.display = "block";
  } else {
    ynameError.style.display = "none";
  }

  if (!isValidCName) {
    cnameError.style.display = "block";
  } else {
    cnameError.style.display = "none";
  }

  if (isValidYName && isValidCName) {
    $.ajax({
      url: "https://script.google.com/macros/s/AKfycbw3LyA2UG5QMduk5pBN9_HmzetblDKcw8sINcmJhqovINOdN0jndRhozr_uZoqN_vP1XA/exec",
      data: $("#loveform").serialize(),
      method: "post",
      success: function (response) {
        window.location = "./calculation.html";
      },
      error: function (err) {
        alert("Something went wrong");
      },
    });
  }
  document.getElementById("yname").value = "";
  document.getElementById("cname").value = "";
}
