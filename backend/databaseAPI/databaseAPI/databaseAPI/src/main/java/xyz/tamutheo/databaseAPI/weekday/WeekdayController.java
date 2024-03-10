package xyz.tamutheo.databaseAPI.weekday;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping("/weekday")
public class WeekdayController {
    @Autowired
    private WeekdayService weekdayService;
    @GetMapping(value = {"", "/"})
    public List<WeekdayModel> read(@RequestParam(name = "weekday_name_in", required = false) String weekdayNameIn,
                                   @RequestParam(name = "limit", required = false) Integer limit,
                                   @RequestParam(name = "offset", required = false) Integer offset) {
        List<String> weekdayNameInList = null;
        if (weekdayNameIn != null) {
            weekdayNameInList = Arrays.asList(weekdayNameIn.split(", "));
            for (int idx = 0; idx < weekdayNameInList.size(); idx++) {
                weekdayNameInList.set(idx, weekdayNameInList.get(idx).trim());
            }
        }
        return this.weekdayService.read(weekdayNameInList,
                limit,
                offset);
    }
}
