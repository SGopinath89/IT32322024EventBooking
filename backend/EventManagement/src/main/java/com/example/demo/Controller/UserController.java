package lk.ac.vau.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import lk.ac.vau.Model.User;
import lk.ac.vau.Repo.UserRepo;

@RestController
@RequestMapping("/user")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController extends EventTicketingSystemController<User, Integer> {
    @Autowired
    private UserRepo userRepo;

    @PostMapping
    public User createUser(@RequestBody User user) {
        return userRepo.save(user);
    }
}

