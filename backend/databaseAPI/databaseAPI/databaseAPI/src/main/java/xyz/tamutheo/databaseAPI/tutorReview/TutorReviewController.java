package xyz.tamutheo.databaseAPI.tutorReview;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/tutor_review")
public class TutorReviewController {
    @Autowired
    private TutorReviewService tutorReviewService;
    @GetMapping(value = {"", "/"})
    public List<TutorReviewModel> read(@RequestParam(name = "tutor_id", required = false) Integer tutorId,
                                       @RequestParam(name = "tutee_id", required = false) Integer tuteeId) {
        return this.tutorReviewService.read(tutorId, tuteeId);
    }
    @PostMapping(value = {"", "/"})
    public void create(@RequestParam(name = "tutor_id") Integer tutorId,
                       @RequestParam(name = "tutee_id") Integer tuteeId,
                       @RequestParam(name = "rating_id") Integer ratingId,
                       @RequestParam(name = "review_text") String reviewText) {
        TutorReviewModel tutorReviewModel = TutorReviewModel.builder()
                .tutorId(tutorId)
                .tuteeId(tuteeId)
                .ratingId(ratingId)
                .reviewText(reviewText)
                .build();
        this.tutorReviewService.create(tutorReviewModel);
    }
    @PutMapping(value = {"", "/"})
    public void update(@RequestParam(name = "tutor_id_old") Integer tutorIdOld,
                       @RequestParam(name = "tutee_id_old") Integer tuteeIdOld,
                       @RequestParam(name = "rating_id_new") Integer ratingIdNew,
                       @RequestParam(name = "review_text_new") String reviewTextNew) {
        TutorReviewModel tutorReviewModelOld = TutorReviewModel.builder()
                .tutorId(tutorIdOld)
                .tuteeId(tuteeIdOld)
                .build();
        TutorReviewModel tutorReviewModelNew = TutorReviewModel.builder()
                .ratingId(ratingIdNew)
                .reviewText(reviewTextNew)
                .build();
        this.tutorReviewService.update(tutorReviewModelOld, tutorReviewModelNew);
    }
    @DeleteMapping(value = {"", "/"})
    public void delete(@RequestParam(name = "tutor_id") Integer tutorId,
                       @RequestParam(name = "tutee_id", required = false) Integer tuteeId) {
        TutorReviewModel tutorReviewModel= TutorReviewModel.builder()
                .tutorId(tutorId)
                .tuteeId(tuteeId)
                .build();
        this.tutorReviewService.delete(tutorReviewModel);
    }
}