package entities;

import java.util.Collection;
import java.util.Date;

public class Deliverer extends User {
	 private Collection<Order> orders;
	 
	 public Deliverer() {
		 super();
	 }
	 
	 public Deliverer(String username, String password, String firstname, String lastname, String gender, Date birthday,String role) {
		 super(username, password, firstname, lastname, gender, birthday, role);
	 }

	public Collection<Order> getOrders() {
		return orders;
	}

	public void setOrders(Collection<Order> orders) {
		this.orders = orders;
	}
	 
}
