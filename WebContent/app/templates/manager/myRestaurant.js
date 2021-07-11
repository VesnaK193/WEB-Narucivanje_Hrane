Vue.component("my-restaurant", {
	data: function() {
		return {
			restaurant: {
				id: "",
				name: "",
				type: "",
				products: "",
				restaurantStatus: "",
				location: {
					longitude: "",
					latitude: "",
					streetName: "",
					city: "",
					zipCode: ""
				},
				logo: "",
			}
			
		}
	},
mounted () {
		let u = JSON.parse(localStorage.user);
		axios
		.post("rest/manager/getById",u)
		.then(response => {
			this.restaurant = response.data.restaurant;
			console.log(this.restaurant);
		})
	},
	methods: {
		isRestaurantEmpty: function(){
			let isEmpty = true;
			if(this.restaurant!=null){
				if(this.restaurant.id !="" && this.restaurant.id != null)
					isEmpty = false;
			}
			return isEmpty;
		}
	},
template: `
<div class="container py-5">
	<div v-if="!isRestaurantEmpty()" >
	<div class="row featurette">
      <div class="col-md-7 order-md-2">
        <h2 class="featurette-heading">{{restaurant.name}} <br/><span class="text-muted">{{restaurant.type}}</span></h2>
        <p style="color:blue" class="lead">{{restaurant.restaurantStatus}}</p>
        <p class="lead">{{restaurant.location.streetName}}</p>
        <p class="lead">{{restaurant.location.zipCode}} {{restaurant.location.city}}</p>
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
	<div class="tab-pane fade active show products-container" id="products" role="tabpanel" aria-labelledby="products-tab">
	  <table class="w-100" v-if="restaurant.products!=null">
	  	<thead>
			<tr style="border-bottom: 1px solid rgba(0,0,0,10%)">
				<th></th>
				<th class="px-5 py-1">Name</th>
				<th class="px-5 py-1">Description</th>
				<th class="px-5 py-1">Price</th>
			</tr>
		</thead>
		<tbody>
			<tr style="border-bottom: 1px solid rgba(0,0,0,10%)" class="py-2" v-for="product in restaurant.products">
	  			<td class="text-center px-3 py-2"><img v-if="product.image!=''" v-bind:src="product.image" alt="" width="40" height="40"></td>
				<td class="px-5 py-2">{{product.name}}</td>
				<td class="px-5 py-2">{{product.description}}</td>
				<td class="px-5 py-2">{{product.price}}</td>
			</tr>
		</tbody>
	  </table>
	  <p class="py-3 mx-3" v-if="restaurant.products==null"> No available products</p>
	</div>
	  <div class="tab-pane fade products-container" id="comments" role="tabpanel" aria-labelledby="comments-tab">Comments</div>
	</div>
	</div>
	<h2 class="text-center" v-if="isRestaurantEmpty()">You dont have restaurant!</h2>
 </div>
 `
})