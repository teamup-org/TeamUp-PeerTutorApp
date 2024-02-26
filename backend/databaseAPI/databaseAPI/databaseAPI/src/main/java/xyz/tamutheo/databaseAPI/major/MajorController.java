package xyz.tamutheo.databaseAPI.major;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/major")
public class MajorController {
    @Autowired
    private MajorService majorService;
    @GetMapping(value = {"", "/"})
    public List<MajorModel> respond() {
        return this.majorService.read();
    }
}