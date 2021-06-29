Vue.component("user-home", {
	data: function () {
	    return {
	    	username: null,
			password: null,
			firstname: "test",
			lastname: null,
			gender: null,
			birthday: null,
	    }
},
template: ` 
	<div>User works</div>
 `,
mounted() {
	axios
	.get("rest/user/allUsers")
	.then(response => {
		this.users = fixDate(response.data);
		console.log(response.data);
	});
},
})