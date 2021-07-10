package dao;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;
import java.nio.charset.Charset;
import java.security.SecureRandom;
import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Random;
import java.util.stream.Collectors;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectWriter;

import entities.Order;
import entities.Product;
import entities.Restaurant;
import entities.ShoppingCart;
import enums.OrderStatus;

public class OrderDAO {
	private Map<String, Order> orders = new HashMap<>();
	private String contextPath = "";
	
	public OrderDAO() {
		loadOrders();
	}
	
	public OrderDAO(String contextPath) {
		this.contextPath = contextPath;
		loadOrders();
	}
	
	public Order findById(int id) {
		if (!orders.containsKey(id)) {
			return null;
		}
		Order order = orders.get(id);
		return order;
	}

	public Collection<Order> findByUserId(int id) {
		Collection<Order> userOrders = new ArrayList<>();
		for(Order o : orders.values()) {
			if(o.getCustomer().getId() == id)
				userOrders.add(o);
		}
		return userOrders;
	}
	
	public Collection<Order> findByRestaurantId(int id) {
		Collection<Order> restaurantOrders = new ArrayList<>();
		for(Order o : orders.values()) {
			if(o.getRestaurant().getId() == id)
				restaurantOrders.add(o);
		}
		return restaurantOrders;
	}

	public Collection<Order> getPendingOrders() {
		Collection<Order> pendingOrders = new ArrayList<>();
		for(Order o : orders.values()) {
			if(o.getOrderStatus() == OrderStatus.WAITING_FOR_DELIVERER)
				pendingOrders.add(o);
		}
		return pendingOrders;
	}

	public Collection<Order> getNotDeliveredOrdersByUserId(int id) {
		Collection<Order> userOrders = new ArrayList<>();
		for(Order o : orders.values()) {
			if(o.getCustomer().getId() == id)
				userOrders.add(o);
		}
		
		Collection<Order> notDeliveredOrders = new ArrayList<>();
		for(Order o : userOrders) {
			if(o.getOrderStatus() != OrderStatus.DELIVERED)
				notDeliveredOrders.add(o);
		}
		return notDeliveredOrders;
	}
	
	public Collection<Order> findAll() {
		return orders.values();
	}
	
	public void loadOrders() {
		BufferedReader reader = null;
		try {
			File file = new File(contextPath + "storage\\orders.txt");
			reader = new BufferedReader(new FileReader(file));
			String json = reader.lines().collect(Collectors.joining());
			Collection<Order> oList = new ObjectMapper().readValue(json, new TypeReference<List<Order>>(){});
			
			for(Order o : oList) {
				orders.put(o.getId(), o);
			}
		} catch (Exception ex) {
		} finally {
			if (reader != null) {
				try {
					reader.close();
				}
				catch (Exception e) { }
			}
		}
	}
	
	public void addOrder(Order order) {
		File file = new File(contextPath + "storage\\orders.txt");
		
		orders.put(order.getId(), order);
		
		BufferedWriter writer = null;
		try {
		    ObjectWriter ow = new ObjectMapper().writer().withDefaultPrettyPrinter();
		    String json = ow.writeValueAsString(orders.values());

		    writer = new BufferedWriter(new FileWriter(file));
		    writer.write(json);
		} catch (Exception e) {
		} finally {
			if ( writer != null ) {
				try {
					writer.close();
				}
				catch (Exception e) { }
			}
		}
	}
	
	public Order updateOrder(Order order) {
		File file = new File(contextPath + "storage\\orders.txt");
		if(order.getId()=="" || order.getId()==null) {
			String id = randomString();
			while(orders.containsKey(id))
				id = randomString();
			order.setId(id);
		}
		orders.put(order.getId(), order);
		
		BufferedWriter writer = null;
		try {
		    ObjectWriter ow = new ObjectMapper().writer().withDefaultPrettyPrinter();
		    String json = ow.writeValueAsString(orders.values());

		    writer = new BufferedWriter(new FileWriter(file));
		    writer.write(json);
		} catch (Exception e) {
		} finally {
			if ( writer != null ) {
				try {
					writer.close();
				}
				catch (Exception e) { }
			}
		}
		return order;
	}


	static final String AB = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
	static SecureRandom rnd = new SecureRandom();
	
	String randomString(){
	   StringBuilder sb = new StringBuilder(10);
	   for(int i = 0; i < 10; i++)
	      sb.append(AB.charAt(rnd.nextInt(AB.length())));
	   System.out.println(sb.toString());
	   return sb.toString();
	}
}
