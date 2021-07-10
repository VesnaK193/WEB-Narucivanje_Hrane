Vue.component("customer-orders", {
	data: function () {
	    return {
	    	orders:[],
			errorMessage:"",
	    }
},
mounted() {
	let user = JSON.parse(localStorage.user);
	axios
	.post("rest/order/findAllByUserId", user)
	.then(response => {
		this.orders = response.data;
	});
},
template: ` 
	<div class="container">
		<div class="row">
			<div class="col-md-12 text-center mb-3 mt-3"><h1>Customers</h1></div>
			<!-- Button trigger add modal -->
			<table class="table table-bordered bg-light" style="border-color:#607d8b">
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
		</div>
	</div>
 `
})
