package xyz.tamutheo.databaseAPI.rating;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/rating")
public class RatingController {
    @Autowired
    private RatingService ratingService;
    @GetMapping(value = {"", "/"})
    public List<RatingModel> respond() {
        return this.ratingService.read();
    }
}