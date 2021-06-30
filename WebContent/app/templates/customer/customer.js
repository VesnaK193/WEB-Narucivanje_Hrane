Vue.component("customer", {
	data: function () {
		    return {
		      products: null
		    }
	},
	template: ` 
<div>
	<div class="min-cover">
		<main-header></main-header> 
		<router-view></router-view>
	</div>
	<main-footer></main-footer> 
</div>
`
});