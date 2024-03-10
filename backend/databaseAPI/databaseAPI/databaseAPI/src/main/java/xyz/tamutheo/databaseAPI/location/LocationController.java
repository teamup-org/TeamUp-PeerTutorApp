package xyz.tamutheo.databaseAPI.location;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping("/location")
public class LocationController {
    @Autowired
    private LocationService locationService;
    @GetMapping(value = {"", "/"})
    public List<LocationModel> read(@RequestParam(name = "location_name_in", required = false) String locationNameIn,
                                    @RequestParam(name = "limit", required = false) Integer limit,
                                    @RequestParam(name = "offset", required = false) Integer offset) {
        List<String> locationNameInList = null;
        if (locationNameIn != null) {
            locationNameInList = Arrays.asList(locationNameIn.split(", "));
            for (int idx = 0; idx < locationNameInList.size(); idx++) {
                locationNameInList.set(idx, locationNameInList.get(idx).trim());
            }
        }
        return this.locationService.read(locationNameInList,
                limit,
                offset);
    }
}