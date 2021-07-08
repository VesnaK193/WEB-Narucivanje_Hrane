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

@Path("/manager")
public class ManagerService {
	
	@Context
	ServletContext ctx;
	
	public ManagerService() {
		
	}

	@PostConstruct
	public void init() {
		if (ctx.getAttribute("managerDAO") == null) {
	    	String contextPath = ctx.getRealPath("");
			ctx.setAttribute("managerDAO", new ManagerDAO(contextPath));
		}
	}
	
	@GET
	@Path("/allManagers")
	@Produces(MediaType.APPLICATION_JSON)
	public Collection<Manager> allManagers() {
		ManagerDAO managerDAO = (ManagerDAO) ctx.getAttribute("managerDAO");
		return managerDAO.findAll();
	}
	
	@POST
	@Path("/getById")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Manager getById(User u) {
		ManagerDAO managerDAO = (ManagerDAO) ctx.getAttribute("managerDAO");
		return managerDAO.findById(u.getId());
	}
	
	@GET
	@Path("/allManagersWhitoutRestaurant")
	@Produces(MediaType.APPLICATION_JSON)
	public Collection<Manager> allWhitoutRestaurant() {
		ManagerDAO managerDAO = (ManagerDAO) ctx.getAttribute("managerDAO");
		return managerDAO.findAllWhitoutRestaurant();
	}
	
	@POST
	@Path("/update")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Manager updateManager(Manager m) {
		ManagerDAO managerDAO = (ManagerDAO) ctx.getAttribute("managerDAO");
		return managerDAO.updateManager(m);
	}
	
	@POST
	@Path("/add")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Manager addManager(Manager m) {
		System.out.println("Dodaje");
		ManagerDAO managerDAO = (ManagerDAO) ctx.getAttribute("managerDAO");
		managerDAO.addManager(m);
		return m;
	}
}
