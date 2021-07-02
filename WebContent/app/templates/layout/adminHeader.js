Vue.component("admin-header", {
	data: function () {
		    return {
		      products: null,
		      isManager:false,
		    }
	},
	template: ` 
<header v-bind:class="{ bgManager: isManager }" class="navbar navbar-dark sticky-top flex-md-nowrap p-0 shadow">
	<a class="navbar-brand col-md-3 col-lg-2 me-0 px-3" href="/NarucivanjeHrane/#/admin">DriveFood</a>
	<button class="navbar-toggler position-absolute d-md-none collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false" aria-label="Toggle navigation">
		<span class="navbar-toggler-icon"></span>
	</button>
	<input class="form-control form-control-dark w-100" type="text" placeholder="Search" aria-label="Search">
	<div class="navbar-nav">
		<div class="nav-item text-nowrap">
		<a class="nav-link px-3" href="/NarucivanjeHrane/#/login" v-on:click="logout()">Sign out</a>
		</div>
	</div>
</header>
`,
	mounted() {
		let loggedUser = JSON.parse(localStorage.user);
		this.isManager = loggedUser.role=="MANAGER"?true:false;
	},
	
	methods: {
		logout: function () {
			localStorage.user = "";
		}
	}
});