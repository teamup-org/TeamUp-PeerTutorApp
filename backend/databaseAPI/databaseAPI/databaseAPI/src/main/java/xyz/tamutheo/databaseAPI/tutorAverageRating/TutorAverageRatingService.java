package xyz.tamutheo.databaseAPI.tutorAverageRating;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TutorAverageRatingService {
    @Autowired
    private TutorAverageRatingMapper tutorAverageRatingMapper;
    public List<TutorAverageRatingModel> read(Integer tutorId) {
        return this.tutorAverageRatingMapper.read(tutorId);
    }
}
