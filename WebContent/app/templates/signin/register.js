Vue.component("register", {
	data: function () {
		    return {
		    	username: null,
				password: null,
				firstname: null,
				lastname: null,
				gender: null
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
	      <input type="text" class="form-control" name="gender" v-model="gender" placeholder="Gender">
	      <label for="floatingInput">Gender</label>
	    </div>
	    <button class="w-100 btn btn-lg btn-primary mt-3" type="button" v-on:click="checkForm()">Sign in</button>
	  </div>
	</main>	
	</div>
	<main-footer></main-footer>  
	
</div>

`
	, 
	methods: {
		checkForm: function () {
			var s = {username:this.username, password:this.password, firstname:this.firstname, lastname:this.lastname, gender:this.gender};
			axios
			.post("rest/register/Add", s)
			.then(response => (console.log(response.data)));
		}

	}
	});

