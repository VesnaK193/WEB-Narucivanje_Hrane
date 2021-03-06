Vue.component("customer-cart", {
	data: function () {
	    return {
	    	customer:{
	    		shoppingCart:{
	    			products:[],
	    			price:0
	    		}
	    	},
	    	priceWithDiscount:0,
	    }
},
mounted() {
	let user = JSON.parse(localStorage.user);
	axios
	.post("rest/customer/getById", user)
	.then(response => {
		this.customer = response.data;
		this.calculateTotal();
	})
	
	
},
methods: {
	buyFromCart: function() {
		let products = this.customer.shoppingCart.products;
		let restIdProduct = new Map();
		
		products.map(p=>{
			if(restIdProduct.has(p.restaurantId)){
				//If restaurant key already in map then use old value array
				let tempArray = restIdProduct.get(p.restaurantId);
				//And add new product to array
				tempArray.push(p);
				//[restaurantId , [Products]
				restIdProduct.set(p.restaurantId,tempArray);
			} else {
				//If restaurant key is not set, make new row with restaurant key and array with product
				restIdProduct.set(p.restaurantId,[p]);
			}
		})
		let scPrice = this.priceWithDiscount;
		this.customer.shoppingCart = null;
		this.customer.typeOfCustomer = {typeName:"",discount:0,pointsToNextType: 0};
		this.customer.numberOfPoints += scPrice/1000*133;
		if(this.customer.numberOfPoints<1000){
			this.customer.typeOfCustomer.typeName = "BRONZE";
			this.customer.typeOfCustomer.discount = 3;
			this.customer.typeOfCustomer.pointsToNextType = 1000-this.customer.numberOfPoints;
		} else if(this.customer.numberOfPoints>=1000 && this.customer.numberOfPoints<2000){
			this.customer.typeOfCustomer.typeName = "SILVER";
			this.customer.typeOfCustomer.discount = 5;
			this.customer.typeOfCustomer.pointsToNextType = 2000-this.customer.numberOfPoints;
		}else if(this.customer.numberOfPoints>=2000){
			this.customer.typeOfCustomer.typeName = "GOLD";
			this.customer.typeOfCustomer.discount = 10;
			this.customer.typeOfCustomer.pointsToNextType = 0;
		}
		axios
		.post('rest/customer/update', this.customer);

		restIdProduct.forEach((value,key)=>{
			this.updateOrder(value,key);
		})
	},
	updateOrder(value,key){
		return new Promise((resolve) =>{
			axios
			.post('rest/restaurant/getRestaurantById',{id:key})
			.then(response => {
				let restaurant = response.data;
				restaurant.products=null;
				restaurant.logo = null;
				let dateInMs = new Date();
				dateInMs = dateInMs.getTime();
				let order = {
					products: value, 
					restaurant: restaurant, 
					dateAndTime: dateInMs, 
					price: this.priceWithDiscount,
					customer: this.customer,
					orderStatus: 'PROCESSING'
				}

				axios
				.post('rest/order/update', order)
				.then(response1 => {
				})
			});
		})
	},
	shoppingCartEmpty: function() {
		let sc = this.customer.shoppingCart;
		let isEmpty = true;
		if(sc!=null){
			if(sc.products!=null)
				if(sc.products.length>0)
					isEmpty = false;
		}
		return isEmpty;
	},
	removeFromCart: function(product) {
		let index= this.customer.shoppingCart.products.indexOf(product);
		if (index > -1) {
			this.customer.shoppingCart.products.splice(index, 1);
		}
		this.customer.shoppingCart.price=0;
		this.customer.shoppingCart.products.forEach(p=>{
			this.customer.shoppingCart.price += p.price;
		})
		this.calculateTotal();
		axios
		.post('rest/customer/update', this.customer);
	},
	calculateTotal: function(){
		console.log(this.customer);
		this.priceWithDiscount = this.customer.shoppingCart.price  * ((100-(this.customer.typeOfCustomer.discount))/100);
	}
},
template: ` 
<div class="album py-3 mb-5">
   <div class="container">
	  <div class="col-md-12 text-center mb-3"><h1>Shopping cart</h1></div>
	      <div class="row">
	        <div class="col">
	          <div class="card shadow-sm">
	            <div class="card-body">
	            	<div v-if="!shoppingCartEmpty()">
		            	<table>
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
								<tr style="border-bottom: 1px solid rgba(0,0,0,10%)" v-for="product in customer.shoppingCart.products">
						  			<td class="text-center px-3 py-2" style="width:5%"><img v-if="product.image!=''" v-bind:src="product.image" alt="" width="40" height="40"></td>
									<td class=" py-2" style="width:15%">{{product.name}}</td>
									<td class=" py-2" style="width:40%">{{product.description}}</td>
									<td class=" py-2" style="width:10%">{{product.price}} rsd</td>
									<td class=" py-2" style="width:10%">
									<button class="btn btn-danger" @click="removeFromCart(product)">Remove</button>
									</td>
								</tr>
							 </tbody>
						  </table>
						  <hr>
					      <div class="w-100 py-2">
					      	<p style="text-align:right; font-size: 1.3rem;">Price: {{customer.shoppingCart.price}} RSD</p>
					      	<p style="text-align:right; font-size: 1.3rem;">Discount: {{customer.typeOfCustomer.discount}} % </p>
					      	<hr>
					      	<p style="text-align:right; font-size: 1.3rem;">Total: {{priceWithDiscount}} RSD</p>
					      </div>
					  </div>
					  <p class="py-3 mx-3" v-if="shoppingCartEmpty()"> No products in shopping cart</p>
	            </div>
	            <div class="card-footer" style="text-align:right">
					<button v-if="shoppingCartEmpty()" disabled class="btn btn-primary" @click="buyFromCart" type="button">Purchase</button>
	            	<button v-if="!shoppingCartEmpty()" class="btn btn-primary" @click="buyFromCart" type="button">Purchase</button>
	            </div>
	          </div>
	        </div>
	      </div>
         <!-- Modal -->
	   </div>
   </div>
</div>
 `
});