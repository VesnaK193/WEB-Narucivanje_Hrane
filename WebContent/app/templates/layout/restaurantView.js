Vue.component("restaurant-view", {
	data: function () {
		    return {
		    	comments:null,
		    	restaurant: {
		    		id: "",
		    		name: "",
		    		type: "",
		    		products: [],
		    		restaurantStatus: null,
		    		location: {
		    			streetName: "",
		    			zipCode: "",
		    			city: "",
		    			longitude: "",
		    			latitude: ""
		    		},
		    		logo: ""
		    	},
		    	customerRole:false,
		    	quantity:1,
		    	currentProduct: {
		    		name:"",
		    		price:"",
		    		description:"",
		    		image:"",
		    	},
		    	currentCustomer:null,
	    		shoppingCart:{
	    			products:[],
	    			price:"",
	    		}
		    }
	},
mounted() {
		this.restaurant.id=this.$route.params.id;
		
		axios
		.post("rest/restaurant/getRestaurantById",this.restaurant )
		.then(response => {
			this.restaurant = response.data;

			axios
			.post("rest/comment/findAllApprovedByRestaurantId", this.restaurant)
			.then(response2 => {
				this.comments = response2.data;
				if(localStorage.user!="" && localStorage.user != "undefined"){
					let user = JSON.parse(localStorage.user);
					if(user.role=="CUSTOMER"){
						this.customerRole = true;
					}
					axios
					.post("rest/customer/getById", user)
					.then(response1 => {
						this.currentCustomer = response1.data;
					})
				}
			})
		});
		},
methods: {
	addToCart: function(){
		for(let i=0;i<this.quantity;i++){
			if(this.currentCustomer.shoppingCart==null){
				this.currentCustomer.shoppingCart = Object.assign({}, this.shoppingCart);
				this.currentCustomer.shoppingCart.products = [this.currentProduct];
			} else {
				this.currentCustomer.shoppingCart.products.push(this.currentProduct);
			}
		}
		//Calculate total price
		this.currentCustomer.shoppingCart.price = 0;
		this.currentCustomer.shoppingCart.products.forEach(prod=>{
			this.currentCustomer.shoppingCart.price += prod.price;
		})
		axios
		.post('rest/customer/update',this.currentCustomer)
		.then(response => {
			$('#productQuantityModal').modal('hide');
		})
	},
	changeCurrentProduct: function(product){
		this.currentProduct= product;
		this.quantity = 1;
	},
	addAvailable: function(){
		if(this.restaurant.restaurantStatus=='OPEN' && this.customerRole )
			return true;
		return false;
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
	<div class="tab-pane fade active show products-container" id="products" role="tabpanel" aria-labelledby="products-tab">
	 <table v-if="restaurant.products!=null">
	  	<thead>
			<tr style="border-bottom: 1px solid rgba(0,0,0,10%)">
				<th></th>
				<th class=" py-1">Name</th>
				<th class=" py-1">Description</th>
				<th class=" py-1">Price</th>
				<th class=" py-1"></th>
			</tr>
		</thead>
		<tbody>
			<tr style="border-bottom: 1px solid rgba(0,0,0,10%)" v-for="product in restaurant.products">
	  			<td class="text-center px-3 py-2" style="width:5%"><img v-if="product.image!=''" v-bind:src="product.image" alt="" width="40" height="40"></td>
				<td class=" py-2" style="width:15%">{{product.name}}</td>
				<td class=" py-2" style="width:50%">{{product.description}}</td>
				<td class=" py-2" style="width:10%">{{product.price}} rsd</td>
				<td class=" py-1" style="text-align:right; width:15%">
					<button v-if="addAvailable()" type="button" data-bs-toggle="modal" @click="changeCurrentProduct(product)" data-bs-target="#productQuantityModal" class="btn btn-secondary mx-2">Add to cart</button>
				</td>
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
	
	<!-- Quantity modal -->
	<div class="modal fade" id="productQuantityModal" tabindex="-1" aria-labelledby="Modal" aria-hidden="true">
		  <div class="modal-dialog">
		    <div class="modal-content">
		      <div class="modal-header">
		        <h5 class="modal-title">Add to cart</h5>
		        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
		      </div>
		      <div class="modal-body">
		      <!-- Product preview -->
			      <div class="row pb-4 g-0 border-bottom overflow-hidden flex-md-row mb-4 h-md-250 position-relative">
			        <div class="col-auto d-none d-lg-block">
			          <img v-bind:src="currentProduct.image" class="bd-placeholder-img" width="200" height="250">
      				</div>
			        <div class="col p-4 d-flex flex-column position-static">
			          <p class="d-inline-block mb-2 text-primary" style="font-size:1.3rem !important">{{currentProduct.price}} RSD</p>
			          <p class="mb-0" style="font-size:1.3rem !important">{{currentProduct.name}}</p>
			          <p class="card-text mb-auto">{{currentProduct.description}}</p>
			         </div>
			      </div>
			      <!--   MODAL FORM    -->
				    <label for="quantity" class="form-label">Quantity: {{quantity}}</label>
					<input type="range" class="form-range" min="1" max="10" v-model="quantity" id="quantity">
			      <!--   MODAL FORM  END  -->
			      <div class="border-bottom w-100 mb-2 pt-2">
			      </div>
			      <div class="w-100 py-2">
			      	<p style="text-align:right; font-size: 1.3rem;">Total: {{currentProduct.price*quantity}} RSD</p>
			      </div>
			      </div>
			      <div class="modal-footer">
			        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" >Close</button>
			        <button type="button" class="btn btn-primary" v-on:click="addToCart()">Add</button>
			      </div>
      		</div>
		</div>
	</div>
 </div>
`
});
