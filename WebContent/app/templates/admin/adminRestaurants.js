Vue.component("admin-restaurants", {
	data: function () {
	    return {
	    	modal_restaurant: {
	    		name: "", 
	    		type: "", 
	    		restaurantStatus:"",
	    		location: {
	    			longitude:"", 
		    		latitude:"",
		    		streetName:"", 
		    		city: "", 
		    		zipCode:"", 
		    	},
	    		logo:null, 
	    	},
    		selectedManager: {id:"",username:"",firstname:"",lastname:"",gender:"",password:"",birthday:null},
    		newManager: {username:"",firstname:"",lastname:"",gender:"",password:"",birthday:null},
	    	restaurants: null,
	    	managers: [{username:"",firstname:"",lastname:"",gender:"",password:"",birthday:null}],
			errorMessage:"",
	    }
},
mounted() {
	axios
	.get("rest/restaurant/allRestaurants")
	.then(response => {
		this.restaurants = response.data;
	});
	axios
	.get("rest/manager/allManagersWhitoutRestaurant")
	.then(response => {
		console.log(response.data.length);
		this.managers = response.data;
	});
},
methods: {
	checkForm: function () {
		if(this.isFormValid()){
			console.log("form is valid");
			var userParam, userRoute;
			if(this.isButtonExpanded()){
				//NEW MANAGER
				this.newManager.birthday = new Date(this.newManager.birthday).getTime(); 
				userParam = {
						username: this.newManager.username, 
						password: this.newManager.password, 
						firstname: this.newManager.firstname, 
						lastname: this.newManager.lastname, 
						gender: this.newManager.gender, 
						birthday: this.newManager.birthday, 
						role:"MANAGER"};
				userRoute = "register";
				
			} else {
				//SELECTED
				userParam = {
						id: this.selectedManager.id,
						username: this.selectedManager.username, 
						password: this.selectedManager.password, 
						firstname: this.selectedManager.firstname, 
						lastname: this.selectedManager.lastname, 
						gender: this.selectedManager.gender, 
						birthday: this.selectedManager.birthday, 
						role:"MANAGER"};
				userRoute = "update";
			}
			//First add user if username is unique, than add restaurant so we get restaurant with id as response
			//and write it to manager
			axios
			.post("rest/user/" + userRoute, userParam)
			.then(userResponse => {
				if(userResponse.data==""){
					this.errorMessage = "Username already exists!";
				} else {
					this.errorMessage = "";
					var restaurantParam = this.modal_restaurant;
					//Add restaurant, response Restaurant with ID
					axios
					.post("rest/restaurant/add", restaurantParam)
					.then (restaurantResponse => {
						if(restaurantResponse.data != "") {
							var managerParam = {
								id:userResponse.data.id,
								username: userResponse.data.username, 
								password: userResponse.data.password, 
								firstname: userResponse.data.firstname, 
								lastname: userResponse.data.lastname, 
								gender: userResponse.data.gender, 
								birthday: userResponse.data.birthday, 
								role:"MANAGER",
								restaurant:restaurantResponse.data,
							};
							console.log(managerParam);
							axios
							.post("rest/manager/update", managerParam)
							.then(managerResponse => {
								this.restaurants.push(this.modal_restaurant);
							});
						}
					});
				}
			});
		}
	},
	isFormValid: function() {
		//DODATI KAD SE LOGO IZMENI
		if(this.modal_restaurant.name != "" && this.modal_restaurant.type != "" && this.modal_restaurant.restaurantStatus != "" && this.modal_restaurant.location.longitude != "" 
			|| this.modal_restaurant.location.latitude != "" && this.modal_restaurant.location.streetName != "" && this.modal_restaurant.location.city != "" && this.modal_restaurant.location.zipCode != "") {
			//if new manager form is expanded, new manager fields will be used
			//if not, selected manager will be used
			if(this.isButtonExpanded()){
				//If all fields
				if(this.newManager.username!="" && this.newManager.password!="" && this.newManager.firstname!="" && this.newManager.lastname!="" 
					&& this.newManager.gender!="" && !(this.newManager.birthday=="" || this.newManager.birthday == null)){
					this.errorMessage = "";
					return true;
				}
			} else {
				if(this.selectedManager.username !=""){
					this.errorMessage = "";
					return true;
				}
			}
		} 
		this.errorMessage = "All fields are required!";
		return false;
	},
	isButtonExpanded: function() {
		let btn = $("#newManagerButton")[0].ariaExpanded;
		if(btn=="true")
			return true;
		return false;
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
			    <!-- NAME FIELD -->
		        <div class="form-floating mb-2">
			      <input type="text" class="form-control" name="name" v-model="modal_restaurant.name" placeholder="Name">
			      <label for="floatingInput">Name</label>
			    </div>
			    <!-- TYPE FIELD -->
			    <div class="form-floating mb-2">
			      <input type="text" class="form-control" name="type" v-model="modal_restaurant.type" placeholder="Type">
			      <label for="floatingInput">Type</label>
			    </div>
			    <!-- STATUS FIELD -->
			    <div class="form-floating mb-2">
			    <select class="form-control" name="restaurantStatus" v-model="modal_restaurant.restaurantStatus" placeholder="Restaurant status">
				    <option value="OPEN">Open</option>
				    <option value="CLOSE">Close</option>
			     </select>
			     <label for="floatingInput">Status</label>
			     </div>
			    <!-- LONGITUDE FIELD -->
			    <div class="form-floating mb-2">
			      <input type="text" class="form-control" name="longitude" v-model="modal_restaurant.location.longitude" placeholder="Longitude">
			      <label for="floatingInput">Longitude</label>
			    </div>
			    <!-- LATITUDE FIELD -->
			    <div class="form-floating mb-2">
			      <input type="text" class="form-control" name="latitude" v-model="modal_restaurant.location.latitude" placeholder="Latitude">
			      <label for="floatingInput">Latitude</label>
			    </div>
			    <!-- STREET FIELD -->
			    <div class="form-floating mb-2">
			      <input type="text" class="form-control" name="streetName" v-model="modal_restaurant.location.streetName" placeholder="Street name">
			      <label for="floatingInput">Street name</label>
			    </div>
			    <!-- CITY FIELD -->
			    <div class="form-floating mb-2">
			      <input type="text" class="form-control" name="city" v-model="modal_restaurant.location.city" placeholder="City">
			      <label for="floatingInput">City</label>
			    </div>
			    <!-- ZIP FIELD -->
			    <div class="form-floating mb-2">
			      <input type="text" class="form-control" name="zipCode" v-model="modal_restaurant.location.zipCode" placeholder="Zip code">
			      <label for="floatingInput">Zip code</label>
			    </div>
			    <!-- MANAGER FIELD -->
			    		<div class="form-floating mb-2">
				    		<select v-if="managers.length>0" class="form-control" name="manager" v-model="selectedManager" placeholder="Manager">
					    		<option v-for="manager in managers" :value="manager">{{manager.firstname}} {{manager.lastname}}</option>
				     		</select>
				    		<select v-if="managers.length==0" disabled class="form-control" name="manager" value="default" placeholder="Manager">
				    			<option value="default" selected="selected"> No available managers! </option>
				     		</select>
				     		<label for="floatingInput">Manager</label>
			    		</div>
			    <p>
					<div class="input-group mb-3">
						<button id="newManagerButton" class="btn btn-outline-secondary w-100" type="button" data-bs-toggle="collapse" data-bs-target="#collapseNewManager" aria-expanded="false" aria-controls="collapseNewManager">
						  New manager
						</button>
					</div>
				</p>
				<!-- NEW MANAGER COLLAPSE -->
				<div class="collapse" id="collapseNewManager">
				  	<div class="card card-body">
						<!-- USERNAME FIELD -->
					    <div class="form-floating mb-2">
					      <input type="text" class="form-control" name="username" v-model="newManager.username" placeholder="Username">
					      <label for="floatingInput">Username</label>
					    </div>
						<!-- PASSWORD FIELD -->
					    <div class="form-floating mb-2">
					      <input type="password" class="form-control" name="password" v-model="newManager.password" placeholder="Password">
					      <label for="floatingPassword">Password</label>
					    </div>
						<!-- FIRSTNAME FIELD -->
					    <div class="form-floating mb-2">
					      <input type="text" class="form-control" name="firstname" v-model="newManager.firstname" placeholder="Firstname">
					      <label for="floatingInput">Firstname</label>
					    </div>
						<!-- LASTNAME FIELD -->
					    <div class="form-floating mb-2">
					      <input type="text" class="form-control" name="lastname" v-model="newManager.lastname" placeholder="Lastname">
					      <label for="floatingInput">Lastname</label>
					    </div>
						<!-- GENDER FIELD -->
					    <div class="form-floating mb-2">
					    <select class="form-control" id="genderSelect" name="gender" v-model="newManager.gender" placeholder="Gender">
						    <option value="Male">Male</option>
						    <option value="Female">Female</option>
					     </select>
					     <label for="floatingInput">Gender</label>
					     </div>
						<!-- BIRTHDAY FIELD -->
					    <div class="form-floating mb-2">
					      <input type="date" class="form-control" name="birthday" v-model="newManager.birthday" placeholder="Birthday">
					      <label for="floatingInput">Birthday</label>
					    </div>
					</div>
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