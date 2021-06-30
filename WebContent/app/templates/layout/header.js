Vue.component("main-header", {
	data: function () {
		    return {
		    	userLogged: false
		    }
	},
	template: ` 
<div class="header-container bg-white">
<div class="container bg-white">
    <header class="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4">
      <a href="/NarucivanjeHrane/#/" class="d-flex align-items-center col-md-3 mb-2 mb-md-0 text-dark text-decoration-none">
      <h3>DriveFood</h3>
      </a>

      <ul class="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
        <li><a href="/NarucivanjeHrane/#/" class="nav-link px-2 link-secondary">Home</a></li>
        <li><a href="#" class="nav-link px-2 link-dark">Profile</a></li>
        <li><a href="#" class="nav-link px-2 link-dark">About</a></li>
      </ul>

      <div class="col-md-3 text-end" v-if="!userLogged">
        <a type="button" href="/NarucivanjeHrane/#/login" class="btn btn-outline-primary me-2">Login</a>
        <a type="button" href="/NarucivanjeHrane/#/register" class="btn btn-primary">Sign-up</a>
      </div>
      <div class="col-md-3 text-end" v-if="userLogged">
        <a type="button" href="/NarucivanjeHrane/#/login" v-on:click="logout()" class="btn btn-primary">Log out</a>
      </div>
    </header>
</div>  
</div>  
`,
	mounted() {
		let user = localStorage.user?localStorage.user:"";
		this.userLogged = user==""?false:true;
//		axios
//		.get("rest/user/allUsers")
//		.then(response => {
//			this.users = fixDate(response.data);
//			console.log(response.data);
//		});
	},
	
	methods: {
		logout: function () {
			localStorage.user = "";
		}
	}
});