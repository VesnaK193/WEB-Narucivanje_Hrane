package dao;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;
import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectWriter;

import entities.Manager;
import entities.Restaurant;
import enums.RestaurantStatus;

public class RestaurantDAO {
	private Map<Integer, Restaurant> restaurants = new HashMap<>();
	private String contextPath = "";

	public RestaurantDAO() {
		loadRestaurants();
	}
	
	public RestaurantDAO(String contextPath) {
		this.contextPath = contextPath;
		loadRestaurants();
	}
	
	public Restaurant findById(int id) {
		if (!restaurants.containsKey(id)) {
			return null;
		}
		Restaurant restaurant = restaurants.get(id);
		return restaurant;
	}
	
	public Collection<Restaurant> findAll() {
		return restaurants.values();
	}
	
	public void loadRestaurants() {
		BufferedReader reader = null;
		try {
			File file = new File(contextPath + "storage\\restaurants.txt");
			reader = new BufferedReader(new FileReader(file));
			String json = reader.lines().collect(Collectors.joining());
			System.out.println(json);
			Collection<Restaurant> rList = new ObjectMapper().readValue(json, new TypeReference<List<Restaurant>>(){});
			
			for(Restaurant r : rList) {
				restaurants.put(r.getId(), r);
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
	
	public Restaurant addRestaurant(Restaurant restaurant) {
		File file = new File(contextPath + "storage\\restaurants.txt");
		restaurant.setId(calculateLastIndex());
		restaurants.put(restaurant.getId(), restaurant);
		
		BufferedWriter writer = null;
		try {
		    ObjectWriter ow = new ObjectMapper().writer().withDefaultPrettyPrinter();
		    String json = ow.writeValueAsString(restaurants.values());

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
		return restaurant;
	}
	
	public Collection<Restaurant> sortRestaurants() {
		Collection<Restaurant> allRestaurants = new ArrayList<Restaurant>();
		allRestaurants = restaurants.values();
		
		Collection<Restaurant> sortedRestaurants = new ArrayList<Restaurant>();
		
		for(Restaurant r : allRestaurants) {
			if(r.getRestaurantStatus() == RestaurantStatus.OPEN) {
				sortedRestaurants.add(r);
			}
		}
		
		for(Restaurant r : allRestaurants) {
			if(r.getRestaurantStatus()== RestaurantStatus.CLOSE) {
				sortedRestaurants.add(r);
			}
		}
		return sortedRestaurants;
	}
	
	public Restaurant updateRestaurant(Restaurant restaurant) {
		File file = new File(contextPath + "storage\\restaurants.txt");
		restaurants.put(restaurant.getId(), restaurant);
		
		BufferedWriter writer = null;
		try {
		    ObjectWriter ow = new ObjectMapper().writer().withDefaultPrettyPrinter();
		    String json = ow.writeValueAsString(restaurants.values());

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
		return restaurant;
	}

	private int calculateLastIndex() {
		int maxId = -1;
		for(Restaurant r : restaurants.values()) {
			if(r.getId()>maxId)
				maxId=r.getId();
		}
		maxId++;
		return maxId;
	}
}
