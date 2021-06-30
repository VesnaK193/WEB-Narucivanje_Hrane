Vue.component("manager-home", {
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
	<div>
	<div class="min-cover">
		<main-header></main-header>
	</div>
		<main-footer></main-footer>
	</div>
 `
})