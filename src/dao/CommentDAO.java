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

import entities.Comment;
import entities.Restaurant;
import entities.User;

public class CommentDAO {
	private Map<Integer, Comment> comments = new HashMap<>();
	private String contextPath = "";
	
	public CommentDAO() {
		loadComments();
	}
	
	public CommentDAO(String contextPath) {
		this.contextPath = contextPath;
		loadComments();
	}
	
	public Comment findById(int id) {
		if (!comments.containsKey(id)) {
			return null;
		}
		Comment comment = comments.get(id);
		return comment;
	}
	
	public Collection<Comment> findAll() {
		return comments.values();
	}

	public Collection<Comment> findAllByRestaurantId(Restaurant r) {
		Collection<Comment> restaurantComments = new ArrayList<>();
		System.out.println(comments.values().size());
		for(Comment c : comments.values()) {
			if(c.getRestaurant().getId() == r.getId())
				restaurantComments.add(c);
		}
		return restaurantComments;
	}

	public Collection<Comment> findAllApprovedByRestaurantId(Restaurant r) {
		Collection<Comment> restaurantComments = new ArrayList<>();
		System.out.println(comments.values().size());
		for(Comment c : comments.values()) {
			if(c.getRestaurant().getId() == r.getId() && c.getApproved().equals("YES"))
				restaurantComments.add(c);
		}
		return restaurantComments;
	}
	
	public void loadComments() {
		BufferedReader reader = null;
		try {
			File file = new File(contextPath + "storage\\comments.txt");
			reader = new BufferedReader(new FileReader(file));
			String json = reader.lines().collect(Collectors.joining());
			Collection<Comment> cList = new ObjectMapper().readValue(json, new TypeReference<List<Comment>>(){});
			
			for(Comment c : cList) {
				comments.put(c.getId(), c);
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
	
	public Comment addComment(Comment comment) {
		File file = new File(contextPath + "storage\\comments.txt");
		comment.setId(calculateLastIndex());
		comments.put(comment.getId(), comment);
		
		BufferedWriter writer = null;
		try {
		    ObjectWriter ow = new ObjectMapper().writer().withDefaultPrettyPrinter();
		    String json = ow.writeValueAsString(comments.values());

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
		return comment;
	}
	
	public Comment updateComment(Comment comment) {
		File file = new File(contextPath + "storage\\comments.txt");
		
		comments.put(comment.getId(), comment);
		
		BufferedWriter writer = null;
		try {
		    ObjectWriter ow = new ObjectMapper().writer().withDefaultPrettyPrinter();
		    String json = ow.writeValueAsString(comments.values());

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
		return comment;
	}

	public Double updateAndReturnAverageRating(Comment comment) {
		File file = new File(contextPath + "storage\\comments.txt");
		
		comments.put(comment.getId(), comment);
		
		BufferedWriter writer = null;
		try {
		    ObjectWriter ow = new ObjectMapper().writer().withDefaultPrettyPrinter();
		    String json = ow.writeValueAsString(comments.values());

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
		
		//Calculate avrage rating for commented restaurant
		Collection<Comment> restaurantComments = findAllByRestaurantId(comment.getRestaurant());
		Double average = 0.00;
		for(Comment c: restaurantComments) {
			average += c.getRating();
		}
		System.out.println(average);
		average = average/restaurantComments.size();
		System.out.println(restaurantComments.size());
		System.out.println(average);
		return average;
	}

	private int calculateLastIndex() {
		int maxId = -1;
		for(Comment c : comments.values()) {
			if(c.getId()>maxId)
				maxId=c.getId();
		}
		maxId++;
		return maxId;
	}
}
