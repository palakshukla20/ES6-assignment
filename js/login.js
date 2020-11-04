function createNewUser(name, address = "", password, email, date = "" ) {
  return {
    name,
    location: address,
    password,
    email,
    date,
    profileImage: "default-profile-picture.jpg",
    post: [],
    friend: [],
    allfriend: [],
    photo: []
  };
}

$('#submitForm').on('click', function() {
  var prevRegisterData =  JSON.parse(localStorage.getItem("registerUser"))
  var newUser = $("#emailLogin").val();
  if (prevRegisterData.includes(newUser)) {
    alert("Email already exist")
    window.location.reload(); 
  } else {
      if ($("#password1").val() === $("#password2").val() && $("#emailLogin").val().length != 0) {
        let registerData = JSON.parse(localStorage.getItem("user"));
        prevRegisterData.push(newUser)
        name = $("#name").val();
        email = $("#emailLogin").val();
        password = $("#password1").val();
        birthdate = $("#date").val();
        address = $("#location").val();
        userData = createNewUser(name, address, password, email, date)
        registerData.push(userData);
        localStorage.setItem('registerUser', JSON.stringify(prevRegisterData));
        localStorage.setItem('user', JSON.stringify(registerData));
        alert("Form Submitted Succesfully");
      }
  }
})

$('#login').on('click', function() {
  localStorage.removeItem("email");
  let registerUser = JSON.parse(localStorage.getItem('user')); 
  let isValidEmail = $("#email").val();
  let isValidPassword = $("#password").val();
  console.log(registerUser)
  for (const {email, password} of registerUser) {
    if(isValidEmail === email && isValidPassword == password) {     // check user is valid or not
      localStorage.setItem("email", isValidEmail);
      $('#login-form').attr('action', '/timeline.html');
    } else {
        window.location.reload()
    }
  }
})

