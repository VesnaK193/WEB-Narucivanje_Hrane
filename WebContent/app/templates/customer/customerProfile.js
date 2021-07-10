Vue.component("customer-profile", {
	data: function () {
	    return {
	    	customer:{
	    		birthday: "",
	    		firstname: "",
	    		gender: "",
	    		lastname: "",
	    		password: "",
	    		username: "",
	    		
	    	},
	    	modal_customer: {
	    		birthday: "",
	    		firstname: "",
	    		gender: "",
	    		lastname: "",
	    		password: "",
	    		username: "",
	    		
	    	},
	    	birthdayInMS:"",
	    	errorMessage: ""
	    }
},
mounted() {
	let user = JSON.parse(localStorage.user);
	axios
	.post("rest/customer/getById", user)
	.then(response => {
		this.updateFormData(response.data);
	})
	
	
},
methods: {
	checkForm: function() {
		console.log(this.modal_customer);
		//Conver to miliseconds
		this.modal_customer.birthday = new Date(this.modal_customer.birthday).getTime();
		let s = {
	    		birthday: this.modal_customer.birthday,
	    		firstname: this.modal_customer.firstname,
	    		gender: this.modal_customer.gender,
	    		lastname: this.modal_customer.lastname,
	    		password: this.modal_customer.password,
	    		username: this.modal_customer.username,
	    		role: this.modal_customer.role,
	    		
	    	};
		axios
		.post("rest/user/update", s)
		.then(response => {
			if(!response.data || response.data ==""){
				this.modal_customer.birthday = new Date(this.modal_customer.birthday).toISOString().split('T')[0];
				this.errorMessage = "Username already exists!";
			} else {
				axios
				.post("rest/customer/update", this.modal_customer)
				.then(response => {
					let r = {
				    		birthday: response.data.birthday,
				    		firstname: response.data.firstname,
				    		gender: response.data.gender,
				    		lastname: response.data.lastname,
				    		password: response.data.password,
				    		username: response.data.username,
				    		role: response.data.role,
				    		
				    	};
					localStorage.user = JSON.stringify( r);
					this.updateFormData(response.data);
					$("#editCustomerModal").modal('hide');
				});
			}
		});
	},
	updateFormData: function(customer) {
		this.errorMessage = "";
		this.birthdayInMS=customer.birthday;
		this.customer = Object.assign({}, customer);
		this.customer.birthday = new Date(customer.birthday).toLocaleDateString("en-GB");
		this.modal_customer=Object.assign({}, customer);
		this.modal_customer.birthday = new Date(customer.birthday).toISOString().split('T')[0];
	},
	resetModalData: function() {
		this.errorMessage = "";
		this.modal_customer=Object.assign({}, this.customer);
		this.modal_customer.birthday = new Date(this.birthdayInMS).toISOString().split('T')[0];
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
                <button type="button" class="btn btn-sm btn-outline-secondary"@click="resetModalData()" data-bs-toggle="modal" data-bs-target="#editCustomerModal">Edit</button>
              </div>
              <p class="card-text"><span class="text-muted">Username:</span> {{customer.username}}</p>
              <p class="card-text"><span class="text-muted">Firstname:</span> {{customer.firstname}}</p>
              <p class="card-text"><span class="text-muted">Lastname:</span> {{customer.lastname}}</p>
              <p class="card-text"><span class="text-muted">Password:</span> {{customer.password}}</p>
              <p class="card-text"><span class="text-muted">Gender:</span> {{customer.gender}}</p>
              <p class="card-text"><span class="text-muted">Birthday:</span> {{customer.birthday}}</p>
            </div>
          </div>
        </div>
        </div>
        <!-- Modal -->
		<div class="modal fade" id="editCustomerModal" tabindex="-1" aria-labelledby="Modal" aria-hidden="true">
		  <div class="modal-dialog">
		    <div class="modal-content">
		      <div class="modal-header">
		        <h5 class="modal-title">Edit profile</h5>
		        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
		      </div>
		      <div class="modal-body">
		      <!--   MODAL FORM    -->
		        <div class="form-floating mb-2">
			      <input type="text" class="form-control" name="username" v-model="modal_customer.username" placeholder="Username">
			      <label for="floatingInput">Username</label>
			    </div>
			    <div class="form-floating mb-2">
			      <input type="text" class="form-control" name="password" v-model="modal_customer.password" placeholder="Password">
			      <label for="floatingPassword">Password</label>
			    </div>
			    <div class="form-floating mb-2">
			      <input type="text" class="form-control" name="firstname" v-model="modal_customer.firstname" placeholder="Firstname">
			      <label for="floatingInput">Firstname</label>
			    </div>
			    <div class="form-floating mb-2">
			      <input type="text" class="form-control" name="lastname" v-model="modal_customer.lastname" placeholder="Lastname">
			      <label for="floatingInput">Lastname</label>
			    </div>
			    <div class="form-floating mb-2">
			    <select class="form-control" id="genderSelect" name="gender" v-model="modal_customer.gender" placeholder="Gender">
				    <option value="Male">Male</option>
				    <option value="Female">Female</option>
			     </select>
			     <label for="floatingInput">Gender</label>
			     </div>
			    <div class="form-floating mb-2">
			      <input type="date" class="form-control" name="birthday" v-model="modal_customer.birthday" placeholder="Birthday">
			      <label for="floatingInput">Birthday</label>
			    </div>
		      <!--   MODAL FORM  END  -->
	    		<span class="errorMessage mr-3">{{errorMessage}}</span>
		      </div>
		      <div class="modal-footer">
		        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" >Close</button>
		        <button type="button" class="btn btn-primary" v-on:click="checkForm()">Save</button>
		      </div>
      		</div>
		</div>
	</div>
   </div>
  </div>
 `
	
})