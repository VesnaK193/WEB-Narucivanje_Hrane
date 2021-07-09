Vue.component("register", {
	data: function () {
		    return {
		    	username: "",
				password: "",
				firstname: "",
				lastname: "",
				gender: "",
				birthday: null,
				errorMessage:"",
		    }
	},
	template: ` 
<div>
	<div class="min-cover">
	<main-header></main-header> 
	<main class="form-signin">
	  <div id="registerForm">
	    <h1 class="h3 mb-3 fw-normal">Create New Account</h1>
	
	    <div class="form-floating">
	      <input type="text" class="form-control" name="username" v-model="username" placeholder="Username">
	      <label for="floatingInput">Username</label>
	    </div>
	    <div class="form-floating">
	      <input type="password" class="form-control" name="password" v-model="password" placeholder="Password">
	      <label for="floatingPassword">Password</label>
	    </div>
	    <div class="form-floating">
	      <input type="text" class="form-control" name="firstname" v-model="firstname" placeholder="Firstname">
	      <label for="floatingInput">Firstname</label>
	    </div>
	    <div class="form-floating">
	      <input type="text" class="form-control" name="lastname" v-model="lastname" placeholder="Lastname">
	      <label for="floatingInput">Lastname</label>
	    </div>
	    <div class="form-floating">
	    <select class="form-control" id="genderSelect" name="gender" v-model="gender" placeholder="Gender">
	    <option value="1">Male</option>
	    <option value="2">Female</option>
	     </select>
	     <label for="floatingInput">Gender</label>
	     </div>
	    <div class="form-floating">
	      <input type="date" class="form-control" name="birthday" v-model="birthday" placeholder="Birthday">
	      <label for="floatingInput">Birthday</label>
	    </div>
	    <span class="errorMessage">{{errorMessage}}</span>
	    <button class="w-100 btn btn-lg btn-primary mt-3" type="button" v-on:click="checkForm()">Register</button>
	  </div>
	</main>	
	</div>
	<main-footer></main-footer>  
	
</div>

`,
	methods: {
		checkForm: function () {
			if(this.username == "" || this.password == "" || this.firstname == "" || this.lastname == "" || this.gender == "" || this.birthday == null || this.birthday == ""){
				this.errorMessage = "All fields are required!";
			} else {
				this.errorMessage = "";
				var birthdayInMS = new Date(this.birthday).getTime();
				var selGender = document.getElementById("genderSelect");
				var genderString = selGender.options[selGender.selectedIndex].text;
				var s = {username:this.username, password:this.password, firstname:this.firstname, lastname:this.lastname, gender:genderString, birthday:birthdayInMS, role:"CUSTOMER"};
				//If user with this username exist return data will be null
				axios
				.post("rest/user/register", s)
				.then(response => {
					if(response.data==""){
						this.errorMessage = "Username already exists!";
					} else {
						this.errorMessage = "";
						axios
						.post("rest/customer/update",response.data)
						.then(responseCustomer => {
							localStorage.user =JSON.stringify(response.data);
							window.location.href = '/NarucivanjeHrane/#/customer/home';
						});
					}
				});
			}
		}

	},
	
	filters: {
		dataFormat: function (value, format) {
			var parsed = moment(value);
			return parsed.format(format);
		}
	},
	});

function fixDate(users) {
	for (var u of users) {
		u.birthday = new Date(parseInt(u.birthday));
		console.log(u.birthday);
	}
	
	return users;
}

