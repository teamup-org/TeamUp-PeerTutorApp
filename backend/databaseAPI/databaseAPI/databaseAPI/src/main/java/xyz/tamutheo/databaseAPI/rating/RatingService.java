package xyz.tamutheo.databaseAPI.rating;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RatingService {
    @Autowired
    private RatingMapper ratingMapper;
    public List<RatingModel> read(Integer numberStarsEquals,
                                  Integer numberStarsGreaterThanOrEquals,
                                  Integer numberStarsLessThanOrEquals,
                                  Integer limit,
                                  Integer offset) {
        return this.ratingMapper.read(numberStarsEquals,
                numberStarsGreaterThanOrEquals,
                numberStarsLessThanOrEquals,
                limit,
                offset);
    }
}