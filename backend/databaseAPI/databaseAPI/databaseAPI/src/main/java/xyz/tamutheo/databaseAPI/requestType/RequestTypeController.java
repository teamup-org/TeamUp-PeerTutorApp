package xyz.tamutheo.databaseAPI.requestType;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/request_type")
public class RequestTypeController {
    @Autowired
    private RequestTypeService requestTypeService;
    @GetMapping(value = {"", "/"})
    public List<RequestTypeModel> respond() {
        return this.requestTypeService.read();
    }
}