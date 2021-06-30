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
	@Path("/add")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public User addManager(Manager m) {
		System.out.println("Dodaje");
		ManagerDAO managerDAO = (ManagerDAO) ctx.getAttribute("managerDAO");
		Manager managerWithNewUsername = managerDAO.findByUsername(m.getUsername());
		if(managerWithNewUsername==null) {
			managerDAO.addManager(m);
			return m;
		}
		return null;
	}
}
