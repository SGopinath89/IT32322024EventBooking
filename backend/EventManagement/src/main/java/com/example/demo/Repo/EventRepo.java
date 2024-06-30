package com.example.demo.Repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.Models.Event;

@Repository
public interface EventRepo extends JpaRepository<Event, Integer>{

}
