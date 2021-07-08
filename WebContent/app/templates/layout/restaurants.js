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
			this.restaurants = response.data;
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
		}
		},
template: ` 
	<div>
	<div class="container py-5">

      <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
        <div class="col" v-for="restaurant in restaurants">
          <div class="card shadow-sm">
            <svg class="bd-placeholder-img card-img-top" width="100%" height="225" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: Thumbnail" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#55595c"/><text x="50%" y="50%" fill="#eceeef" dy=".3em">Thumbnail</text></svg>

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
      </div>
    </div>
	</div> 
`
});
