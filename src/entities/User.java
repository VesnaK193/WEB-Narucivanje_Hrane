package entities;

import java.util.Date;

public class User {
	private String username;
	private String password;
	private String firstname;
	private String lastname;
	private String gender;
	private Date birthday;
	private String role;
	private CustomerType typeOfCustomer;
	
	public User() {}
	
	public User(String username, String password, String firstname, String lastname, String gender, Date birthday,String role, CustomerType typeOfCustomer) {
		this.username = username;
		this.password = password;
		this.firstname = firstname;
		this.lastname = lastname;
		this.gender = gender;
		this.birthday = birthday;
		this.role = role;
		this.typeOfCustomer = typeOfCustomer;
	}
	
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getFirstname() {
		return firstname;
	}
	public void setFirstname(String firstname) {
		this.firstname = firstname;
	}
	public String getLastname() {
		return lastname;
	}
	public void setLastname(String lastname) {
		this.lastname = lastname;
	}
	public String getGender() {
		return gender;
	}
	public void setGender(String gender) {
		this.gender = gender;
	}
	public Date getBirthday() {
		return birthday;
	}
	public void setBirthday(Date birthday) {
		this.birthday = birthday;
	}
	public String getRole() {
		return role;
	}
	public void setRole(String role) {
		this.role = role;
	}
	public CustomerType getTypeOfCustomer() {
		return typeOfCustomer;
	}
	public void setTypeOfCustomer(CustomerType typeOfCustomer) {
		this.typeOfCustomer = typeOfCustomer;
	}
	
	

}
