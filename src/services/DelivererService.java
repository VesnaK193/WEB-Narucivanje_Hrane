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

import dao.DelivererDAO;
import dao.ManagerDAO;
import entities.Deliverer;
import entities.Manager;
import entities.User;

@Path("/deliverer")
public class DelivererService {
	
	@Context
	ServletContext ctx;
	
	public DelivererService() {
		
	}

	@PostConstruct
	public void init() {
		if (ctx.getAttribute("delivererDAO") == null) {
	    	String contextPath = ctx.getRealPath("");
			ctx.setAttribute("delivererDAO", new DelivererDAO(contextPath));
		}
	}
	
	@GET
	@Path("/all")
	@Produces(MediaType.APPLICATION_JSON)
	public Collection<Deliverer> allDeliverers() {
		DelivererDAO delivererDAO = (DelivererDAO) ctx.getAttribute("delivererDAO");
		return delivererDAO.findAll();
	}
	
	@POST
	@Path("/getById")
	@Produces(MediaType.APPLICATION_JSON)
	public Deliverer getById(User user) {
		DelivererDAO delivererDAO = (DelivererDAO) ctx.getAttribute("delivererDAO");
		return delivererDAO.findById(user.getId());
	}
	
	@POST
	@Path("/update")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Deliverer updateDeliverer(Deliverer d) {
		DelivererDAO delivererDAO = (DelivererDAO) ctx.getAttribute("delivererDAO");
		return delivererDAO.updateDeliverer(d);
	}
	
	@POST
	@Path("/add")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Deliverer addDeliverer(Deliverer d) {
		System.out.println("Dodaje");
		DelivererDAO delivererDAO = (DelivererDAO) ctx.getAttribute("delivererDAO");
		delivererDAO.addDeliverer(d);
		return d;
	}

}
