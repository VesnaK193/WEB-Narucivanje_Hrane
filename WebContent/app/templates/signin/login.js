Vue.component("login", {
	data: function () {
		    return {
		      products: null
		    }
	},
	template: ` 
<div>
	<div class="min-cover">
		<main-header></main-header> 
		<main class="form-signin">
		  <form>
		    <h1 class="h3 mb-3 fw-normal">Sign in to Deliverer</h1>
		
		    <div class="form-floating">
		      <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com">
		      <label for="floatingInput">Email address</label>
		    </div>
		    <div class="form-floating last">
		      <input type="password" class="form-control" id="floatingPassword" placeholder="Password">
		      <label for="floatingPassword">Password</label>
		    </div>
		
		    <div class="checkbox mb-3">
		      <label>
		        <input type="checkbox" value="remember-me"> Remember me
		      </label>
		    </div>
		    <button class="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
		  </form>
		</main>
	</div> 
		<main-footer></main-footer>
</div>  
`
	, 
//	methods : {
//		addToCart : function (product) {
//			axios
//			.post('rest/proizvodi/add', {"id":''+product.id, "count":parseInt(product.count)})
//			.then(response => (toast('Product ' + product.name + " added to the Shopping Cart")))
//		}
//	},
//	mounted () {
//        axios
//          .get('rest/proizvodi/getJustProducts')
//          .then(response => (this.products = response.data))
//    },
});