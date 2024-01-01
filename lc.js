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
    calculateLove();
    $.ajax({
      url: "https://script.google.com/macros/s/AKfycbw3LyA2UG5QMduk5pBN9_HmzetblDKcw8sINcmJhqovINOdN0jndRhozr_uZoqN_vP1XA/exec",
      data: $("#loveform").serialize(),
      method: "post",
      success: function (response) {
        console.log("Submitted successfully");
      },
      error: function (err) {
        console.error("Something went wrong", err);
      },
    });
  }
  return false;
}

function calculateLove() {
  var name1 = document.getElementById("yname").value;
  var name2 = document.getElementById("cname").value;

  var loveNumber = calculateLovePercentage(name1, name2);

  window.location = "./calculation.html?lovePercentage=" + loveNumber;
}

function calculateLovePercentage(name1, name2) {
  // Combine the names and convert to lowercase
  const combinedName = name1.toLowerCase() + name2.toLowerCase();

  // Assign each letter a unique number based on its position
  const letterValues = {};
  for (let index = 0; index < combinedName.length; index++) {
    const letter = combinedName[index];
    letterValues[letter] = (index % 10).toString();
  }

  // Calculate the total value for each name, considering letter positions
  const calculateTotalValue = (name) => {
    return Array.from(name.toLowerCase()).reduce((total, letter, index) => {
      const letterValue = parseInt(letterValues[letter] + index.toString());
      return total + letterValue;
    }, 0);
  };

  const totalValueName1 = calculateTotalValue(name1);
  const totalValueName2 = calculateTotalValue(name2);

  // Calculate the total value for appearances of the same letters in both names
  const sameLetterValue = Array.from(new Set(name1.toLowerCase())).reduce(
    (acc, letter) => {
      if (name2.toLowerCase().includes(letter)) {
        return acc + parseInt(letterValues[letter]);
      }
      return acc;
    },
    0
  );

  // Calculate love percentage and ensure it's within the range of 0 to 100
  let lovePercentage =
    ((totalValueName1 + totalValueName2) * sameLetterValue) % 101;

  return lovePercentage;
}
