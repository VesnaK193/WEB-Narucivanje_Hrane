Vue.component("manager-customers", {
	data: function () {
	    return {
	    	customers:[]
	    }
},
mounted() {
	let user = JSON.parse(localStorage.user);
	axios
	.post("rest/manager/getById", user)
	.then(response => {
		axios
		.post("rest/order/getAllCustomersThatOrderedInRestaurant", response.data.restaurant)
		.then(response1 => {
			this.customers=response1.data;
		});
		
	});
},
methods: {
	areCustomersEmpty: function(){
		let areEmpty = true;
		if(this.customers!=null){
			if(this.customers.length>0)
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
			<table v-if="!areCustomersEmpty()" class="table table-bordered bg-light" style="border-color:#607d8b">
				<thead>
				<tr style="background: rgb(108 117 125); text-align: center; color: white;border-color: rgb(69 75 80); ">
					<th>Username</th>
					<th>Firstname</th>
					<th>Lastname</th>
					<th>Gender</th>
					<th>Birthday</th>
				</tr>
				</thead>
				<tbody>
				<tr v-for="customer in customers">
					<td>{{customer.username}}</td>
					<td>{{customer.firstname}}</td>
					<td>{{customer.lastname}}</td>
					<td>{{customer.gender}}</td>
					<td>{{new Date(customer.birthday).toLocaleDateString("en-GB")}}</td>
				</tr>
				</tbody>
			</table>
			<p class="py-3 text-center" v-if="areCustomersEmpty()"> No customers at the moment</p>
		</div>
	</div>
 `
})
