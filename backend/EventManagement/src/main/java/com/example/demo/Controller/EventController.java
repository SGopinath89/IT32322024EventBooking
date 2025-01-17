
package lk.ac.vau.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lk.ac.vau.Model.Event;
import lk.ac.vau.Repo.EventRepo;

import java.util.Collections;

@RestController
@RequestMapping("/event")
@CrossOrigin(origins = "http://localhost:3000")
public class EventController extends EventTicketingSystemController<Event, Integer> {

    @Autowired
    private EventRepo eventRepo;

    @PostMapping
    public Event createEvent(@RequestBody Event event) {
        return eventRepo.save(event);
    }

    @GetMapping("/count")
    public ResponseEntity<?> getEventCount() {
        long count = eventRepo.count();
        return ResponseEntity.ok(Collections.singletonMap("count", count));
    }
}