Vue.component("customer-orders", {
	data: function () {
	    return {
	    	orders:[],
			errorMessage:"",
			user: null,
	    }
},
mounted() {
	this.user = JSON.parse(localStorage.user);
	axios
	.post("rest/order/findAllByUserId", this.user)
	.then(response => {
		this.orders = response.data;
	});
},
methods: {
	areOrdersEmpty: function() {
		let areEmpty = true;
		if(this.orders!=null){
			if(this.orders.length>0)
				areEmpty = false;
		}
		return areEmpty;
	},
	refreshOrders: function() {
		axios
		.post("rest/order/findAllByUserId", this.user)
		.then(response => {
			this.orders = response.data;
		});
	},
	undevileredOrders: function() {
		axios
		.post('rest/order/getNotDeliveredOrdersByUserId',this.user)
		.then(response => {
			this.orders = response.data;
		});
	}
},
template: ` 
	<div class="container">
		<div class="row">
			<div v-if="!areOrdersEmpty()" class="col-md-12 text-center mb-3 mt-3"><h1>Orders</h1></div>
				<button @click="refreshOrders()" type="button" style="font-weight: 700; display:inline" class="btn btn-primary mb-3 col-md-2" data-bs-toggle="modal" data-bs-target="#addDelivererModal">
				  Refresh
				</button>
				<div style="text-align:right"  class="col-md-10">
					<button @click="undevileredOrders()"  type="button" style="font-weight: 700; display:inline; text-align:right" class="btn btn-outline-secondary mb-3" data-bs-toggle="modal" data-bs-target="#addDelivererModal">
					  Show undelivered orders
					</button>
				</div>
			<table v-if="!areOrdersEmpty()" class="table table-bordered bg-light" style="border-color:#607d8b">
				<thead>
				<tr style="background: #0d6efd; text-align: center; color: white;border-color: #0e4494;">
					<th>Id</th>
					<th>Products</th>
					<th>Restaurant</th>
					<th>Date</th>
					<th>Price</th>
					<th>Status</th>
				</tr>
				</thead>
				<tbody>
				<tr v-for="order in orders">
					<td>{{order.id}}</td>
					<td>
					<p v-for="product in order.products">{{product.name}}</p>
					</td>
					<td>{{order.restaurant.name}}</td>
					<td>{{order.dateAndTime}}</td>
					<td>{{order.price}}</td>
					<td>{{order.orderStatus}}</td>
				</tr>
				</tbody>
			</table>
		 	<h2 class="my-5 w-100 text-center" v-if="areOrdersEmpty()">You have no orders</h2>
      </div>
	</div>
 `
})
