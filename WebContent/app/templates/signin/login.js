Vue.component("login", {
	data: function () {
		    return {
		      username: "",
		      password: "",
		      validate: false,
		      errorMessage: "",
		    }
	},
	template: ` 
<div>
	<div class="min-cover">
		<main-header></main-header> 
		<main class="form-signin">
		  <div>
		    <h1 class="h3 mb-3 fw-normal">Sign in to our app</h1>
		
		    <div class="form-floating">
				<input type="text" class="form-control" name="username" v-model="username" placeholder="Username">
	      		<label for="floatingInput">Username</label>
	    	</div>
		    <div class="form-floating last">
		      <input type="password" class="form-control" name="password" v-model="password" placeholder="Password">
		      <label for="floatingPassword">Password</label>
		    </div>
	    	<span class="errorMessage">{{errorMessage}}</span>
		    <button class="w-100 btn btn-lg btn-primary" mt-3 type="button" v-on:click="checkForm()">Sign in</button>
		  </div>
		</main>
	</div> 
		<main-footer></main-footer>
</div>  
`
	, 
	
	methods: {
		checkForm: function () {
			if(this.username == "" || this.password == ""){
				this.errorMessage = "All fields are required!"
			} else {
				this.errorMessage = ""
				var s = {username:this.username, password:this.password};
				axios
				.post("rest/user/login", s)
				.then(response => {
					if(response.data != null && response.data != "") {
						this.errorMessage = "";

						localStorage.user =JSON.stringify( response.data);
						window.location.href = "/NarucivanjeHrane/#/user/home";
					} else {
						this.errorMessage = "Wrong username and password!";
					}
				});
			}
		}

	}

});