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

import dao.ManagerDAO;
import dao.OrderDAO;
import entities.Manager;
import entities.Order;
import entities.Restaurant;
import entities.User;

@Path("/order")
public class OrderService {
	@Context
	ServletContext ctx;
	
	public OrderService() {
		
	}

	@PostConstruct
	public void init() {
		if (ctx.getAttribute("orderDAO") == null) {
	    	String contextPath = ctx.getRealPath("");
			ctx.setAttribute("orderDAO", new OrderDAO(contextPath));
		}
	}
	
	@GET
	@Path("/allOrders")
	@Produces(MediaType.APPLICATION_JSON)
	public Collection<Order> allOrders() {
		OrderDAO orderDAO = (OrderDAO) ctx.getAttribute("orderDAO");
		return orderDAO.findAll();
	}
	
	@POST
	@Path("/update")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Order updateOrder(Order o) {
		OrderDAO orderDAO = (OrderDAO) ctx.getAttribute("orderDAO");
		return orderDAO.updateOrder(o);
	}
	
	@POST
	@Path("/findAllByUserId")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Collection<Order> findAllByUserId(User u) {
		OrderDAO orderDAO = (OrderDAO) ctx.getAttribute("orderDAO");
		return orderDAO.findByUserId(u.getId());
	}
	
	@POST
	@Path("/findAllByRestaurantId")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Collection<Order> findAllByRestaurantId(Restaurant r) {
		OrderDAO orderDAO = (OrderDAO) ctx.getAttribute("orderDAO");
		return orderDAO.findByRestaurantId(r.getId());
	}
	
	@GET
	@Path("/getPendingOrders")
	@Produces(MediaType.APPLICATION_JSON)
	public Collection<Order> getPendingOrders() {
		OrderDAO orderDAO = (OrderDAO) ctx.getAttribute("orderDAO");
		return orderDAO.getPendingOrders();
	}
	
	@POST
	@Path("/getNotDeliveredOrdersByUserId")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Collection<Order> getNotDeliveredOrdersByUserId(User user) {
		OrderDAO orderDAO = (OrderDAO) ctx.getAttribute("orderDAO");
		return orderDAO.getNotDeliveredOrdersByUserId(user.getId());
	}
}
