Vue.component("products", {
	data: function () {
		return {
			product: {
				name: "",
				price: "",
				productType: "",
				quantity: "",
				description: "",
				image: "",
				restaurantId: "",
			},
			errorMessage:"",
			manager: {
				id: null,
				username: null,
				password: null,
				firstname: null,
				lastname: null,
				gender:null,
				role:null,
				restaurant: {
					id: "",
					name: "",
					type: "",
					products: [],
					restaurantStatus: "",
					location: {
						longitude: "",
						latitude: "",
						streetName: "",
						city: "",
						zipCode: ""
					},
					logo: "",
				}
			},
		}
	},
	mounted () {
		let u = JSON.parse(localStorage.user);
		axios
		.post("rest/manager/getById",u)
		.then(response => {
			this.restaurant = response.data.restaurant;
			console.log(this.restaurant);
			this.manager=response.data;
		})
	},
	methods: {
		checkForm: function() {
			if(this.isFormValid("#addProductModal #product_img")) {
				if(this.isProductUnique()) {
					this.errorMessage = "";
					let prodList =  this.manager.restaurant.products?this.manager.restaurant.products:[];
					this.product.image=document.querySelector("#addProductModal #product_img").src;
					this.product.restaurantId = this.manager.restaurant.id;
					if(prodList.length>0) 
					{
						this.manager.restaurant.products.push(this.product);
					} else {
						this.manager.restaurant.products = [this.product];
					}
					
					axios
					.post("rest/manager/update", this.manager)
					.then(response => {
						axios
						.post("rest/restaurant/update", this.manager.restaurant)
						.then(response1 => {
							$("#addProductModal").modal('hide');
						})
					})
				} else {
					vue.errorMessage = "Product name already exists!";
				}
			}
		
		},
		isFormValid: function(imgElementId) {
			if(this.product.name == "" || this.product.price == "" || this.product.type == "" || document.querySelector(imgElementId).alt == "empty") {
				this.errorMessage = "All fields are required!";
				return false;
			} 
			this.errorMessage="";
			return true;
		},
		
		isProductUnique: function() {
			let prodArray = this.manager.restaurant.products?this.manager.restaurant.products:[];
			let isValid = true;
			if(prodArray.length > 0) {
				prodArray.forEach(p=> {
					if(this.product.name == p.name) {
						isValid = false;
					}
				});
			} 
			return isValid;
		},
		
		onImageChange: function(modalId) {
			const file = document.querySelector("#" + modalId + " #img_file").files[0];
			const img = document.querySelector("#" + modalId + " #product_img");
			var reader = new FileReader();
			reader.onload = function(event) {
				img.src = event.target.result
				img.alt = "Full";
				img.style.display = "block";
			}
			reader.readAsDataURL(file);
		},
		
		resetForm: function() {
			this.product= {
				name: "",
				price: "",
				productType: "",
				quantity: "",
				description: "",
				image: "",
			}
			this.errorMessage ="";
			var file = document.getElementById("img_file");
			file.files[0] = null;
			file.value="";
			var img = document.getElementById("product_img");
			img.src = "";
			img.empty = "";
			img.style.display = "none";
		},
		
		priceValidation: function(event) {
			const searchRegExp = /[^0-9]/g;
			let v = this.product.price.replace(searchRegExp, "");
			this.product.price = v;
		},
		
		quantityValidation: function(event) {
			const searchRegExp = /[^0-9]/g;
			let v = this.product.quantity.replace(searchRegExp, "");
			this.product.quantity = v;
		},
		
		editProductOnClick: function(product) {
			let img = document.querySelector("#editProductModal #product_img");
			this.product=product;
			img.src = product.image;
			img.style.display = "block";
		},
		
		editForm: function() {
			if(this.isFormValid("#editProductModal #product_img")) {
				this.errorMessage = "";
				this.product.image=document.querySelector("#editProductModal #product_img").src;
				this.manager.restaurant.products.map(p => {
					if(p.name == this.product.name)
						p = this.product;
				})
				axios
				.post("rest/manager/update", this.manager)
				.then(response => {
					axios
					.post("rest/restaurant/update", this.manager.restaurant)
					.then(response1 => {
						$("#editProductModal").modal('hide');
					})
				})
			}
		},
		areProductsEmpty: function(){
			let areEmpty = true;
			if(this.manager.restaurant.products!=null){
				if(this.manager.restaurant.products.length>0)
					areEmpty = false;
			}
			return areEmpty;
		}
	
	},
	template: `
	<div class="container">
		<div class="row">
			<div class="col-md-12 text-center mb-3 mt-3"><h1>Products</h1></div>
	<button type="button" style="font-weight: 700;" class="btn btn-primary mb-3 offset-md-10 col-md-2" @click="resetForm" data-bs-toggle="modal" data-bs-target="#addProductModal">
			  Add
			</button>
	<table v-if="!areProductsEmpty()" class="table table-bordered bg-light mb-5" style="border-color:#607d8b" >
				<thead>
				<tr style="background: rgb(108 117 125); text-align: center; color: white;border-color: rgb(69 75 80); ">
					<th>Name</th>
					<th>Price</th>
					<th>Type</th>
					<th>Quantity</th>
					<th>Description</th>
					<th>Image</th>
					<th>Actions</th>
				</tr>
				</thead>
				<tbody>
					<tr v-for="product in manager.restaurant.products">
						<td>{{product.name}}</td>
						<td>{{product.price}}</td>
						<td>{{product.productType}}</td>
						<td>{{product.quantity}}</td>
						<td>{{product.description}}</td>
						<td class="text-center"><img v-if="product.image!=''" v-bind:src="product.image" alt="" width="40" height="40"></td>
						<td class="text-center"> 
							<button type="button" class="btn btn-secondary" @click="editProductOnClick(product)" data-bs-toggle="modal" data-bs-target="#editProductModal">Edit</button>
						</td>
					</tr>
				</tbody>
				</table>
				<p class="py-3 text-center" v-if="areProductsEmpty()"> No products at the moment</p>
		<!-- Modal -->
		<div class="modal fade" id="addProductModal" tabindex="-1" aria-labelledby="Modal" aria-hidden="true">
		  <div class="modal-dialog">
		    <div class="modal-content">
		      <div class="modal-header">
		        <h5 class="modal-title">Add product</h5>
		        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
		      </div>
		      <div class="modal-body">
		      <!--   MODAL FORM    -->
		        <div class="form-floating mb-2">
			      <input type="text" class="form-control" name="name" v-model="product.name" placeholder="Name">
			      <label for="floatingInput">Name</label>
			    </div>
			    <div class="form-floating mb-2">
			      <input type="text" class="form-control" name="price" v-model="product.price" @change="priceValidation" placeholder="Price">
			      <label for="floatingInput">Price</label>
			    </div>
			    <div class="form-floating mb-2">
			    <select class="form-control" id="typeSelect" name="type" v-model="product.productType" placeholder="Type">
				    <option value="FOOD">Food</option>
				    <option value="DRINK">Drink</option>
			     </select>
			     <label for="floatingInput">Type</label>
			     </div>
			    <div class="form-floating mb-2">
			      <input type="text" class="form-control" name="Quantity" v-model="product.quantity" @change="quantityValidation" placeholder="Quantity">
			      <label for="floatingInput">Quantity</label>
			    </div>
			    <div class="form-floating mb-2">
			      <input type="text" class="form-control" name="description" v-model="product.description" placeholder="Description">
			      <label for="floatingInput">Description</label>
			    </div>
			     <!-- LOGO FIELD -->
			    <img style="display:none" id="product_img" src="" alt="empty" width="107" height="98">
				<div class="mb-2">
				  <label for="img_file" class="form-label">Image</label>
				  <input @change="onImageChange('addProductModal')"  class="form-control form-control-lg" id="img_file" type="file">
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
				
				<!-- Modal Edit -->
		<div class="modal fade" id="editProductModal" tabindex="-1" aria-labelledby="Modal" aria-hidden="true">
		  <div class="modal-dialog">
		    <div class="modal-content">
		      <div class="modal-header">
		        <h5 class="modal-title">Edit product</h5>
		        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
		      </div>
		      <div class="modal-body">
		      <!--   MODAL FORM    -->
		        <div class="form-floating mb-2">
			      <input type="text" class="form-control" name="name" v-model="product.name" placeholder="Name" disabled>
			      <label for="floatingInput">Name</label>
			    </div>
			    <div class="form-floating mb-2">
			      <input type="text" class="form-control" name="price" v-model="product.price" @change="priceValidation" placeholder="Price">
			      <label for="floatingInput">Price</label>
			    </div>
			    <div class="form-floating mb-2">
			    <select class="form-control" id="typeSelect" name="type" v-model="product.productType" placeholder="Type">
				    <option value="FOOD">Food</option>
				    <option value="DRINK">Drink</option>
			     </select>
			     <label for="floatingInput">Type</label>
			     </div>
			    <div class="form-floating mb-2">
			      <input type="text" class="form-control" name="Quantity" v-model="product.quantity" @change="quantityValidation" placeholder="Quantity">
			      <label for="floatingInput">Quantity</label>
			    </div>
			    <div class="form-floating mb-2">
			      <input type="text" class="form-control" name="description" v-model="product.description" placeholder="Description">
			      <label for="floatingInput">Description</label>
			    </div>
			     <!-- LOGO FIELD -->
			    <img style="display:none" id="product_img" src="" alt="" width="107" height="98">
				<div class="mb-2">
				  <label for="img_file" class="form-label">Image</label>
				  <input @change="onImageChange('editProductModal')"  class="form-control form-control-lg" id="img_file" type="file">
				</div>
		      <!--   MODAL FORM  END  -->
	    		<span class="errorMessage mr-3">{{errorMessage}}</span>
		      </div>
		      <div class="modal-footer">
		        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
		        <button type="button" class="btn btn-primary" v-on:click="editForm()">Save</button>
		      </div>
				</div>
				</div>
				</div>
				</div>
				</div>
	`
})