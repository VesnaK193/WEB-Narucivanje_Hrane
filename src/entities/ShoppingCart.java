package entities;

import java.util.Collection;

public class ShoppingCart {
	private Collection<Product> products;
	private User user;
	private double price;
	
	public ShoppingCart () {
		
	}

	public Collection<Product> getProducts() {
		return products;
	}

	public void setProducts(Collection<Product> products) {
		this.products = products;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public double getPrice() {
		return price;
	}

	public void setPrice(double price) {
		this.price = price;
	}
	
	
}
