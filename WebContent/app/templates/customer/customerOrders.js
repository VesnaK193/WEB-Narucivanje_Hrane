Vue.component("customer-orders", {
	data: function () {
	    return {
	    	orders:[],
			errorMessage:"",
			user: null,
			comment: {
				content:"",
				rating:5,
				
			},
			errorMessage:"",
			currentOrder:null,
			customer:null
	    }
},
mounted() {
	this.user = JSON.parse(localStorage.user);
	axios
	.post("rest/order/findAllByUserId", this.user)
	.then(response => {
		this.orders = response.data;
		axios
		.post("rest/customer/getById", this.user)
		.then(response1 => {
			this.customer = response1.data;
		});
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
	},
	addComment: function() {
		if(this.comment.content==""){
			this.errorMessage="Please enter comment message";
		} else {
			this.errorMessage="";
			this.comment.restaurant = this.currentOrder.restaurant;
			this.comment.customer = this.currentOrder.customer;
			this.currentOrder.commented = true;
			axios
			.post('rest/order/update', this.currentOrder)
			.then(response => {
				axios
				.post('rest/comment/add',this.comment);
				$('#commentModal').modal('hide');
			})
		}
	},
	cancelOrder: function(order){
		order.orderStatus = "CANCELED";
		axios
		.post('rest/order/update', order)
		.then(response =>{
			this.customer.typeOfCustomer = {typeName:"",discount:0,pointsToNextType: 0};
			this.customer.numberOfPoints -= order.price/1000*133*4;
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
		})
	},
	setCurrentOrder: function(order){
		this.currentOrder = order;
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
					<th class="p-0"></th>
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
					<td  class="text-center p-0">
						<button @click="setCurrentOrder(order)" type="button" v-if="!order.commented && order.orderStatus=='DELIVERED'" data-bs-toggle="modal" data-bs-target="#commentModal" class="btn btn-secondary mt-2">Rate</button>
						<button @click="cancelOrder(order)" type="button" v-if="order.orderStatus=='PROCESSING'" class="btn btn-danger mt-2">Cancel</button>
						<p v-if="order.commented && order.orderStatus=='DELIVERED'" class="mt-2">Rated</p>
					</td>
				</tr>
				</tbody>
			</table>
		 	<h2 class="my-5 w-100 text-center" v-if="areOrdersEmpty()">You have no orders</h2>
      </div>
      <!-- comment modal -->
      <div class="modal fade" id="commentModal" tabindex="-1" aria-labelledby="Modal" aria-hidden="true">
		  <div class="modal-dialog">
		    <div class="modal-content">
		      <div class="modal-header">
		        <h5 class="modal-title">Rate restaurant</h5>
		        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
		      </div>
		      <div class="modal-body">
			      <!--   MODAL FORM    -->
				<div class="mb-3">
				  <label for="commentContent" class="form-label">Comment</label>
				  <textarea class="form-control" id="commentContent" v-model="comment.content" rows="3"></textarea>
				</div>
				<label for="rating" class="form-label">Rating: {{comment.rating}}</label>
				<input type="range" class="form-range" min="1" max="5" v-model="comment.rating" id="rating">
			   <div class="modal-footer">
			   <p style="width: 100%; text-align: right; color: red;">{{errorMessage}}</p>
			        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" >Close</button>
			        <button type="button" class="btn btn-primary" v-on:click="addComment()">Add</button>
			   </div>
      		</div>
		</div>
		</div>
	</div>
	</div>
 `
})
