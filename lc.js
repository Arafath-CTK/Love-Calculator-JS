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

  var loveNumber = yourLoveCalculationAlgorithm(name1, name2);

  window.location = "./calculation.html?lovePercentage=" + loveNumber;
}

function yourLoveCalculationAlgorithm(name1, name2) {
  // Convert names to lowercase to make the comparison case-insensitive
  name1 = name1.toLowerCase();
  name2 = name2.toLowerCase();

  // Define a mapping of letters to their positions in the alphabet
  const alphabet = "abcdefghijklmnopqrstuvwxyz";
  const letterPositions = {};
  for (let i = 0; i < alphabet.length; i++) {
    letterPositions[alphabet[i]] = i;
  }

  // Calculate points based on common letters and their positions
  let totalPoints = 0;
  for (let i = 0; i < name1.length; i++) {
    const letter1 = name1[i];
    const letter2 = name2[i % name2.length]; // Handle cases where names have different lengths

    // Check if the letters are the same
    if (letter1 === letter2) {
      // Assign points based on the position of the letter in the alphabet
      totalPoints += letterPositions[letter1] + 1;
    }
  }

  // Calculate the love percentage
  const maxPossiblePoints = alphabet.length * name1.length; // Maximum points for perfect match
  const lovePercentage = (totalPoints / maxPossiblePoints) * 100;

  // Ensure the love percentage is within the range of 0 to 100
  const finalPercentage = Math.min(Math.max(lovePercentage, 0), 100);

  return finalPercentage.toFixed(2); // Round to two decimal places
}
