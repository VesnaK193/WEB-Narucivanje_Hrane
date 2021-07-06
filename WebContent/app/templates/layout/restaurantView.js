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
        <p class="lead">{{restaurant.location.streetName}}</p>
        <p class="lead">{{restaurant.location.zipCode}} {{restaurant.location.city}}</p>
      </div>
      <div class="col-md-5 order-md-1">
        <svg class="bd-placeholder-img bd-placeholder-img-lg featurette-image img-fluid mx-auto" width="500" height="500" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: 500x500" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#eee"/><text x="50%" y="50%" fill="#aaa" dy=".3em">500x500</text></svg>

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
