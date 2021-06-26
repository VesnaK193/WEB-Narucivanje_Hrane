const Login = { template: '<login></login>' }
const Register = { template: '<register></register>' }
const Homepage = { template: '<homepage></homepage>' }

const router = new VueRouter({
	  mode: 'hash',
	  routes: [
	    { path: '/', component: Homepage},
	    { path: '/login', component: Login },
	    { path: '/register', component: Register }
	  ]
});

var app = new Vue({
	router,
	el: '#appContent'
});

