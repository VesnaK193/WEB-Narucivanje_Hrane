const Login = { template: '<login></login>' }
const Register = { template: '<register></register>' }
const Homepage = { template: '<homepage></homepage>' }
const Admin = {template: '<admin></admin>'}
const AdminHome = {template: '<admin-home></admin-home>'}
const AdminManagers = {template: '<admin-managers></admin-managers>'}
const AdminDeliverers = {template: '<admin-deliverers></admin-deliverers>'}
const AdminRestaurants = {template: '<admin-restaurants></admin-restaurants>'}
const AdminCustomers = {template: '<admin-customers></admin-customers>'}
const AdminProfile = {template: '<admin-profile></admin-profile>'}
const RestaurantView = {template: '<restaurant-view></restaurant-view>'}
const RestaurantViewWH = {template: '<restaurant-view-wh></restaurant-view-wh>'}
const Customer = {template: '<customer></customer>'}
const CustomerHome = {template: '<customer-home></customer-home>'}
const CustomerProfile = {template: '<customer-profile></customer-profile>'}
const CustomerCart = {template: '<customer-cart></customer-cart>'}
const CustomerOrders = {template: '<customer-orders></customer-orders>'}
const Manager = {template: '<manager></manager>'}
const ManagerHome = {template: '<manager-home></manager-home>'}
const ManagerProfile = {template: '<manager-profile></manager-profile>'}
const MyRestaurant = {template: '<my-restaurant></my-restaurant>'}
const Products = {template: '<products></products>'}
const Deliverer = {template: '<deliverer></deliverer>'}
const DelivererHome = {template: '<deliverer-home></deliverer-home>'}
const DelivererProfile = {template: '<deliverer-profile></deliverer-profile>'}
const PageNotFound = {template: '<div><h1 class="text-center mt-5">404! Page not found.</h1></div>'}

const router = new VueRouter({
	  mode: 'hash',
	  routes: [
		    {
		    	path: '/', 
		    	component: Homepage,
		    	beforeEnter: (to, from, next) => {
		    		if(isLogged()){
		    			next("/"+getCurrentRole());
		    		} else {
		    			next();
		    		}
		    	}
		    },

    	{
    		path: '/restaurant/:id',
    		component:RestaurantViewWH,
	    	beforeEnter: (to, from, next) => {
	    		if(isLogged()){
	    			next("/"+getCurrentRole());
	    		} else {
	    			next();
	    		}
	    	}
    	},
	    { 
	    	path: '/login', 
	    	component: Login, 
	    	beforeEnter: (to, from, next) => {
	    		if(isLogged()){
	    			next("/"+getCurrentRole());
	    		} else {
	    			next();
	    		}
	         }
	    },
	    { 
	    	path: '/register', 
	    	component: Register,  
	    	beforeEnter: (to, from, next) => {
	    		if(isLogged()){
	    			next("/"+getCurrentRole());
	    		} else {
	    			next();
	    		}
	         }
	    },
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
	    		{
	    			path: 'customers',
	    			component:AdminCustomers,
	    		},
	    		{
	    			path: 'restaurant/:id',
	    			component:RestaurantView,
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
	    		},
	    		{
	    			path: 'myRestaurant',
	    			component: MyRestaurant
	    		},
	    		{
	    			path: 'products',
	    			component: Products
	    		},
	    		{
	    			path: 'restaurant/:id',
	    			component:RestaurantView,
	    		},
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
	    		},
	    		{
	    			path: 'home',
	    			component: CustomerHome
	    		},
	    		{
	    			path: 'restaurant/:id',
	    			component:RestaurantView,
	    		},
	    		{
	    			path: 'cart',
	    			component: CustomerCart
	    		},
	    		{
	    			path: 'orders',
	    			component: CustomerOrders
	    		},
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
	    		},
	    		{
	    			path: 'home',
	    			component: DelivererHome
	    		},
	    		{
	    			path: 'restaurant/:id',
	    			component:RestaurantView,
	    		},
	    	],
	    	beforeEnter: (to, from, next) => {
	    		if(loggedAs("DELIVERER")){
	    			next();
	    		} else {
	    			next("/login");
	    		}
	         }
	    },
	    { path: "*", component: PageNotFound }
	  ]
});

var app = new Vue({
	router,
	el: '#appContent'
});
function getCurrentRole(){
	let user = JSON.parse(localStorage.user);
	return user.role.toLowerCase();
}
function isLogged(){
	let userString = localStorage.user?localStorage.user:"";
	if(userString !=""){
		return true;
	}
	return false;
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