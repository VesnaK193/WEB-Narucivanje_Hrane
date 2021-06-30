package entities;

import java.util.Date;

public class Manager extends User {
	private Restaurant restaurant;

	public Manager () {
		super();
	}
	public Manager (String username, String password, String firstname, String lastname, String gender, Date birthday,String role, Restaurant restaurant) {
		super(username, password, firstname, lastname, gender, birthday, role);
		this.restaurant = restaurant;
	}

	public Restaurant getRestaurant() {
		return restaurant;
	}

	public void setRestaurant(Restaurant restaurant) {
		this.restaurant = restaurant;
	}
	
	
}
