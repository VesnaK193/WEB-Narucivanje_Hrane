package entities;

import java.util.Collection;

public class Customer extends User {
	private Collection<Order> allOrders;
	private ShoppingCart shoppingCart;
	private double numberOfPoints;
	private CustomerType typeOfCustomer;
	
	public Customer () {
		super();
	}

	public Collection<Order> getAllOrders() {
		return allOrders;
	}

	public void setAllOrders(Collection<Order> allOrders) {
		this.allOrders = allOrders;
	}

	public ShoppingCart getShoppingCart() {
		return shoppingCart;
	}

	public void setShoppingCart(ShoppingCart shoppingCart) {
		this.shoppingCart = shoppingCart;
	}

	public double getNumberOfPoints() {
		return numberOfPoints;
	}

	public void setNumberOfPoints(double numberOfPoints) {
		this.numberOfPoints = numberOfPoints;
	}

	public CustomerType getTypeOfCustomer() {
		return typeOfCustomer;
	}

	public void setTypeOfCustomer(CustomerType typeOfCustomer) {
		this.typeOfCustomer = typeOfCustomer;
	}
	
	
}
