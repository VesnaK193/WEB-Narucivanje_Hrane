Vue.component("homepage", {
	data: function () {
		    return {
		      products: null
		    }
	},
	template: ` 
<div>
	<div class="min-cover">
		<main-header></main-header> 
		<restaurants></restaurants>
	</div>
	<main-footer></main-footer> 
</div>
`
});