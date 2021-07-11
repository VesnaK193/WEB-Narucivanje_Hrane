Vue.component("deliverer-orders", {
	data: function () {
	    return {
	    	orders:[],
	    	deliverer:null,
			errorMessage:"",
	    }
},
mounted() {
	let user = JSON.parse(localStorage.user);
	axios
	.post('rest/deliverer/getById',user)
	.then(response1 => {
		this.deliverer = response1.data;
		this.orders = this.deliverer.orders;
	})
},
methods: {
	orderDelivered: function(order){
		order.orderStatus = 'DELIVERED';
		this.deliverer.orders.forEach(o => {
			if(o.id == order.id)
				o.orderStatus = 'DELIVERED';
		})
		axios
		.post('rest/order/update', order)
		.then(response => {
			axios
			.post('rest/deliverer/update', this.deliverer);
		})
	},
	areOrdersEmpty: function(){
		let areEmpty = true;
		if(this.orders!=null){
			if(this.orders.length>0)
				areEmpty = false;
		}
		return areEmpty;
	}
},
template: ` 
	<div class="container">
		<div class="row">
			<div class="col-md-12 text-center mb-3 mt-3"><h1>My orders</h1></div>
			<table v-if="!areOrdersEmpty()" class="table table-bordered bg-light" style="border-color:#607d8b">
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
					<td>{{order.dateAndTime}}</td>
					<td>{{order.price}}</td>
					<td>{{order.orderStatus}}</td>
					<td  class="text-center">
						<button type="button" v-if="order.orderStatus=='IN_TRANSPORT'" class="btn btn-secondary" @click="orderDelivered(order)">Delivered</button>
					</td>
				</tr>
				</tbody>
			</table>
		<p class="py-3 text-center" v-if="areOrdersEmpty()"> No orders at the moment</p>
		</div>
	</div>
 `
})
