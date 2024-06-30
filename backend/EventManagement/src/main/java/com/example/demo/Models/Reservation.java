package com.example.demo.Models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class Reservation {
   @Id
   @GeneratedValue(strategy = GenerationType.IDENTITY)
   private int id;
   
   @ManyToOne
   @JoinColumn(name = "event_id")  
   private Event event;
   private String userEmail;

   
   public Reservation() {
	   
   }

public Reservation(int id, Event event, String userEmail) {
	super();
	this.id = id;
	this.event = event;
	this.userEmail = userEmail;
}

public int getId() {
	return id;
}

public void setId(int id) {
	this.id = id;
}

public Event getEvent() {
	return event;
}

public void setEvent(Event event) {
	this.event = event;
}

public String getUserEmail() {
	return userEmail;
}

public void setUserEmail(String userEmail) {
	this.userEmail = userEmail;
}
   
}
