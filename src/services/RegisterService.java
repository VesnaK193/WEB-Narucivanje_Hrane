package services;

import java.util.ArrayList;
import java.util.Collection;

import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import entities.User;

@Path("/register")
public class RegisterService {
	
	ArrayList<User> users = new ArrayList<User>();
	User u1 = new User("Vesna","123","Vesna","Karaklic","ZENSKI",null,null,null);
	User u2 = new User("Nikola","123","Nikola","Nikolic","MUSKI",null,null,null);
	
	@POST
	@Path("/Add")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public String register(User u) {
		//users.add(u1);
		//users.add(u2);
		
		return u.getFirstname();
	}

}
