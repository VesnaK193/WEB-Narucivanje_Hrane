package dao;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectWriter;

import entities.Customer;

public class CustomerDAO {
	private Map<Integer, Customer> customers = new HashMap<>();
	private String contextPath = "";
	
	public CustomerDAO() {
		loadCustomers();
	}
	
	public CustomerDAO(String contextPath) {
		this.contextPath = contextPath;
		loadCustomers();
	}
	
	public Customer findById(int id) {
		if (!customers.containsKey(id)) {
			return null;
		}
		Customer customer = customers.get(id);
		return customer;
	}
	
	public Collection<Customer> findAll() {
		return customers.values();
	}
	
	public void loadCustomers() {
		BufferedReader reader = null;
		try {
			File file = new File(contextPath + "storage\\customers.txt");
			reader = new BufferedReader(new FileReader(file));
			String json = reader.lines().collect(Collectors.joining());
			System.out.println(json);
			Collection<Customer> cList = new ObjectMapper().readValue(json, new TypeReference<List<Customer>>(){});
			
			for(Customer c : cList) {
				customers.put(c.getId(), c);
			}
		} catch (Exception ex) {
			ex.printStackTrace();
		} finally {
			if (reader != null) {
				try {
					reader.close();
				}
				catch (Exception e) { }
			}
		}
	}
	
	public void addCustomer(Customer customer) {
		File file = new File(contextPath + "storage\\customers.txt");
		
		customers.put(customer.getId(), customer);
		
		BufferedWriter writer = null;
		try {
		    ObjectWriter ow = new ObjectMapper().writer().withDefaultPrettyPrinter();
		    String json = ow.writeValueAsString(customers.values());

		    writer = new BufferedWriter(new FileWriter(file));
		    writer.write(json);
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			if ( writer != null ) {
				try {
					writer.close();
				}
				catch (Exception e) { }
			}
		}
	}
	
	public Customer updateCustomer(Customer customer) {
		File file = new File(contextPath + "storage\\customers.txt");
		
		Customer oldCustomer = customers.get(customer.getId());
		try {
			customer.setAllOrders(oldCustomer.getAllOrders());
			customer.setShoppingCart(oldCustomer.getShoppingCart());
			customer.setNumberOfPoints(oldCustomer.getNumberOfPoints());
			customer.setTypeOfCustomer(oldCustomer.getTypeOfCustomer());
		} catch(NullPointerException ex) {}
		
		customers.put(customer.getId(), customer);
		
		BufferedWriter writer = null;
		try {
		    ObjectWriter ow = new ObjectMapper().writer().withDefaultPrettyPrinter();
		    String json = ow.writeValueAsString(customers.values());

		    writer = new BufferedWriter(new FileWriter(file));
		    writer.write(json);
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			if ( writer != null ) {
				try {
					writer.close();
				}
				catch (Exception e) { }
			}
		}
		return customer;
	}
}
