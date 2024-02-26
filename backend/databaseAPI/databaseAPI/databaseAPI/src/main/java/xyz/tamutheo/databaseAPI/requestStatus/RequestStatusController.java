package xyz.tamutheo.databaseAPI.requestStatus;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/request_status")
public class RequestStatusController {
    @Autowired
    private RequestStatusService requestStatusService;
    @GetMapping(value = {"", "/"})
    public List<RequestStatusModel> respond() {
        return this.requestStatusService.read();
    }
}