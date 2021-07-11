Vue.component("manager-orders", {
	data: function () {
	    return {
	    	orders:[],
			errorMessage:"",
	    }
},
mounted() {
	let user = JSON.parse(localStorage.user);
	axios
	.post("rest/manager/getById", user)
	.then(response => {
		axios
		.post("rest/order/findAllByRestaurantId", response.data.restaurant)
		.then(response1 => {
			this.orders=response1.data;
		});
		
	});
},
methods: {
	orderInPreparation: function(order){
		order.orderStatus = 'IN_PREPARATION';
		axios
		.post('rest/order/update', order)
		.then(response => {
			console.log(response.data);
		})
	},
	orderWaitingForDeliverer: function(order){
		order.orderStatus = 'WAITING_FOR_DELIVERER';
		axios
		.post('rest/order/update', order)
		.then(response => {
			console.log(response.data);
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
			<div class="col-md-12 text-center mb-3 mt-3"><h1>Orders</h1></div>
			<!-- Button trigger add modal -->
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
						<button type="button" v-if="order.orderStatus=='PROCESSING'" class="btn btn-secondary" @click="orderInPreparation(order)">In preparation</button>
						<button type="button" v-if="order.orderStatus=='IN_PREPARATION'" class="btn btn-secondary" @click="orderWaitingForDeliverer(order)">Waiting for deliverer</button>
					</td>
				</tr>
				</tbody>
			</table>
			<p class="py-3 text-center" v-if="areOrdersEmpty()"> No orders at the moment</p>
		</div>
	</div>
 `
})
