Vue.component("manager-profile", {
	data: function () {
	    return {
	    	username: null,
	    	firstname: null,
	    	lastname: null,
	    	gender: null,
	    	password: null,
	    	birthday: null
	    }
},
mounted() {
		let userString = localStorage.user?localStorage.user:"";
		console.log(userString);
		if(userString !=""){
			let user = JSON.parse(localStorage.user);
			this.username=user.username;
			this.firstname=user.firstname;
			this.lastname=user.lastname;
			this.gender=user.gender;
			this.password=user.password;
			var newDate = new Date(user.birthday).toLocaleDateString("en-GB");
			this.birthday=newDate;
			
	}
	
},
template: ` 
<div class="album py-5 bg-light">
    <div class="container">

      <div class="row">
        <div class="col">
          <div class="card shadow-sm">
            <!--<svg class="bd-placeholder-img card-img-top" width="100%" height="225" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: Thumbnail" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#55595c"/><text x="50%" y="50%" fill="#eceeef" dy=".3em">Thumbnail</text></svg>
			-->
            <div class="card-body">
              <p class="card-text">Username: {{username}}</p>
              <p class="card-text">Firstname: {{firstname}}</p>
              <p class="card-text">Lastname: {{lastname}}</p>
              <p class="card-text">Password: {{password}}</p>
              <p class="card-text">Gender: {{gender}}</p>
              <p class="card-text">Birthday: {{birthday}}</p>
              <div class="d-flex justify-content-between align-items-center">
                <div class="btn-group">
                  <button type="button" class="btn btn-sm btn-outline-secondary">Edit</button>
                </div>
                <small class="text-muted">9 mins</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
 `
	
})