package lk.ac.vau.Controller;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lk.ac.vau.Model.Booking;
import lk.ac.vau.Repo.BookingRepo;

@RestController
@RequestMapping("/booking")
@CrossOrigin(origins = "http://localhost:3000")
public class BookingController {

    @Autowired
    private BookingRepo bookingRepo;

    @PostMapping
    public Booking createBooking(@RequestBody Booking booking) {
        return bookingRepo.save(booking);
    }

    @GetMapping("/check/{eid}")
    public List<Integer> getSeatsByEventId(@PathVariable Integer eid) {
        List<Booking> bookings = bookingRepo.findByEventEid(eid);
        return bookings.stream().map(Booking::getSeatno).collect(Collectors.toList());
    }
}
