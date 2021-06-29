const Login = { template: '<login></login>' }
const Register = { template: '<register></register>' }
const Homepage = { template: '<homepage></homepage>' }
const UserHome = {template: '<user-home></user-home>'}
const UserProfile = {template: '<user-profile></user-profile>'}

const router = new VueRouter({
	  mode: 'hash',
	  routes: [
	    { path: '/', component: Homepage},
	    { path: '/login', component: Login },
	    { path: '/register', component: Register },
	    { path: '/user/home', component: UserHome,
	    	beforeEnter: (to, from, next) => {
	    		console.log("usao");
	    		if(loggedAs("CUSTOMER")){
	    			next();
	    		} else {
	    			next("/login");
	    		}
	         }
	    },
	    { path: '/user/profile', component: UserProfile },
	  ]
});

var app = new Vue({
	router,
	el: '#appContent'
});

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