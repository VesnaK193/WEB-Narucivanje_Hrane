Vue.component("restaurants", {
	data: function () {
		    return {
		    	restaurants:null,
		    	route: ""
		    }
	},
mounted() {
		this.route = "/NarucivanjeHrane/#/";
		this.route += this.getCurrentRole()==""?"restaurant/":this.getCurrentRole()+"/restaurant/";
		axios
		.get("rest/restaurant/sortedRestaurants")
		.then(response => {
			this.restaurants = response.data.length==0?[]:response.data;
		});
		},
methods: {
		getCurrentRole : function(){
			let userString = localStorage.user;
			if(!userString || userString == "") {
				return "";
			} else {
				let user = JSON.parse(userString);
				return user.role.toLowerCase();
			}
			
			},
		getFullRoute : function(event) {
			console.log(event.target);
		},
		areRestaurantsEmpty: function(){
			let areEmpty = true;
			if(this.restaurants!=null){
				if(this.restaurants.length>0)
					areEmpty = false;
			}
			return areEmpty;
		}
},
template: ` 
	<div>
	<div class="container py-5">

      <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
        <div v-if="!areRestaurantsEmpty()" class="col" v-for="restaurant in restaurants">
          <div class="card shadow-sm">
            <img v-bind:src="restaurant.logo" class="bg-placeholder-img card-img-top" width="100%" height="225">
            <div class="card-body">
              <h2>{{restaurant.name}}</h2>
              <p style="font-size:1.2rem">{{restaurant.type}}</p>
              <i class="fa fa-30"><img src="assets/images/map-marker-alt.svg"></i>
              <div>
              <p style="margin-bottom: .1rem;"> {{restaurant.location.streetName}} </p>
              <p>{{restaurant.location.zipCode}} {{restaurant.location.city}}</p>
              </div>
              <div class="d-flex justify-content-between align-items-center">
                <div class="btn-group">
                  <a v-bind:href="route + restaurant.id" class="btn btn-sm btn-outline-secondary">View</a>
                </div>
                <small class="text-muted"><i class="fa fa-30"><img src="assets/images/star.svg"></i></small>
              </div>
            </div>
          </div>
        </div>
        <h2 class="w-100 text-center" v-if="areRestaurantsEmpty()" >No restaurants at the moment</h2>
      </div>
    </div>
	</div> 
`
});
