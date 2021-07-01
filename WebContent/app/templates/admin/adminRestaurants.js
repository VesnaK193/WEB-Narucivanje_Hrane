Vue.component("admin-restaurants", {
	data: function () {
	    return {
	    	modal_name: "",
	    	modal_type: "",
	    	modal_restaurantStatus: "",
	    	modal_longitude: "",
	    	modal_latitude: "",
	    	modal_streetName: "",
	    	modal_city: "",
	    	modal_zipCode: "",
	    	modal_logo: null,
	    	restaurants: null,
			errorMessage:"",
	    }
},
mounted() {
	axios
	.get("rest/restaurant/allRestaurants")
	.then(response => {
		this.restaurants = response.data;
	});
},
methods: {
	checkForm: function () {
		if(this.modal_name == "" || this.modal_type == "" || this.modal_restaurantStatus == "" || this.modal_longitude == "" || this.modal_latitude == "" || this.modal_streetName == "" || this.modal_city == "" || this.modal_zipCode == "" || this.modal_logo == ""){
			this.errorMessage = "All fields are required!";
		} else {
			this.errorMessage = "";
			var s = {name: this.modal_name, type: this.modal_type, restaurantStatus: this.modal_restaurantStatus, location: {longitude: this.modal_longitude, latitude: this.modal_latitude, streetName: this.modal_streetName, city: this.modal_city, zipCode: this.modal_zipCode}, logo:this.modal_logo};
//			//If user with this username exist return data will be null
			
			axios
			.post("rest/restaurant/add", s)
			.then(response => {
				if(response.data!=""){
					this.errorMessage = "";
					axios
					.get("rest/restaurant/allRestaurants")
					.then(response => {
						this.restaurants = response.data;
					});
					$("#addRestaurantModal").modal('hide');
				}
			});
		}
	}

},
template: ` 
	<div class="container">
		<div class="row">
			<div class="col-md-12 text-center mb-3 mt-3"><h1>Restaurants</h1></div>
			<!-- Button trigger add modal -->
			<button type="button" style="font-weight: 700;" class="btn btn-primary mb-3 offset-md-10 col-md-2" data-bs-toggle="modal" data-bs-target="#addRestaurantModal">
			  Add
			</button>
			<table class="table table-bordered bg-light" style="border-color:#607d8b">
				<thead>
				<tr style="background: #0d6efd; text-align: center; color: white;border-color: #0e4494;">
					<th>Name</th>
					<th>Type</th>
					<th>Status</th>
					<th>Longitude</th>
					<th>Latitude</th>
					<th>Location</th>
					<th>Logo</th>
				</tr>
				</thead>
				<tbody>
				<tr v-for="restaurant in restaurants">
					<td>{{restaurant.name}}</td>
					<td>{{restaurant.type}}</td>
					<td>{{restaurant.restaurantStatus}}</td>
					<td>{{restaurant.location.longitude}}</td>
					<td>{{restaurant.location.latitude}}</td>
					<td>{{restaurant.location.streetName}}, {{restaurant.location.city}} {{restaurant.location.zipCode}}</td>
					<td>{{restaurant.logo}}</td>
				</tr>
				</tbody>
			</table>
		</div>
		<!-- Modal -->
		<div class="modal fade" id="addRestaurantModal" tabindex="-1" aria-labelledby="Modal" aria-hidden="true">
		  <div class="modal-dialog">
		    <div class="modal-content">
		      <div class="modal-header">
		        <h5 class="modal-title">Add restaurant</h5>
		        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
		      </div>
		      <div class="modal-body">
		      <!--   MODAL FORM    -->
		        <div class="form-floating mb-2">
			      <input type="text" class="form-control" name="name" v-model="modal_name" placeholder="Name">
			      <label for="floatingInput">Name</label>
			    </div>
			    <div class="form-floating mb-2">
			      <input type="text" class="form-control" name="type" v-model="modal_type" placeholder="Type">
			      <label for="floatingInput">Type</label>
			    </div>
			    <div class="form-floating mb-2">
			    <select class="form-control" name="restaurantStatus" v-model="modal_restaurantStatus" placeholder="Restaurant status">
				    <option value="OPEN">Open</option>
				    <option value="CLOSE">Close</option>
			     </select>
			     <label for="floatingInput">Restaurant status</label>
			     </div>
			    <div class="form-floating mb-2">
			      <input type="text" class="form-control" name="longitude" v-model="modal_longitude" placeholder="Longitude">
			      <label for="floatingInput">Longitude</label>
			    </div>
			    <div class="form-floating mb-2">
			      <input type="text" class="form-control" name="latitude" v-model="modal_latitude" placeholder="Latitude">
			      <label for="floatingInput">Latitude</label>
			    </div>
			    <div class="form-floating mb-2">
			      <input type="text" class="form-control" name="streetName" v-model="modal_streetName" placeholder="Street name">
			      <label for="floatingInput">Street name</label>
			    </div>
			    <div class="form-floating mb-2">
			      <input type="text" class="form-control" name="city" v-model="modal_city" placeholder="City">
			      <label for="floatingInput">City</label>
			    </div>
			    <div class="form-floating mb-2">
			      <input type="text" class="form-control" name="zipCode" v-model="modal_zipCode" placeholder="Zip code">
			      <label for="floatingInput">Zip code</label>
			    </div>
		      <!--   MODAL FORM  END  -->
	    		<span class="errorMessage mr-3">{{errorMessage}}</span>
		      </div>
		      <div class="modal-footer">
		        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
		        <button type="button" class="btn btn-primary" v-on:click="checkForm()">Add</button>
		      </div>
		    </div>
		  </div>
		</div>
	</div>
 `
})