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
import entities.Restaurant;
import entities.User;

public class DelivererDAO {
	private Map<Integer, Deliverer> deliverers = new HashMap<>();
	private String contextPath = "";
	
	public DelivererDAO() {
		loadDeliverers();
	}
	
	public DelivererDAO(String contextPath) {
		this.contextPath = contextPath;
		loadDeliverers();
	}
	
	public Deliverer findById(int id) {
		if (!deliverers.containsKey(id)) {
			return null;
		}
		Deliverer deliverer = deliverers.get(id);
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
				deliverers.put(d.getId(), d);
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
	
	public void addDeliverer(Deliverer deliverer) {
		File file = new File(contextPath + "storage\\deliverers.txt");
		
		deliverers.put(deliverer.getId(), deliverer);
		
		BufferedWriter writer = null;
		try {
		    ObjectWriter ow = new ObjectMapper().writer().withDefaultPrettyPrinter();
		    String json = ow.writeValueAsString(deliverers.values());

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
	
	public Deliverer updateDeliverer(Deliverer deliverer) {
		File file = new File(contextPath + "storage\\deliverers.txt");
		
		deliverers.put(deliverer.getId(), deliverer);
		
		BufferedWriter writer = null;
		try {
		    ObjectWriter ow = new ObjectMapper().writer().withDefaultPrettyPrinter();
		    String json = ow.writeValueAsString(deliverers.values());

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
		return deliverer;
	}

}
