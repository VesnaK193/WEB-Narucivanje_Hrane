Vue.component("login", {
	data: function () {
		    return {
		      username: null,
		      password: null
		    }
	},
	template: ` 
<div>
	<div class="min-cover">
		<main-header></main-header> 
		<main class="form-signin">
		  <div>
		    <h1 class="h3 mb-3 fw-normal">Sign in to Deliverer</h1>
		
		    <div class="form-floating">
				<input type="text" class="form-control" name="username" v-model="username" placeholder="Username">
	      		<label for="floatingInput">Username</label>
	    	</div>
		    <div class="form-floating last">
		      <input type="password" class="form-control" name="password" v-model="password" placeholder="Password">
		      <label for="floatingPassword">Password</label>
		    </div>
		
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
			var s = {username:this.username, password:this.password};
			axios
			.post("rest/user/login", s)
			.then(response => {
				localStorage.user =JSON.stringify( response.data);
				window.location.href = '/NarucivanjeHrane/#/';
			});
		}

	}

});