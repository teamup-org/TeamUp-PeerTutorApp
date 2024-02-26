package xyz.tamutheo.databaseAPI.tutorReview;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TutorReviewService {
    @Autowired
    private TutorReviewMapper tutorReviewMapper;
    public List<TutorReviewModel> read(Integer tutorId, Integer tuteeId)  {
        return this.tutorReviewMapper.read(tutorId, tuteeId);
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