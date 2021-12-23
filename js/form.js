var i;
function call() {
  var teamMember = document.getElementById("hello");

  for (var a = 2; a <= i; a++) {
    teamMember.innerHTML += "<h3>Team Member " + a + " </h3> <label for='teamCaptain' class='form-label'>Name</label> <input class='form-control' type='text' name='captainName' value='' placeholder='Enter Captain Name'> <label for='teamCaptain' class='form-label'>Roll Number</label> <input class='form-control' type='text' name='captainRollno' value='' placeholder='Enter Roll Number'> <label for='teamCaptain' class='form-label'>Email</label><input class='form-control' type='email' name='captainEmail' value='' placeholder='Enter Email'>";

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
