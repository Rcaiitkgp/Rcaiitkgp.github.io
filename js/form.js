var i;
function call() {
  var teamMember = document.getElementById("hello");

  for (var a = 2; a <= i; a++) {
    teamMember.innerHTML += "<h3>Team Member " + a + " </h3> <label for='teamCaptain'>Name</label> <input type='text' name='captainName' value='' placeholder='Enter Captain Name'> <label for='teamCaptain'>Roll Number</label> <input type='text' name='captainRollno' value='' placeholder='Enter Roll Number'> <label for='teamCaptain'>Email</label><input type='email' name='captainEmail' value='' placeholder='Enter Email'>";

  }
}

function whenClick1() {
  i = 7;
  call();
  document.getElementById("kabbadi").remove();
  document.getElementById("khokho").remove();
  document.getElementById("satoliya").remove();
}
function whenClick2() {
  i = 9;
  call();
  document.getElementById("kabbadi").remove();
  document.getElementById("khokho").remove();
  document.getElementById("satoliya").remove();
}
