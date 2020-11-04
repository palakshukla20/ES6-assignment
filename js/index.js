function isLogout() {
  var txt = confirm("are you want to logout");
  if (txt == true) {
    localStorage.removeItem("email");
    window.location.href = '/login.html';
  }
}

class User {
  constructor() { }
  getCurrentUserData() {
    let getUserData = JSON.parse(localStorage.getItem("user"));
    return getUserData;
  }
  sendCurrentUserData(currentUser) {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }
  getActiveUser() {
    return localStorage.getItem("email");
  }
}

class Post extends User {
  constructor(name, date, postText, postImage) {
    super()
    this.name = name,
    this.date = date,
    this.postText = postText,
    this.postImage = postImage
  }
  setPost() {
    return {
      name,
      date,
      postText,
      postImage
    }
  }
}

var getData = new User();
function getUserName(data) {
  for (x = 0; x < data.post.length; x++) {
    data.post[x].name = data.name
  }
  return data
}

function getAllPost(currentUserData, allData) {
  var friend = currentUserData.allfriend
  allPost = []
  for (i = 0; i< allData.length; i ++ ) {
    if(friend.includes(allData[i].email)) { 
      getUserName(allData[i])
      allPost =[...allData[i].post, ...allPost]
    }
  }
  allPost = [...allPost, ...currentUserData.post];
  return allPost;
}

function load(e, id) {
  if (localStorage.getItem("email") == null) { 
    window.location.href = '/login.html';
  }
  var getUserData = getData.getCurrentUserData();
  var object = {};
  var activeUser = getData.getActiveUser();
  for (var i = 0 ; i < getUserData.length; i++) {
    if (activeUser === getUserData[i].email) {  
      var result = [];
      getUserData[i].post = getAllPost(getUserData[i], getUserData)
      result.push(getUserData[i]);
      object["result"] = result;
      var template = $('#template').html();
      var text = Mustache.render(template, object);
      $("#load-template").html(text);
      $("#navbar").load("index.html #header");
      $("#body-nav").load("index.html #body-right-nav");
      $("#profile-card").load("index.html .profile-card");
      $('#' + id).addClass('active').siblings().removeClass('active');
    }
  }
}

function addPost() {
  getObject = new Post ();         // object of post class
  var currentUserData = getObject.getCurrentUserData(); 
  var activeUser = getData.getActiveUser(); 
  for (let i = 0; i < currentUserData.length; i++) {
    if(activeUser === currentUserData[i].email) { 
      name = currentUserData[i].name;
      let imagePath = $("#post-image").val();
      imagePath = imagePath.replace(/^.*\\/, "");
      date = new Date().toLocaleString();
      postText = $("#post-text").val();
      postImage = imagePath;
      currentUserData[i].post.unshift(getObject.setPost(name, date, postText, postImage));  // call post class to prepare object
      currentUserData[i].activity = (currentUserData[i].post).length;
      getObject.sendCurrentUserData(currentUserData);
      currentUserData[i].activity = (currentUserData[i].post).length;
      console.log(currentUserData[i])
      window.location.reload(); 
      break;
    }
  }
}

function updateData() {
  let activeUser = getData.getActiveUser(); 
  let currentUser = getData.getCurrentUserData(); 
  for (let i = 0; i < currentUser.length; i++) {
    if(activeUser === currentUser[i].email) { 
      let genderData = $("input:radio[name=gender]:checked").val();
      let statusData = $("input:radio[name=status]:checked").val()
      currentUser[i].name = $("#name").val();
      currentUser[i].title = $("#title").val();
      currentUser[i].date =  ($("#date").val()).toLocaleString(); 
      currentUser[i].location = $("#address").val(); 
      currentUser[i].gender = genderData == null ? currentUser[i].gender : genderData ; 
      currentUser[i].status = statusData== null ? currentUser[i].status : statusData;
      currentUser[i].occupation = $("#occupation").val();
      currentUser[i].job = $("#job").val();
      currentUser[i].skill = $("#skill").val();
      let imagePath = $("#profile-image").val();
      imagePath = imagePath.replace(/^.*\\/, "");
      currentUser[i].profileImage = $("#profile-image").val().length == 0 ? currentUser[i].profileImage : imagePath;
      window.location.reload();  
      break; 
    }
  }
  getData.sendCurrentUserData(currentUser)
} 

function getUserPrevInfo() {
  let activeUser = getData.getActiveUser(); 
  var currentUserData = getData.getCurrentUserData(); 
  for (let i = 0; i < currentUserData.length; i++) {
    if(activeUser === currentUserData[i].email) {   
      $("#name").val(currentUserData[i].name); 
      $("#title").val(currentUserData[i].title); 
      $("#date").val(currentUserData[i].date); 
      $("#location").val(currentUserData[i].location); 
      $("#gender").val(currentUserData[i].gender); 
      $("#status").val(currentUserData[i].gender); 
      $('#occupation').val(currentUserData[i].occupation);
      $('#job').val(currentUserData[i].job); 
      $('#skill').val(currentUserData[i].skill);
      break; 
    }
  }
}

function showfriend() {
  $('.follow-card').css('display', 'block')
  let friend = [];
  let obj = {};
  let activeUser = getData.getActiveUser(); 
  var currentUserData = getData.getCurrentUserData();
  $.each(currentUserData, function(key, val) {
    if (activeUser !== val.email) {
      object = () => { return {
        name: val.name,
        title: val.title,
        email: val.email,
        profileImg: val.profileImage
      }}
      friend.unshift(object());
    }
  obj["add-friend"] = friend
  var template = $("#friend-template").html();
  text =  Mustache.render(template, obj);
  $(".add-friend").html(text);
  })
}

function getFriendDetail(getNewfriend) {
  var currentUserData = friend.getCurrentUserData();
  for (var i = 0; i < currentUserData.length; i++) {
    if(getNewfriend === currentUserData[i].email) {   
      object = () => { return {
        friendName: currentUserData[i].name,
        friendJob: currentUserData[i].job,
        friendImage: currentUserData[i].profileImage,
      }}
      return object ();
    }
  }
}

function addNewFriend(e) {
  var getNewfriend = $(e).attr("id");
  let activeUser = getData.getActiveUser(); 
  let currentUserData = getData.getCurrentUserData(); 
  for (let i = 0; i < currentUserData.length; i++) {
    if(activeUser === currentUserData[i].email) {   
      if (currentUserData[i].allfriend != null && currentUserData[i].allfriend.includes(getNewfriend)) {
        alert("Already you Both are Friend");
      }  else {
          currentUserData[i].allfriend.push(getNewfriend);
          currentUserData[i].friend.push(getFriendDetail(getNewfriend));
          currentUserData[i].following = (currentUserData[i].friend).length;
          alert("congratulations Now You Both are Friend");
      }
    }
  }
  getData.sendCurrentUserData(currentUserData)
  window.location.reload()
}


function addPhoto() {
  var activeUser = localStorage.getItem("email");
  var currentUser = getData.getCurrentUserData(); 
  for (var i = 0; i < currentUser.length; i++) {
    if(activeUser === currentUser[i].email) {   
      var imagePath = $("#photo").val();
      object = {}
      imagePath = imagePath.replace(/^.*\\/, "");
      object["photoUrl"] = imagePath;
      currentUser[i].photo.push(object);
    }
  }
  getData.sendCurrentUserData(currentUser)
  window.location.reload()
}

