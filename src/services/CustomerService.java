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

import dao.CustomerDAO;
import entities.Customer;

@Path("/customer")
public class CustomerService {
	
	@Context
	ServletContext ctx;
	
	public CustomerService() {
		
	}

	@PostConstruct
	public void init() {
		if (ctx.getAttribute("customerDAO") == null) {
	    	String contextPath = ctx.getRealPath("");
			ctx.setAttribute("customerDAO", new CustomerDAO(contextPath));
		}
	}
	
	@GET
	@Path("/all")
	@Produces(MediaType.APPLICATION_JSON)
	public Collection<Customer> allCustomers() {
		CustomerDAO customerDAO = (CustomerDAO) ctx.getAttribute("customerDAO");
		return customerDAO.findAll();
	}
	@POST
	@Path("/update")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Customer updateCustomer(Customer c) {
		CustomerDAO customerDAO = (CustomerDAO) ctx.getAttribute("customerDAO");
		return customerDAO.updateCustomer(c);
	}
	
	@POST
	@Path("/add")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Customer addDeliverer(Customer c) {
		System.out.println("Dodaje");
		CustomerDAO customerDAO = (CustomerDAO) ctx.getAttribute("customerDAO");
		customerDAO.addCustomer(c);
		return c;
	}

}
