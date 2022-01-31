let i;
let j;
function call() {
  // var teamMember = document.getElementById(`hello${1}`);

  // for (let a = 2; a <= i;a++) {
  //   teamMember.innerHTML = "<h3> Player " + a + " </h3><input class='form-control' type='text' name='player"+a+"Name' value='' placeholder='Enter Player Name'> <input class='form-control' type='text' name='player"+a+"Rollno' value='' placeholder='Enter Roll Number'><input class='form-control' type='email' name='player"+a+"Email' value='' placeholder='Enter Email'>\n <input type='button' class='nxtbtn' id='next' onclick='whenClick0()' ; value='Next'>";
  //   //  if(whenClick0);
  //   //  else 
  //   //  {
  //   //    a = a-1;
  //   //    console.log(whenClick0);
  //   //  }
  //   console.log(whenClick0);
  // }
  for (var a = 2; a <= i; a++) {
    teamMember.innerHTML += "<h3>Team Member " + a + " </h3> <label for='teamCaptain' class='form-label'>Name</label> <input class='form-control' type='text' name='captainName' value='' > <label for='teamCaptain' class='form-label'>Roll Number</label> <input class='form-control' type='text' name='captainRollno' value='' > <label for='teamCaptain' class='form-label'>Email</label><input class='form-control' type='email' name='captainEmail' value=''>";

  }
}

function whenClick1() {
  i = 7;
  j = 1 ;
  call();
  document.getElementById("kabbadi").remove();
  document.getElementById("khokho").remove();
  document.getElementById("satoliya").remove();
  document.getElementById("gameLabel").remove();
  document.getElementById("mainhead").remove();
  document.getElementById("teamName").remove();
  var cl = document.getElementById(`page1`);
  cl.style.display = "block";
}
function whenClick2() {
  i = 9;
  j = 1 ;
  call();
  document.getElementById("kabbadi").remove();
  document.getElementById("khokho").remove();
  document.getElementById("satoliya").remove();
  document.getElementById("gameLabel").remove();
  document.getElementById("mainhead").remove();
  document.getElementById("teamName").remove();
  var cl = document.getElementById(`page1`);
  cl.style.display = "block";
}
function whenClicknext()
{
    var curr = document.getElementById(`page${j}`);
    curr.style.display = "none";
    j += 1;
    if( j < i )
    {
      var nxt = document.getElementById(`page${j}`);
      nxt.style.display = "block";
    }
    if( j == i )
    {
      var last = document.getElementById(`page${i}`);
      last.innerHTML = "<h3 class = 'playerheading'> Player " + i + " </h3><input class='form-control' type='text' name='player"+i+"Name' value='' placeholder='Enter Player Name'> <input class='form-control' type='text' name='player"+i+"Rollno' value='' placeholder='Enter Roll Number'><input class='form-control' type='email' name='player"+i+"Email' value='' placeholder='Enter Email'>\n  <input type='button' class='btn btn-secondary'  class='previousbtn' onclick='whenClickprevious()' ; value='Previous'>\n <input type='submit' class='btn btnnext' value='Submit'>";
      last.style.display = "block";
    }
} 
function whenClickprevious()
{
    var curr = document.getElementById(`page${j}`);
    curr.style.display = "none";
    j -= 1;
    if( j > 0 )
    {
      var previous = document.getElementById(`page${j}`);
      previous.style.display = "block";
    }
} 
