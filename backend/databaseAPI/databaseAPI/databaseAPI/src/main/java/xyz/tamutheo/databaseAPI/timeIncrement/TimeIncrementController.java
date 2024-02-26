package xyz.tamutheo.databaseAPI.timeIncrement;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/time_increment")
public class TimeIncrementController {
@Autowired
private TimeIncrementService timeIncrementService;
@GetMapping(value = {"", "/"})
public List<TimeIncrementModel> respond() {
    return this.timeIncrementService.read();
}
}