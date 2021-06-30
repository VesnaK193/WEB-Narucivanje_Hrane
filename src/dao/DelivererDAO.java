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

import entities.Deliverer;
import entities.Manager;
import entities.User;

public class DelivererDAO {
	private Map<String, Deliverer> deliverers = new HashMap<>();
	private String contextPath = "";
	
	public DelivererDAO() {
		loadDeliverers();
	}
	
	public DelivererDAO(String contextPath) {
		this.contextPath = contextPath;
		loadDeliverers();
	}
	
	public User findByUsernameAndPassword(String username, String password) {
		if (!deliverers.containsKey(username)) {
			return null;
		}
		Deliverer deliverer = deliverers.get(username);
		if (!deliverer.getPassword().equals(password)) {
			return null;
		}
		return deliverer;
	}
	
	public Deliverer findByUsername(String username) {
		if (!deliverers.containsKey(username)) {
			return null;
		}
		Deliverer deliverer = deliverers.get(username);
		return deliverer;
	}
	
	public Collection<Deliverer> findAll() {
		return deliverers.values();
	}
	
	public void loadDeliverers() {
		BufferedReader reader = null;
		try {
			File file = new File(contextPath + "storage\\deliverers.txt");
			reader = new BufferedReader(new FileReader(file));
			String json = reader.lines().collect(Collectors.joining());
			System.out.println(json);
			Collection<Deliverer> dList = new ObjectMapper().readValue(json, new TypeReference<List<Deliverer>>(){});
			
			for(Deliverer d : dList) {
				deliverers.put(d.getUsername(), d);
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
	
	public void addDeliverer(Deliverer deliverer) {
		File file = new File(contextPath + "storage\\deliverers.txt");
		
		deliverers.put(deliverer.getUsername(), deliverer);
		
		BufferedWriter writer = null;
		try {
		    ObjectWriter ow = new ObjectMapper().writer().withDefaultPrettyPrinter();
		    String json = ow.writeValueAsString(deliverers.values());

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

}
