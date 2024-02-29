package xyz.tamutheo.databaseAPI.tutorAverageRating;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/tutor_average_rating")
public class TutorAverageRatingController {
    @Autowired
    private TutorAverageRatingService tutorAverageRatingService;
    @GetMapping(value = {"", "/"})
    public List<TutorAverageRatingModel> read(@RequestParam(name = "tutor_id", required = false) Integer tutorId) {
        return this.tutorAverageRatingService.read(tutorId);
    }
}
