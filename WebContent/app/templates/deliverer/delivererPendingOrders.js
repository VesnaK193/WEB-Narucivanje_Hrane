Vue.component("deliverer-pending-orders", {
	data: function () {
	    return {
	    	orders:[],
			errorMessage:"",
			deliverer: null,
	    }
},
mounted() {
	axios
	.get('rest/order/getPendingOrders')
	.then(response => {
		this.orders = response.data;
		let user = JSON.parse(localStorage.user);
		axios
		.post('rest/deliverer/getById',user)
		.then(response1 => {
			this.deliverer = response1.data;
			console.log(this.deliverer);
		})
	})
},
methods: {
	acceptOrder: function(order){
		order.orderStatus = 'IN_TRANSPORT';
		this.deliverer.orders = this.deliverer.orders==null?[]:this.deliverer.orders;
		if(this.deliverer.orders.length > 0){
			this.deliverer.orders.push(order);
		} else {
			this.deliverer.orders = [order];
		}
		axios
		.post('rest/order/update', order)
		.then(response => {
			axios
			.post('rest/deliverer/update', this.deliverer)
			.then(response1 => {
				axios
				.get('rest/order/getPendingOrders')
				.then(response2 => {
					this.orders = response2.data;
				})
			})
		})
	},
	pendingOrdersEmpty: function() {
		let pendingOrders = this.orders==null?[]:this.orders;
		let isEmpty = true;
		if(pendingOrders.length > 0){
			isEmpty = false;
		} 
		return isEmpty;
	}
},
template: ` 
	<div class="container">
		<div class="row">
			<div class="col-md-12 text-center mb-3 mt-3"><h1>Pending orders</h1></div>
			<table v-if="!pendingOrdersEmpty()" class="table table-bordered bg-light" style="border-color:#607d8b">
				<thead>
				<tr style="background: rgb(108 117 125); text-align: center; color: white;border-color: rgb(69 75 80); ">
					<th>Id</th>
					<th>Products</th>
					<th>Restaurant</th>
					<th>Date</th>
					<th>Price</th>
					<th>Status</th>
					<th>Actions</th>
				</tr>
				</thead>
				<tbody>
				<tr v-for="order in orders">
					<td>{{order.id}}</td>
					<td>
					<p v-for="product in order.products">{{product.name}}</p>
					</td>
					<td>{{order.restaurant.name}}</td>
					<td>{{new Date(order.dateAndTime).toLocaleDateString("en-GB")}}</td>
					<td>{{order.price}}</td>
					<td>{{order.orderStatus}}</td>
					<td  class="text-center">
						<button type="button" class="btn btn-secondary" @click="acceptOrder(order)">Accept order</button>
					</td>
				</tr>
				</tbody>
			</table>
			<div class="w-100 py-2" v-if="pendingOrdersEmpty()" >
				<p style="text-align: center; font-size: 1.3rem;">No pendning orders at this time</p>
			</div>
		</div>
	</div>
 `
})
