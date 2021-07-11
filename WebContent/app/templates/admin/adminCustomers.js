Vue.component("admin-customers", {
	data: function () {
	    return {
	    	customers:{
	    		username:"",
	    		firstname:"",
	    		lastname:"",
	    		password:"",
	    		gender:"",
	    		birthday:"",
	    		numberOfPoints:0,
	    		typeOfCustomer:{
	    			typeName:""
	    		}
	    	},
			errorMessage:"",
	    }
},
mounted() {
	axios
	.get("rest/customer/all")
	.then(response => {
		this.customers = response.data;
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
					<th>Fullname</th>
					<th>Username</th>
					<th>Password</th>
					<th>Gender</th>
					<th>Birthday</th>
					<th>Points</th>
					<th>Type</th>
				</tr>
				</thead>
				<tbody>
				<tr v-for="customer in customers">
					<td>{{customer.firstname}} {{customer.lastname}}</td>
					<td>{{customer.username}}</td>
					<td>{{customer.password}}</td>
					<td>{{customer.gender}}</td>
					<td>{{new Date(customer.birthday).toLocaleDateString("en-GB")}}</td>
					<td>{{customer.numberOfPoints}}</td>
					<td>{{customer.typeOfCustomer?customer.typeOfCustomer.typeName:""}}</td>
				</tr>
				</tbody>
			</table>
		</div>
	</div>
 `
})
