package entities;

import java.util.Collection;
import java.util.Date;

import enums.OrderStatus;

public class Order {
	private String orderId;
	private Collection<Product> orderedProducts;
	private Restaurant restaurantOfOrder;
	private Date orderDateAndTime;
	private double orderPrice;
	private Customer customerName;
	private OrderStatus orderStatus;

}
