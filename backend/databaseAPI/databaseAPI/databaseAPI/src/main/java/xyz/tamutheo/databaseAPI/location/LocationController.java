package xyz.tamutheo.databaseAPI.location;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/location")
public class LocationController {
    @Autowired
    private LocationService locationService;
    @GetMapping(value = {"", "/"})
    public List<LocationModel> respond() {
        return this.locationService.read();
    }
}