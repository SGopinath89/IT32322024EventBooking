package lk.ac.vau.Repo;

import org.springframework.stereotype.Repository;
import lk.ac.vau.Model.User;

@Repository
public interface UserRepo extends EventTicketingRepo<User, Integer> {
}
