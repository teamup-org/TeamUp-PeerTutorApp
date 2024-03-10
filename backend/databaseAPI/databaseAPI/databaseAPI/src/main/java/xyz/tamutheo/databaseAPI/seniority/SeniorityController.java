package xyz.tamutheo.databaseAPI.seniority;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping("/seniority")
public class SeniorityController {
@Autowired
private SeniorityService seniorityService;
@GetMapping(value = {"", "/"})
public List<SeniorityModel> read(@RequestParam(name = "seniority_name_in", required = false) String seniorityNameIn,
                                 @RequestParam(name = "limit", required = false) Integer limit,
                                 @RequestParam(name = "offset", required = false) Integer offset) {
    List<String> seniorityNameInList = null;
    if (seniorityNameIn != null) {
        seniorityNameInList = Arrays.asList(seniorityNameIn.split(", "));
        for (int idx = 0; idx < seniorityNameInList.size(); idx++) {
            seniorityNameInList.set(idx, seniorityNameInList.get(idx).trim());
        }
    }
    return this.seniorityService.read(seniorityNameInList, limit, offset);
}
}