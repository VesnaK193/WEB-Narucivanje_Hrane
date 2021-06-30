package entities;

import java.util.Collection;
import java.util.Date;

public class Deliverer extends User {
	 private Collection<Order> orders;
	 
	 public Deliverer() {
		 super();
	 }

	public Collection<Order> getOrders() {
		return orders;
	}

	public void setOrders(Collection<Order> orders) {
		this.orders = orders;
	}
	 
}
