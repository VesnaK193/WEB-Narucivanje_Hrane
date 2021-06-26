package entities;

import java.util.Collection;

import enums.RestaurantStatus;

public class Restaurant {
	private String nameOfRestaurant;
	private String typeOfRestaurant;
	private Collection<Product> products;
	private RestaurantStatus restaurantStatus;
	private Location restaurantLocation;
	private String logo;
}
