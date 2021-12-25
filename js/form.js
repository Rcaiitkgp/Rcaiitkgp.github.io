var i;
function call() {
  var teamMember = document.getElementById("hello");

  for (var a = 2; a <= i; a++) {
    teamMember.innerHTML += "<h3>Team Member " + a + " </h3> <label for='teamCaptain' class='form-label'>Name</label> <input class='form-control' type='text' name='captainName' value='' > <label for='teamCaptain' class='form-label'>Roll Number</label> <input class='form-control' type='text' name='captainRollno' value='' > <label for='teamCaptain' class='form-label'>Email</label><input class='form-control' type='email' name='captainEmail' value=''>";

  }
}

function whenClick1() {
  i = 7;
  call();
  document.getElementById("kabbadi").remove();
  document.getElementById("khokho").remove();
  document.getElementById("satoliya").remove();
  document.getElementById("gameLabel").remove();
}
function whenClick2() {
  i = 9;
  call();
  document.getElementById("kabbadi").remove();
  document.getElementById("khokho").remove();
  document.getElementById("satoliya").remove();
  document.getElementById("gameLabel").remove();
}
