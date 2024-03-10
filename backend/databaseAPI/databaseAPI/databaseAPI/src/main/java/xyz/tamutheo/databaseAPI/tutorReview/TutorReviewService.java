package xyz.tamutheo.databaseAPI.tutorReview;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TutorReviewService {
    @Autowired
    private TutorReviewMapper tutorReviewMapper;
    public List<TutorReviewModel> read(Integer appointmentIdEquals,
                                       Integer numberStarsGreaterThanOrEquals,
                                       Integer numberStarsLessThanOrEquals,
                                       String reviewTextContains,
                                       String tuteeEmailContains,
                                       String tutorEmailContains,
                                       Integer limit,
                                       Integer offset)  {
        return this.tutorReviewMapper.read(appointmentIdEquals,
                numberStarsGreaterThanOrEquals,
                numberStarsLessThanOrEquals,
                reviewTextContains,
                tuteeEmailContains,
                tutorEmailContains,
                limit,
                offset);
    }
    public void create(TutorReviewModel tutorReviewModel) {
        this.tutorReviewMapper.create(tutorReviewModel);
    }
    public void update(TutorReviewModel tutorReviewModelOld, TutorReviewModel tutorReviewModelNew) {
        this.tutorReviewMapper.update(tutorReviewModelOld, tutorReviewModelNew);
    }
    public void delete(TutorReviewModel tutorReviewModel) {
        this.tutorReviewMapper.delete(tutorReviewModel);
    }
}