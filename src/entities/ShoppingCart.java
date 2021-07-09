package entities;

import java.util.Collection;

public class ShoppingCart {
	private Collection<Product> products;
	private Customer customer;
	private double price;
	
	public ShoppingCart () {
		
	}

	public Collection<Product> getProducts() {
		return products;
	}

	public void setProducts(Collection<Product> products) {
		this.products = products;
	}

	public Customer getCustomer() {
		return customer;
	}

	public void setCustomer(Customer customer) {
		this.customer = customer;
	}

	public double getPrice() {
		return price;
	}

	public void setPrice(double price) {
		this.price = price;
	}
	
	
}
