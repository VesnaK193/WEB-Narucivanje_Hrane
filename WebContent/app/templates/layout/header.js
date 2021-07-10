Vue.component("main-header", {
	data: function () {
		    return {
		    	customerRole:false,
		    	delivererRole:false,
		    	noRole: true
		    }
	},
	template: ` 
<div class="header-container bg-white">
<div class="container bg-white">
    <header class="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4">
      <a href="/NarucivanjeHrane/#/" class="d-flex align-items-center col-md-3 mb-2 mb-md-0 text-dark text-decoration-none">
      <h3>DriveFood</h3>
      </a>

      <ul id="headerLinks" class="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0" v-if="customerRole">
        <li onclick="active(this)"><a href="/NarucivanjeHrane/#/customer/home" class="nav-link px-2 link-secondary">Home</a></li>
        <li onclick="active(this)"><a href="/NarucivanjeHrane/#/customer/profile" class="nav-link px-2 link-dark"">Profile</a></li>
        <li onclick="active(this)"><a href="/NarucivanjeHrane/#/customer/cart" class="nav-link px-2 link-dark">Cart</a></li>
        <li onclick="active(this)"><a href="/NarucivanjeHrane/#/customer/orders" class="nav-link px-2 link-dark">Orders</a></li>
      </ul>
      <ul class="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0" v-if="delivererRole">
        <li onclick="active(this)"><a href="/NarucivanjeHrane/#/deliverer/home" class="nav-link px-2 link-secondary">Home</a></li>
        <li onclick="active(this)"><a href="/NarucivanjeHrane/#/deliverer/profile" class="nav-link px-2 link-dark"">Profile</a></li>
      </ul>

      <div class="col-md-3 text-end" v-if="noRole">
        <a type="button" href="/NarucivanjeHrane/#/login" class="btn btn-outline-primary me-2">Login</a>
        <a type="button" href="/NarucivanjeHrane/#/register" class="btn btn-primary">Sign-up</a>
      </div>
      <div class="col-md-3 text-end" v-if="!noRole" >
        <a type="button" href="/NarucivanjeHrane/#/login" v-on:click="logout()" class="btn btn-primary">Log out</a>
      </div>
    </header>
</div>  
</div>  
`,
	mounted() {
		if(localStorage.user=="" || localStorage.user=="undefined") {
			this.noRole=true;
		} else {
			let user = JSON.parse(localStorage.user);
			if(user.role=="CUSTOMER"){
				this.customerRole = true;
				this.noRole=false;
			}
			if(user.role=="DELIVERER"){
				this.delivererRole = true;
				this.noRole=false;
			}
		}
		function loggedAs(type) {
			let userString = localStorage.user?localStorage.user:"";
			if(userString !=""){
				let user = JSON.parse(localStorage.user);
				if(user.role == type){
					return true;
				}
				return false;
			}
			return false;
		}
	},
	
	methods: {
		test : function(event) {
			console.log(event)
		},
		logout: function () {
			localStorage.user = "";
		}
	}
});
function active(element) {
	let oldElem = element.parentElement.querySelector(".link-secondary");
	oldElem.classList.remove("link-secondary");
	oldElem.classList.add("link-dark");
	element.querySelector("a").classList.remove("link-dark");
	element.querySelector("a").classList.add("link-secondary");
}