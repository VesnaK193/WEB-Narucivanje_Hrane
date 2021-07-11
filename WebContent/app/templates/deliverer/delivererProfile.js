Vue.component("deliverer-profile", {
	data: function () {
	    return {
	    	deliverer:{
	    		username:"",
	    		firstname:"",
	    		lastname:"",
	    		password:"",
	    		gender:"",
	    		birthday:""
	    	},
	    	modal_deliverer:{
	    		username:"",
	    		firstname:"",
	    		lastname:"",
	    		password:"",
	    		gender:"",
	    		birthday:""
	    	},
	    	birthdayInMS:"",
	    	errorMessage: ""
	    }
},
mounted() {
	let user = JSON.parse(localStorage.user);
	axios
	.post('rest/deliverer/getById',user)
	.then(response => {
		this.updateFormData(response.data);
	})
},
methods: {
	checkForm: function() {
		console.log(this.modal_deliverer);
		//Conver to miliseconds
		this.modal_deliverer.birthday = new Date(this.modal_deliverer.birthday).getTime();
		let s = {
				id:this.deliverer.id,
	    		birthday: this.modal_deliverer.birthday,
	    		firstname: this.modal_deliverer.firstname,
	    		gender: this.modal_deliverer.gender,
	    		lastname: this.modal_deliverer.lastname,
	    		password: this.modal_deliverer.password,
	    		username: this.modal_deliverer.username,
	    		role: this.modal_deliverer.role,
	    		
	    	};
		axios
		.post("rest/user/update", s)
		.then(response => {
			if(!response.data || response.data ==""){
				this.modal_deliverer.birthday = new Date(this.modal_deliverer.birthday).toISOString().split('T')[0];
				this.errorMessage = "Username already exists!";
			} else {
				axios
				.post("rest/deliverer/update", this.modal_deliverer)
				.then(response => {
					localStorage.user = JSON.stringify(s);
					this.updateFormData(response.data);
					$("#editDelivererModal").modal('hide');
				});
			}
		});
	},

	updateFormData: function(deliverer) {
		this.errorMessage = "";
		this.birthdayInMS=deliverer.birthday;
		this.deliverer = Object.assign({}, deliverer);
		this.deliverer.birthday = new Date(deliverer.birthday).toLocaleDateString("en-GB");
		this.modal_deliverer=Object.assign({}, deliverer);
		this.modal_deliverer.birthday = new Date(deliverer.birthday).toISOString().split('T')[0];
	},
	resetModalData: function() {
		this.errorMessage = "";
		this.modal_deliverer=Object.assign({}, this.deliverer);
		this.modal_deliverer.birthday = new Date(this.birthdayInMS).toISOString().split('T')[0];
	}
},
template: ` 
<div class="album py-3">
    <div class="container">
	  <div class="col-md-12 text-center mb-3"><h1>Profile</h1></div>
      <div class="row">
        <div class="col">
          <div class="card shadow-sm">
            <div class="card-body">
              <div class="align-items-center" style="text-align:right">
                  <button@click="resetModalData()" type="button" class="btn btn-sm btn-outline-secondary" data-bs-toggle="modal" data-bs-target="#editDelivererModal">Edit</button>
              </div>
              <p class="card-text"><span class="text-muted">Username:</span> {{deliverer.username}}</p>
              <p class="card-text"><span class="text-muted">Firstname:</span> {{deliverer.firstname}}</p>
              <p class="card-text"><span class="text-muted">Lastname:</span> {{deliverer.lastname}}</p>
              <p class="card-text"><span class="text-muted">Password:</span> {{deliverer.password}}</p>
              <p class="card-text"><span class="text-muted">Gender:</span> {{deliverer.gender}}</p>
              <p class="card-text"><span class="text-muted">Birthday:</span> {{deliverer.birthday}}</p>
            </div>
          </div>
        </div>
        </div>
        <!-- Modal -->
		<div class="modal fade" id="editDelivererModal" tabindex="-1" aria-labelledby="Modal" aria-hidden="true">
		  <div class="modal-dialog">
		    <div class="modal-content">
		      <div class="modal-header">
		        <h5 class="modal-title">Edit profile</h5>
		        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
		      </div>
		      <div class="modal-body">
		      <!--   MODAL FORM    -->
		        <div class="form-floating mb-2">
			      <input type="text" class="form-control" name="username" v-model="modal_deliverer.username" placeholder="Username">
			      <label for="floatingInput">Username</label>
			    </div>
			    <div class="form-floating mb-2">
			      <input type="text" class="form-control" name="password" v-model="modal_deliverer.password" placeholder="Password">
			      <label for="floatingPassword">Password</label>
			    </div>
			    <div class="form-floating mb-2">
			      <input type="text" class="form-control" name="firstname" v-model="modal_deliverer.firstname" placeholder="Firstname">
			      <label for="floatingInput">Firstname</label>
			    </div>
			    <div class="form-floating mb-2">
			      <input type="text" class="form-control" name="lastname" v-model="modal_deliverer.lastname" placeholder="Lastname">
			      <label for="floatingInput">Lastname</label>
			    </div>
			    <div class="form-floating mb-2">
			    <select class="form-control" id="genderSelect" name="gender" v-model="modal_deliverer.gender" placeholder="Gender">
				    <option value="Male">Male</option>
				    <option value="Female">Female</option>
			     </select>
			     <label for="floatingInput">Gender</label>
			     </div>
			    <div class="form-floating mb-2">
			      <input type="date" class="form-control" name="birthday" v-model="modal_deliverer.birthday" placeholder="Birthday">
			      <label for="floatingInput">Birthday</label>
			    </div>
		      <!--   MODAL FORM  END  -->
	    		<span class="errorMessage mr-3">{{errorMessage}}</span>
		      </div>
		      <div class="modal-footer">
		        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
		        <button type="button" class="btn btn-primary" v-on:click="checkForm()">Save</button>
		      </div>
      		</div>
		</div>
	</div>
   </div>
  </div>
 `
})