package xyz.tamutheo.databaseAPI.seniority;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/seniority")
public class SeniorityController {
@Autowired
private SeniorityService seniorityService;
@GetMapping(value = {"", "/"})
public List<SeniorityModel> respond() {
    return this.seniorityService.read();
}
}