Vue.component("customer-cart", {
	data: function () {
	    return {
	    	customer:{
	    		shoppingCart:{
	    			products:[],
	    			price:0
	    		}
	    	}
	    }
},
mounted() {
	let user = JSON.parse(localStorage.user);
	axios
	.post("rest/customer/getById", user)
	.then(response => {
		this.customer = response.data;
	})
	
	
},
methods: {
	buyFromCart: function(){
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
		console.log(restIdProduct);
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
	            	<div v-if="customer.shoppingCart.products!=null">
		            	<table>
						  	<thead>
								<tr style="border-bottom: 1px solid rgba(0,0,0,10%)">
									<th></th>
									<th class=" py-1">Name</th>
									<th class=" py-1">Description</th>
									<th class=" py-1">Price</th>
								</tr>
							</thead>
							<tbody>
								<tr style="border-bottom: 1px solid rgba(0,0,0,10%)" v-for="product in customer.shoppingCart.products">
						  			<td class="text-center px-3 py-2" style="width:5%"><img v-if="product.image!=''" v-bind:src="product.image" alt="" width="40" height="40"></td>
									<td class=" py-2" style="width:15%">{{product.name}}</td>
									<td class=" py-2" style="width:50%">{{product.description}}</td>
									<td class=" py-2" style="width:10%">{{product.price}} rsd</td>
								</tr>
							 </tbody>
						  </table>
					      <div class="w-100 py-2">
					      	<p style="text-align:right; font-size: 1.3rem;">Total: {{customer.shoppingCart.price}} RSD</p>
					      </div>
					  </div>
					  <p class="py-3 mx-3" v-if="customer.shoppingCart.products==null"> No products in shopping cart</p>
	            </div>
	            <div class="card-footer" style="text-align:right">
					  <button class="btn btn-primary" @click="buyFromCart" type="button">Purchase</button>
	            </div>
	          </div>
	        </div>
	      </div>
         <!-- Modal -->
	   </div>
   </div>
</div>
 `
})