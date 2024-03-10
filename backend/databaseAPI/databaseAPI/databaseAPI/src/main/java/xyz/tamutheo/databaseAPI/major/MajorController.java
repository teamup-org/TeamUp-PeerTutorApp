package xyz.tamutheo.databaseAPI.major;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/major")
public class MajorController {
    @Autowired
    private MajorService majorService;
    @GetMapping(value = {"", "/"})
    public List<MajorModel> read(@RequestParam(name = "major_abbreviation_contains", required = false) String majorAbbreviationContains,
                                 @RequestParam(name = "major_name_contains", required = false) String majorNameContains,
                                 @RequestParam(name = "limit", required = false) Integer limit,
                                 @RequestParam(name = "offset", required = false) Integer offset) {
        return this.majorService.read(majorAbbreviationContains, majorNameContains, limit, offset);
    }
}