package xyz.tamutheo.databaseAPI.custom.tutorListing;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/tutor_listing")
public class TutorListingController {
    @Autowired
    private TutorListingService tutorListingService;
    @GetMapping(value = {"", "/"})
    public List<TutorListingModel> read(@RequestParam(name = "tutor_id", required = false) Integer tutorId) {
        return this.tutorListingService.read(tutorId);
    }
}