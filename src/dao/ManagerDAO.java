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

import entities.Manager;
import entities.User;

public class ManagerDAO {
	private Map<String, Manager> managers = new HashMap<>();
	private String contextPath = "";
	
	public ManagerDAO() {
		loadManagers();
	}
	
	public ManagerDAO(String contextPath) {
		this.contextPath = contextPath;
		loadManagers();
	}
	
	public User findByUsernameAndPassword(String username, String password) {
		if (!managers.containsKey(username)) {
			return null;
		}
		Manager manager = managers.get(username);
		if (!manager.getPassword().equals(password)) {
			return null;
		}
		return manager;
	}
	
	public Manager findByUsername(String username) {
		if (!managers.containsKey(username)) {
			return null;
		}
		Manager manager = managers.get(username);
		return manager;
	}
	
	public Collection<Manager> findAll() {
		return managers.values();
	}
	
	public void loadManagers() {
		BufferedReader reader = null;
		try {
			File file = new File(contextPath + "storage\\managers.txt");
			reader = new BufferedReader(new FileReader(file));
			String json = reader.lines().collect(Collectors.joining());
			System.out.println(json);
			Collection<Manager> mList = new ObjectMapper().readValue(json, new TypeReference<List<Manager>>(){});
			
			for(Manager m : mList) {
				managers.put(m.getUsername(), m);
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
	
	public void addManager(Manager manager) {
		File file = new File(contextPath + "storage\\managers.txt");
		
		managers.put(manager.getUsername(), manager);
		
		BufferedWriter writer = null;
		try {
		    ObjectWriter ow = new ObjectMapper().writer().withDefaultPrettyPrinter();
		    String json = ow.writeValueAsString(managers.values());

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
