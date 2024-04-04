package xyz.tamutheo.databaseAPI.userActiveStatus;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/user_active_status")
public class UserActiveStatusController {
    @Autowired
    private UserActiveStatusService userActiveStatusService;
    @GetMapping(value = {"", "/"})
    public List<UserActiveStatusModel> read(@RequestParam(name = "user_active_status_name", required = false) String userActiveStatusName,
                                            @RequestParam(name = "limit", required = false) Integer limit,
                                            @RequestParam(name = "offset", required = false) Integer offset) {
        return this.userActiveStatusService.read(limit, offset, userActiveStatusName);
    }
}