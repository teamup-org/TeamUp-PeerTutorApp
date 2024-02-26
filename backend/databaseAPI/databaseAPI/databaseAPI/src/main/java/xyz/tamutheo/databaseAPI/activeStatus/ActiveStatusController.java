package xyz.tamutheo.databaseAPI.activeStatus;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/active_status")
public class ActiveStatusController {
    @Autowired
    private ActiveStatusService activeStatusService;
    @GetMapping(value = {"", "/"})
    public List<ActiveStatusModel> respond() {
        return this.activeStatusService.read();
    }
}