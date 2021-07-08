Vue.component("restaurant-view-wh", {
	data: function () {
		    return {
		    	restaurant: {
		    		id: "",
		    		name: "",
		    		type: "",
		    		products: null,
		    		restaurantStatus: null,
		    		location: null,
		    		logo: ""
		    	},
		    }
	},
mounted() {
		this.restaurant.id=this.$route.params.id;
		console.log(this.restaurant);
		axios
		.post("rest/restaurant/getRestaurantById",this.restaurant )
		.then(response => {
			this.restaurant = response.data;
			console.log(this.restaurant);
		});
		},
template: ` 

<div>
	<div class="min-cover">
		<main-header></main-header> 
		<restaurant-view></restaurant-view>
	</div>
	<main-footer></main-footer> 
</div>
`
});
