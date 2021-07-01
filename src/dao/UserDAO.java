package dao;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.nio.file.Files;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectReader;
import com.fasterxml.jackson.databind.ObjectWriter;

import entities.Restaurant;
import entities.User;

public class UserDAO {
	private Map<Integer, User> users = new HashMap<>();
	private String contextPath = "";
	
	public UserDAO() {
		loadUsers();
	}
	
	public UserDAO(String contextPath) {
		this.contextPath = contextPath;
		loadUsers();
	}
	
	public User findByUsernameAndPassword(String username, String password) {
		for(User u : users.values()) {
			if(u.getUsername().equals(username) && u.getPassword().equals(password)) 
				return u;
		}
		return null;
	}
	
	public User findByUsername(String username) {
		for(User u : users.values()) {
			if(u.getUsername().equals(username)) 
				return u;
		}
		return null;
	}

	public boolean isNewUsernameUnique(User user) {
		for(User u : users.values()) {
			if(u.getId()!=user.getId() && u.getUsername().equals(user.getUsername())) 
				return false;
		}
		return true;
	}
	
	public Collection<User> findAll() {
		return users.values();
	}
	
	public void loadUsers() {
		BufferedReader reader = null;
		try {
			File file = new File(contextPath + "storage\\users.txt");
			reader = new BufferedReader(new FileReader(file));
			String json = reader.lines().collect(Collectors.joining());
			System.out.println(json);
			Collection<User> uList = new ObjectMapper().readValue(json, new TypeReference<List<User>>(){});
			
			for(User u : uList) {
				users.put(u.getId(), u);
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
	
	public User updateUser(User user) {
		File file = new File(contextPath + "storage\\users.txt");
		
		users.put(user.getId(), user);
		
		BufferedWriter writer = null;
		try {
		    ObjectWriter ow = new ObjectMapper().writer().withDefaultPrettyPrinter();
		    String json = ow.writeValueAsString(users.values());

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
		return user;
	}
	
	public User addUser(User user) {
		File file = new File(contextPath + "storage\\users.txt");
		
		user.setId(calculateLastIndex());
		users.put(user.getId(), user);
		
		BufferedWriter writer = null;
		try {
		    ObjectWriter ow = new ObjectMapper().writer().withDefaultPrettyPrinter();
		    String json = ow.writeValueAsString(users.values());

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
		return user;
	}

	private int calculateLastIndex() {
		int maxId = -1;
		for(User u : users.values()) {
			if(u.getId()>maxId)
				maxId=u.getId();
		}
		maxId++;
		return maxId;
	}
	
}