Vue.component("manager-comments", {
	data: function () {
	    return {
	    	manager:null,
	    	comments:[]
	    }
},
mounted() {
	let user = JSON.parse(localStorage.user);
	axios
	.post("rest/manager/getById", user)
	.then(response => {
		this.manager = response.data;
		axios
		.post("rest/comment/findAllByRestaurantId", response.data.restaurant)
		.then(response1 => {
			this.comments=response1.data;
		});
		
	});
},
methods: {
	approveComment: function(comment){
		comment.approved = 'YES';
		axios
		.post('rest/comment/updateAndReturnAverageRating', comment)
		.then(response => {
			let averageRating = response.data;
			this.manager.restaurant.averageRating = averageRating;
			axios
			.post("rest/manager/update",this.manager )
			.then(response1 =>{
				axios
				.post("rest/restaurant/update",this.manager.restaurant );
			})
		})
	},
	rejectComment: function(comment){
		comment.approved = 'NO';
		axios
		.post('rest/comment/update', comment);
	},
	areCommentsEmpty: function(){
		let areEmpty = true;
		if(this.comments!=null){
			if(this.comments.length>0)
				areEmpty = false;
		}
		return areEmpty;
	}
},
template: ` 
	<div class="container">
		<div class="row">
			<div class="col-md-12 text-center mb-3 mt-3"><h1>Comments</h1></div>
			<!-- Button trigger add modal -->
			<table v-if="!areCommentsEmpty()" class="table table-bordered bg-light" style="border-color:#607d8b">
				<thead>
				<tr style="background: rgb(108 117 125); text-align: center; color: white;border-color: rgb(69 75 80); ">
					<th>Customer</th>
					<th>Comment</th>
					<th>Rating</th>
					<th>Approved</th>
					<th>Actions</th>
				</tr>
				</thead>
				<tbody>
				<tr v-for="comment in comments">
					<td>{{comment.customer.firstname}} {{comment.customer.lastname}}</td>
					<td>{{comment.content}}</td>
					<td>{{comment.rating}}</td>
					<td>{{comment.approved}}</td>
					<td  class="text-center">
						<button type="button" v-if="comment.approved=='' || comment.approved==null" class="btn btn-secondary" @click="approveComment(comment)">Approve</button>
						<button type="button" v-if="comment.approved=='' || comment.approved==null" class="btn btn-danger" @click="rejectComment(comment)">Reject</button>
					</td>
				</tr>
				</tbody>
			</table>
			<p class="py-3 text-center" v-if="areCommentsEmpty()"> No comments at the moment</p>
		</div>
	</div>
 `
})
