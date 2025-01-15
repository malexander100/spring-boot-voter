package com.example.voter.controller;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class CounterController {
    // We store the counter value as a class field so it persists between requests
    private int counter1 = 0;
    private int counter2 = 0;

    // These methods handle the first counter
    @MessageMapping("/increment1")
    @SendTo("/topic/counter1")
    public int incrementCounterOne() {
        return ++counter1;
    }

    @MessageMapping("/decrement1")
    @SendTo("/topic/counter1")
    public int decrementCounterOne() {
        return --counter1;
    }

    // These methods handle the second counter
    @MessageMapping("/increment2")
    @SendTo("/topic/counter2")
    public int incrementCounterTwo() {
        return ++counter2;
    }

    @MessageMapping("/decrement2")
    @SendTo("/topic/counter2")
    public int decrementCounterTwo() {
        return --counter2;
    }
}


