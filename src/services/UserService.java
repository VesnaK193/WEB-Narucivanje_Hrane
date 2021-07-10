package services;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
import java.util.List;

import javax.annotation.PostConstruct;
import javax.servlet.ServletContext;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;

import dao.UserDAO;
import entities.User;

@Path("/user")
public class UserService {
	
	@Context
	ServletContext ctx;
	
	public UserService() {
		
	}
	
	@PostConstruct
	// ctx polje je null u konstruktoru, mora se pozvati nakon konstruktora (@PostConstruct anotacija)
	public void init() {
		// Ovaj objekat se instancira vi�e puta u toku rada aplikacije
		// Inicijalizacija treba da se obavi samo jednom
		if (ctx.getAttribute("userDAO") == null) {
	    	String contextPath = ctx.getRealPath("");
			ctx.setAttribute("userDAO", new UserDAO(contextPath));
		}
	}
	
	@GET
	@Path("/allUsers")
	@Produces(MediaType.APPLICATION_JSON)
	public Collection<User> allUsers() {
		UserDAO userDao = (UserDAO) ctx.getAttribute("userDAO");
		return userDao.findAll();
	}
	
	@POST
	@Path("/register")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public User register(User u) {
		UserDAO userDao = (UserDAO) ctx.getAttribute("userDAO");
		User userWithNewUsername = userDao.findByUsername(u.getUsername());
		if(userWithNewUsername==null) {
			u = userDao.addUser(u);
			return u;
		}
		return null;
	}
	
	@POST
	@Path("/update")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public User update(User u) {
		UserDAO userDao = (UserDAO) ctx.getAttribute("userDAO");
		userDao.updateUser(u);
		return u;
	}
	
	@POST
	@Path("/login")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public User login(User u) {
		UserDAO userDao = (UserDAO) ctx.getAttribute("userDAO");
		
		User u1 = userDao.findByUsernameAndPassword(u.getUsername(), u.getPassword());
		
		if(u1 == null) {
			return null;
		} else {
			return u1;
		}
	}
}
