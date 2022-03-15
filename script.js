var nxt_btn = document.querySelectorAll(".next_button");
var prev_btn = document.querySelectorAll(".previous_button");
var submit_btn = document.querySelectorAll(".submit_button");
var main_form = document.querySelectorAll(".main");
var progressBar = document.querySelectorAll(".steps li");
var steps = document.querySelector(".steps");
var teamLeader = document.getElementById("teamLeader").value;
var teamLeaderEmail = document.getElementById("teamLeaderEmail").value;
var teamLeaderPhone = document.getElementById("teamLeaderPhone").value;
var teamLeaderReg = document.getElementById("teamLeaderReg").value;
var teamMem2_name = document.getElementById("teamMem2-name").value;
var teamMem2_reg = document.getElementById("teamMem2-reg").value;
var teamMem3_reg = document.getElementById("teamMem3-reg").value;
var teamMem3_name = document.getElementById("teamMem3-name").value;
var teamMem4_reg = document.getElementById("teamMem4-reg").value;
var teamMem4_name = document.getElementById("teamMem4-name").value;
var teamLogo = document.getElementById("teamLogo").value;
var girl_yes = document.getElementById("girl_yes");
var girl_no = document.getElementById("girl_no");
console.log(teamLeader);
var girl_present;
if (girl_yes.checked == true) {
  girl_present = "yes";
}
if (girl_no.checked == true) {
  girl_present = "no";
}
let formNumber = 0;
nxt_btn.forEach(function (btn) {
  btn.addEventListener("click", function () {
    if (!validateform()) {
      return false;
    }
    formNumber++;
    progress("color");
    update_form();
  });
});

prev_btn.forEach(function (prev_button) {
  prev_button.addEventListener("click", function () {
    formNumber--;
    progress("nocolor");
    update_form();
  });
});

submit_btn.forEach(function (submit_button) {
  submit_button.addEventListener("click", function () {
    if (!validateform()) {
      return false;
    }
    var team_name = document.querySelector("#team_name");
    var shown_name = document.querySelector("#shown_name");
    shown_name.innerHTML = team_name.value;
    formNumber++;
    update_form();
    steps.classList.add("d-none");

    db.collection("cities")
      .doc("LA")
      .set({
        name: "Los Angeles",
        state: "CA",
        country: "USA",
      })
      .then(() => {
        console.log("Document successfully written!");
      })
      .catch((error) => {
        console.error("Error writing document: ", error);
      });
  });
});

function progress(state) {
  if (state == "color") {
    progressBar[formNumber].classList.add("li-active");
  } else {
    progressBar[formNumber + 1].classList.remove("li-active");
  }
}

function update_form() {
  main_form.forEach(function (main) {
    main.classList.remove("active");
  });
  main_form[formNumber].classList.add("active");
}

function validateform() {
  validate = true;
  var validate_inputs = document.querySelectorAll(".main.active input");
  validate_inputs.forEach(function (input_valid) {
    input_valid.classList.remove("warning");
    if (input_valid.hasAttribute("require")) {
      if (input_valid.value.length == 0) {
        validate = false;
        input_valid.classList.add("warning");
      }
    }
    if (input_valid.classList.contains("email")) {
      if (
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(input_valid.value)
      ) {
        validate = validate;
      } else {
        validate = false;
        input_valid.classList.add("warning");
        input_valid.placeholder = "Enter the correct email address";
      }
    }
    if (input_valid.classList.contains("phone")) {
      var phoneNo = /^\d{10}$/;
      if (!input_valid.value.match(phoneNo)) {
        validate = false;
        input_valid.classList.add("warning");
        input_valid.placeholder = "Enter the correct contact number";
      }
    }
  });
  return validate;
}

// document.querySelector("[type=file]").addEventListener("change", function () {
//   var file = this.files[0].name;
//   var dflt = document.querySelector(this).attr("placeholder");
//   if (document.querySelector(this).value != "") {
//     document.querySelector(this).nextElementSibling.text(file);
//   } else {
//     document.querySelector(this).nextElementSibling.text(dflt);
//   }
// });
