const Login = { template: '<login></login>' }
const Register = { template: '<register></register>' }
const Homepage = { template: '<homepage></homepage>' }
const Admin = {template: '<admin></admin>'}
const AdminHome = {template: '<admin-home></admin-home>'}
const AdminManagers = {template: '<admin-managers></admin-managers>'}
const AdminDeliverers = {template: '<admin-deliverers></admin-deliverers>'}
const AdminRestaurants = {template: '<admin-restaurants></admin-restaurants>'}
const AdminProfile = {template: '<admin-profile></admin-profile>'}
const Customer = {template: '<customer></customer>'}
const CustomerHome = {template: '<customer-home></customer-home>'}
const CustomerProfile = {template: '<customer-profile></customer-profile>'}
const Manager = {template: '<manager></manager>'}
const ManagerHome = {template: '<manager-home></manager-home>'}
const ManagerProfile = {template: '<manager-profile></manager-profile>'}
const Deliverer = {template: '<deliverer></deliverer>'}
const DelivererHome = {template: '<deliverer-home></deliverer-home>'}
const DelivererProfile = {template: '<deliverer-profile></deliverer-profile>'}

const router = new VueRouter({
	  mode: 'hash',
	  routes: [
	    { path: '/', component: Homepage},
	    { path: '/login', component: Login },
	    { path: '/register', component: Register },
	    { 
	    	path: '/admin', 
	    	component: Admin,
	    	children: [
	    		{
	    			path: '',
	    			component:AdminHome,
	    		},
	    		{
	    			path: 'managers',
	    			component:AdminManagers,
	    		},
	    		{
	    			path: 'profile',
	    			component:AdminProfile,
	    		},
	    		{
	    			path: 'deliverers',
	    			component:AdminDeliverers,
	    		},
	    		{
	    			path: 'restaurants',
	    			component:AdminRestaurants,
	    		},
	    	],
	    	beforeEnter: (to, from, next) => {
	    		if(loggedAs("ADMIN")){
	    			next();
	    		} else {
	    			next("/login");
	    		}
	         }
	    },
	    { 
	    	path: '/manager', 
	    	component: Manager,
	    	children: [
	    		{
	    			path: '',
	    			component: ManagerHome
	    		},
	    		{
	    			path: 'profile',
	    			component: ManagerProfile
	    		}
	    	],
	    	beforeEnter: (to, from, next) => {
	    		if(loggedAs("MANAGER")){
	    			next();
	    		} else {
	    			next("/login");
	    		}
	         }
	    },
	    { 
	    	path: '/customer', 
	    	component: Customer,
	    	children: [
	    		{
	    			path: '',
	    			component: CustomerHome
	    		},
	    		{
	    			path: 'profile',
	    			component: CustomerProfile
	    		}
	    	],
	    	beforeEnter: (to, from, next) => {
	    		if(loggedAs("CUSTOMER")){
	    			next();
	    		} else {
	    			next("/login");
	    		}
	         }
	    },
	    { 
	    	path: '/deliverer', 
	    	component: Deliverer,
	    	children: [
	    		{
	    			path: '',
	    			component: DelivererHome
	    		},
	    		{
	    			path: 'profile',
	    			component: DelivererProfile
	    		}
	    	],
	    	beforeEnter: (to, from, next) => {
	    		if(loggedAs("DELIVERER")){
	    			next();
	    		} else {
	    			next("/login");
	    		}
	         }
	    },
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