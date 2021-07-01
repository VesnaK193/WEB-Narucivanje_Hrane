Vue.component("admin-profile", {
	data: function () {
	    return {
	    	user:null,
	    	modal_user:null,
	    	errorMessage: ""
	    }
},
mounted() {
	let userString = localStorage.user?localStorage.user:"";
	if(userString !=""){
		this.updateFormData();
	}
},
methods: {
	checkForm: function() {
		console.log(this.modal_user);
		//Conver to miliseconds
		this.modal_user.birthday = new Date(this.modal_user.birthday).getTime();
		axios
		.post("rest/user/update", this.modal_user)
		.then(response => {
			if(!response.data || response.data ==""){
				this.modal_user.birthday = new Date(this.modal_user.birthday).toISOString().split('T')[0];
				this.errorMessage = "Username already exists!";
			} else {
				localStorage.user = JSON.stringify( this.modal_user);
				this.updateFormData();
				$("#editAdminModal").modal('hide');
			}
		});
	},

	updateFormData: function() {
		this.errorMessage = "";
		this.user = JSON.parse(localStorage.user);
		this.user.birthday = new Date(this.user.birthday).toLocaleDateString("en-GB");
		this.modal_user=JSON.parse(localStorage.user);
		this.modal_user.birthday = new Date(this.modal_user.birthday).toISOString().split('T')[0];
	}

},
template: ` 
	<div class="album py-5 bg-light">
    <div class="container">

      <div class="row">
        <div class="col">
          <div class="card shadow-sm">
            <!--<svg class="bd-placeholder-img card-img-top" width="100%" height="225" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: Thumbnail" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#55595c"/><text x="50%" y="50%" fill="#eceeef" dy=".3em">Thumbnail</text></svg>
			-->
            <div class="card-body">
              <p class="card-text">Username: {{user.username}}</p>
              <p class="card-text">Firstname: {{user.firstname}}</p>
              <p class="card-text">Lastname: {{user.lastname}}</p>
              <p class="card-text">Password: {{user.password}}</p>
              <p class="card-text">Gender: {{user.gender}}</p>
              <p class="card-text">Birthday: {{user.birthday}}</p>
              <div class="d-flex justify-content-between align-items-center">
                <div class="btn-group">
                  <button type="button" class="btn btn-sm btn-outline-secondary" data-bs-toggle="modal" data-bs-target="#editAdminModal">Edit</button>
                </div>
                <small class="text-muted">9 mins</small>
              </div>
            </div>
          </div>
        </div>
        </div>
        <!-- Modal -->
		<div class="modal fade" id="editAdminModal" tabindex="-1" aria-labelledby="Modal" aria-hidden="true">
		  <div class="modal-dialog">
		    <div class="modal-content">
		      <div class="modal-header">
		        <h5 class="modal-title">Edit admin</h5>
		        <button type="button" v-on:click="updateFormData()" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
		      </div>
		      <div class="modal-body">
		      <!--   MODAL FORM    -->
		        <div class="form-floating mb-2">
			      <input type="text" class="form-control" name="username" v-model="modal_user.username" placeholder="Username">
			      <label for="floatingInput">Username</label>
			    </div>
			    <div class="form-floating mb-2">
			      <input type="text" class="form-control" name="password" v-model="modal_user.password" placeholder="Password">
			      <label for="floatingPassword">Password</label>
			    </div>
			    <div class="form-floating mb-2">
			      <input type="text" class="form-control" name="firstname" v-model="modal_user.firstname" placeholder="Firstname">
			      <label for="floatingInput">Firstname</label>
			    </div>
			    <div class="form-floating mb-2">
			      <input type="text" class="form-control" name="lastname" v-model="modal_user.lastname" placeholder="Lastname">
			      <label for="floatingInput">Lastname</label>
			    </div>
			    <div class="form-floating mb-2">
			    <select class="form-control" id="genderSelect" name="gender" v-model="modal_user.gender" placeholder="Gender">
				    <option value="Male">Male</option>
				    <option value="Female">Female</option>
			     </select>
			     <label for="floatingInput">Gender</label>
			     </div>
			    <div class="form-floating mb-2">
			      <input type="date" class="form-control" name="birthday" v-model="modal_user.birthday" placeholder="Birthday">
			      <label for="floatingInput">Birthday</label>
			    </div>
		      <!--   MODAL FORM  END  -->
	    		<span class="errorMessage mr-3">{{errorMessage}}</span>
		      </div>
		      <div class="modal-footer">
		        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" v-on:click="updateFormData()">Close</button>
		        <button type="button" class="btn btn-primary" v-on:click="checkForm()">Save</button>
		      </div>
      		</div>
		</div>
	</div>
   </div>
  </div>
 `
})
