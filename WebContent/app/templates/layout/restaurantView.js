Vue.component("restaurant-view", {
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
<div class="container py-5">
	<div class="row featurette">
      <div class="col-md-7 order-md-2">
        <h2 class="featurette-heading">{{restaurant.name}} <br/><span class="text-muted">{{restaurant.type}}</span></h2>
        <p style="color:blue" class="lead">{{restaurant.restaurantStatus}}</p>
        <p class="lead" style="margin-bottom:.1rem; font-size:1.2rem">{{restaurant.location.streetName}}</p>
        <p class="lead" style="margin-bottom:.1rem; font-size:1.2rem">{{restaurant.location.city}} {{restaurant.location.zipCode}}</p>
        <p class="lead text-muted" style="font-size:1.2rem">{{restaurant.location.longitude}}, {{restaurant.location.latitude}}</p>
      </div>
      <div class="col-md-5 order-md-1">
        <img v-bind:src="restaurant.logo" class="bd-placeholder-img bd-placeholder-img-lg featurette-image img-fluid" width="500" height="500">
      </div>
    </div> 
    <hr class="featurette-divider">
    <ul class="nav nav-tabs" id="restaurantTab" role="tablist">
	  <li class="nav-item" role="presentation">
	    <button class="nav-link active" id="products-tab" data-bs-toggle="tab" data-bs-target="#products" type="button" role="tab" aria-controls="products" aria-selected="true">Products</button>
	  </li>
	  <li class="nav-item" role="presentation">
	    <button class="nav-link" id="comments-tab" data-bs-toggle="tab" data-bs-target="#comments" type="button" role="tab" aria-controls="comments" aria-selected="false">Comments</button>
	  </li>
	</ul>
	<div class="tab-content" id="restaurantTabContent">
	  <div class="tab-pane fade show active" id="products" role="tabpanel" aria-labelledby="producst-tab">Products</div>
	  <div class="tab-pane fade" id="comments" role="tabpanel" aria-labelledby="comments-tab">Comments</div>
	</div>
 </div>
`
});
