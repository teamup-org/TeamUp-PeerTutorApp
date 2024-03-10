package xyz.tamutheo.databaseAPI.rating;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/rating")
public class RatingController {
    @Autowired
    private RatingService ratingService;
    @GetMapping(value = {"", "/"})
    public List<RatingModel> read(@RequestParam(name = "number_stars_equals", required = false) Integer numberStarsEquals,
                                  @RequestParam(name = "number_stars_greater_than_or_equals", required = false) Integer numberStarsGreaterThanOrEquals,
                                  @RequestParam(name = "number_stars_less_than_or_equals", required = false) Integer numberStarsLessThanOrEquals,
                                  @RequestParam(name = "limit", required = false) Integer limit,
                                  @RequestParam(name = "offset", required = false) Integer offset) {
        return this.ratingService.read(numberStarsEquals,
                numberStarsGreaterThanOrEquals,
                numberStarsLessThanOrEquals,
                limit,
                offset);
    }
}