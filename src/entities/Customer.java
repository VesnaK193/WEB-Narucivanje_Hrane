package entities;

import java.util.Collection;

public class Customer extends User {
	private Collection<Order> allOrders;
	private ShoppingCart shoppingCart;
	private double numberOfPoints;

}
