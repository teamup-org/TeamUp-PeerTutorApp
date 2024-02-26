package xyz.tamutheo.databaseAPI.initiatorType;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/initiator_type")
public class InitiatorTypeController {
    @Autowired
    private InitiatorTypeService initiatorTypeService;
    @GetMapping(value = {"", "/"})
    public List<InitiatorTypeModel> respond() {
        return this.initiatorTypeService.read();
    }
}