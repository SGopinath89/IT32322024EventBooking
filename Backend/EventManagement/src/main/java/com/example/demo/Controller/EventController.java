package com.example.demo.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.Models.Event;
import com.example.demo.Models.Reservation;
import com.example.demo.Repo.EventRepo;
import com.example.demo.Repo.ReservationRepo;

@RestController
@CrossOrigin("http://localhost:3000")
public class EventController {

	@Autowired
	private EventRepo eventRepo;
	
	
	@Autowired
	private ReservationRepo resRepo;
	
	//save some data
	@PostMapping("/events")
	Event newEvent(@RequestBody Event newEvent) {
		return eventRepo.save(newEvent);
	}
	
	//save multiple data
	@PostMapping("/events/multiple")
    public List<Event> newEvents(@RequestBody List<Event> newEvents) {
        return eventRepo.saveAll(newEvents);
    }
	
	//get data
	@GetMapping("/events")
	List<Event>getAllEvents(){
		return eventRepo.findAll();
	}
	
	//get event by id
	@GetMapping("/events/{id}")
	Event getEventById(@PathVariable int id) {
		return eventRepo.findById(id).orElseThrow();
	}
	
	@PostMapping("/events/{eventId}/reserve")
	public Reservation reserveEvent(@PathVariable Integer eventId, @RequestBody Reservation reservation) {
	    Event event = eventRepo.findById(eventId).orElse(null);
	    if (event != null) {
	        reservation.setEvent(event);
	        return resRepo.save(reservation);
	    }
	    return null; // Handle case when event is not found, if needed
	}

	
	//get details of reservations
	public List<Reservation>getReservations(){
		return resRepo.findAll();
	}
	
	// Delete event by ID
	  @DeleteMapping("/events/{id}")
	  void deleteEvent(@PathVariable int id) {
	      eventRepo.deleteById(id);
	  }
	
	
}
