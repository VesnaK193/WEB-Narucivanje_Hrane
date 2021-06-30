package entities;

import java.util.Collection;

import enums.RestaurantStatus;

public class Restaurant {
	private String name;
	private String type;
	private Collection<Product> products;
	private RestaurantStatus restaurantStatus;
	private Location location;
	private String logo;
	
	public Restaurant () {
		
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public Collection<Product> getProducts() {
		return products;
	}

	public void setProducts(Collection<Product> products) {
		this.products = products;
	}

	public RestaurantStatus getRestaurantStatus() {
		return restaurantStatus;
	}

	public void setRestaurantStatus(RestaurantStatus restaurantStatus) {
		this.restaurantStatus = restaurantStatus;
	}

	public Location getLocation() {
		return location;
	}

	public void setLocation(Location location) {
		this.location = location;
	}

	public String getLogo() {
		return logo;
	}

	public void setLogo(String logo) {
		this.logo = logo;
	}

	
}
