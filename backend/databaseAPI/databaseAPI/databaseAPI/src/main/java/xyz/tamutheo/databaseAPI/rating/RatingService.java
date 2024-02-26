package xyz.tamutheo.databaseAPI.rating;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RatingService {
    @Autowired
    private RatingMapper ratingMapper;
    public List<RatingModel> read() {
        return this.ratingMapper.read();
    }
}