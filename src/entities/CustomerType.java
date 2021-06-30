package entities;

import enums.CustomerTypeName;

public class CustomerType {
	private CustomerTypeName typeName;
	private double discount;
	private double pointsToNextType;
	
	public CustomerType () {
		
	}

	public CustomerTypeName getTypeName() {
		return typeName;
	}

	public void setTypeName(CustomerTypeName typeName) {
		this.typeName = typeName;
	}

	public double getDiscount() {
		return discount;
	}

	public void setDiscount(double discount) {
		this.discount = discount;
	}

	public double getPointsToNextType() {
		return pointsToNextType;
	}

	public void setPointsToNextType(double pointsToNextType) {
		this.pointsToNextType = pointsToNextType;
	}
	
	
}
