package services;

import java.util.Collection;

import javax.annotation.PostConstruct;
import javax.servlet.ServletContext;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;

import dao.RestaurantDAO;
import entities.Restaurant;

@Path("/restaurant")
public class RestaurantService {
	
	@Context
	ServletContext ctx;
	
	public RestaurantService() {
		
	}

	@PostConstruct
	public void init() {
		if (ctx.getAttribute("restaurantDAO") == null) {
	    	String contextPath = ctx.getRealPath("");
			ctx.setAttribute("restaurantDAO", new RestaurantDAO(contextPath));
		}
	}
	
	@GET
	@Path("/allRestaurants")
	@Produces(MediaType.APPLICATION_JSON)
	public Collection<Restaurant> allRestaurants() {
		RestaurantDAO restaurantDAO = (RestaurantDAO) ctx.getAttribute("restaurantDAO");
		restaurantDAO.loadRestaurants();
		return restaurantDAO.findAll();
	}
	
	@POST
	@Path("/add")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Restaurant addRestaurant(Restaurant r) {
		RestaurantDAO restaurantDAO = (RestaurantDAO) ctx.getAttribute("restaurantDAO");
		restaurantDAO.addRestaurant(r);
		System.out.println(r.getLocation().getCity());
		return r;
	}

}
