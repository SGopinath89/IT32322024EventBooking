package com.example.demo.Models;

import java.sql.Date;
import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;

@Entity
public class Event {
@Id
@GeneratedValue(strategy = GenerationType.IDENTITY)
private int id;
private String name;
private String venue;
private double price;
private Date date;

@OneToMany(mappedBy = "event")
private List<Reservation> reservations;

//empty constructor
public Event() {
	
}

public Event(int id, String name, String venue, double price, Date date) {
	super();
	this.id = id;
	this.name = name;
	this.venue = venue;
	this.price = price;
	this.date = date;
}

public int getId() {
	return id;
}

public void setId(int id) {
	this.id = id;
}

public String getName() {
	return name;
}

public void setName(String name) {
	this.name = name;
}

public String getVenue() {
	return venue;
}

public void setVenue(String venue) {
	this.venue = venue;
}

public double getPrice() {
	return price;
}

public void setPrice(double price) {
	this.price = price;
}

public Date getDate() {
	return date;
}

public void setDate(Date date) {
	this.date = date;
}

}
