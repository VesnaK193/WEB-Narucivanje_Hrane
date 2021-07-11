Vue.component("my-restaurant", {
	data: function() {
		return {
	    	comments:null,
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
			axios
			.post("rest/comment/findAllApprovedByRestaurantId", this.restaurant)
			.then(response2 => {
				this.comments = response2.data;
			})
		})
	},
	methods: {
		isRestaurantEmpty: function(){
			let isEmpty = true;
			if(this.restaurant!=null){
				if(this.restaurant.id != null)
					isEmpty = false;
			}
			return isEmpty;
		},
		areCommentsEmpty: function(){
			let areEmpty = true;
			if(this.comments!=null){
				if(this.comments.length>0)
					areEmpty = false;
			}
			return areEmpty;
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
	  <!-- COMMENTS -->
	<div class="tab-pane fade products-container p-2" id="comments" role="tabpanel" aria-labelledby="comments-tab">
	  <div v-if="!areCommentsEmpty()" v-for=" comment in comments" class=" row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
        <div class="col p-2 d-flex flex-column position-static">
          <strong class="d-inline-block mb-2 text-primary">{{comment.rating}}/5</strong>
          <div class="mb-1 text-muted">{{comment.customer.firstname}} {{comment.customer.lastname}}</div>
          <p class="card-text mb-auto">{{comment.content}}</p>
        </div>
      </div>
	  <p v-if="areCommentsEmpty()" class="py-3 mx-3"> No comments</p>
	</div>
	</div>
	<h2 class="text-center" v-if="isRestaurantEmpty()">You dont have restaurant!</h2>
 </div>
 `
})