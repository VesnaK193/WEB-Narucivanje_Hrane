Vue.component("admin-managers", {
	data: function () {
	    return {
	    	modal_username: "",
	    	modal_password: "",
	    	modal_firstname: "",
	    	modal_lastname: "",
	    	modal_gender: "",
	    	modal_birthday: null,
	    	managers:null,
			errorMessage:"",
	    }
},
mounted() {
	axios
	.get("rest/manager/allManagers")
	.then(response => {
		this.managers = response.data;
	});
},
methods: {
	checkForm: function () {
		if(this.modal_username == "" || this.modal_password == "" || this.modal_firstname == "" || this.modal_lastname == "" || this.modal_gender == "" || this.modal_birthday == null || this.modal_birthday == ""){
			this.errorMessage = "All fields are required!";
		} else {
			this.errorMessage = "";
			var birthdayInMS = new Date(this.modal_birthday).getTime();
			var s = {username:this.modal_username, password:this.modal_password, firstname:this.modal_firstname, lastname:this.modal_lastname, gender:this.modal_gender, birthday:birthdayInMS, role:"MANAGER"};
//			//If user with this username exist return data will be null
			
			axios
			.post("rest/user/register", s)
			.then(response => {
				if(response.data==""){
					this.errorMessage = "Username already exists!";
				} else {
					this.errorMessage = "";
					s.id=response.data.id;
					axios
					.post("rest/manager/add", s)
					.then(responseAdd => {
						axios
						.get("rest/manager/allManagers")
						.then(responseAllManagers => {
							this.managers = responseAllManagers.data;
							$("#addManagerModal").modal('hide');
						});
					});
				}
			});
		}
	},

resetForm: function() {
	this.modal_username = "";
	this.modal_password= "";
	this.modal_firstname= "";
	this.modal_lastname= "";
	this.modal_gender= "";
	this.modal_birthday= null;
	this.errorMessage="";
}

},
template: ` 
	<div class="container">
		<div class="row">
			<div class="col-md-12 text-center mb-3 mt-3"><h1>Managers</h1></div>
			<!-- Button trigger add modal -->
			<button type="button" style="font-weight: 700;" class="btn btn-primary mb-3 offset-md-10 col-md-2" @click="resetForm" data-bs-toggle="modal" data-bs-target="#addManagerModal">
			  Add
			</button>
			<table class="table table-bordered bg-light" style="border-color:#607d8b">
				<thead>
				<tr style="background: #0d6efd; text-align: center; color: white;border-color: #0e4494;">
					<th>Fullname</th>
					<th>Username</th>
					<th>Password</th>
					<th>Gender</th>
					<th>Birthday</th>
					<th>Restaurant</th>
				</tr>
				</thead>
				<tbody>
				<tr v-for="manager in managers">
					<td>{{manager.firstname}} {{manager.lastname}}</td>
					<td>{{manager.username}}</td>
					<td>{{manager.password}}</td>
					<td>{{manager.gender}}</td>
					<td>{{manager.birthday}}</td>
					<td>{{manager.restaurant?manager.restaurant.name:""}}</td>
				</tr>
				</tbody>
			</table>
		</div>
		<!-- Modal -->
		<div class="modal fade" id="addManagerModal" tabindex="-1" aria-labelledby="Modal" aria-hidden="true">
		  <div class="modal-dialog">
		    <div class="modal-content">
		      <div class="modal-header">
		        <h5 class="modal-title">Add manager</h5>
		        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
		      </div>
		      <div class="modal-body">
		      <!--   MODAL FORM    -->
		        <div class="form-floating mb-2">
			      <input type="text" class="form-control" name="username" v-model="modal_username" placeholder="Username">
			      <label for="floatingInput">Username</label>
			    </div>
			    <div class="form-floating mb-2">
			      <input type="password" class="form-control" name="password" v-model="modal_password" placeholder="Password">
			      <label for="floatingPassword">Password</label>
			    </div>
			    <div class="form-floating mb-2">
			      <input type="text" class="form-control" name="firstname" v-model="modal_firstname" placeholder="Firstname">
			      <label for="floatingInput">Firstname</label>
			    </div>
			    <div class="form-floating mb-2">
			      <input type="text" class="form-control" name="lastname" v-model="modal_lastname" placeholder="Lastname">
			      <label for="floatingInput">Lastname</label>
			    </div>
			    <div class="form-floating mb-2">
			    <select class="form-control" id="genderSelect" name="gender" v-model="modal_gender" placeholder="Gender">
				    <option value="Male">Male</option>
				    <option value="Female">Female</option>
			     </select>
			     <label for="floatingInput">Gender</label>
			     </div>
			    <div class="form-floating mb-2">
			      <input type="date" class="form-control" name="birthday" v-model="modal_birthday" placeholder="Birthday">
			      <label for="floatingInput">Birthday</label>
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