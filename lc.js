function calcSubmit(event) {
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
    setTimeout(function () {
      window.location = "./calculation.html";
    });
  }
  document.getElementById("yname").value = "";
  document.getElementById("cname").value = "";
}
