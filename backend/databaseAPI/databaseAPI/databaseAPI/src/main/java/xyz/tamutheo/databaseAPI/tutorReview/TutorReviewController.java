package xyz.tamutheo.databaseAPI.tutorReview;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import xyz.tamutheo.databaseAPI.appointment.AppointmentModel;
import xyz.tamutheo.databaseAPI.util.paginationContainer.PaginationContainerModel;

import java.util.List;

@RestController
@RequestMapping("/tutor_review")
public class TutorReviewController {
    @Autowired
    private TutorReviewService tutorReviewService;
    @PostMapping(value = {"", "/"})
    public void create(@RequestParam(name = "appointment_id") Integer appointmentId,
                       @RequestParam(name = "number_stars") Integer numberStars,
                       @RequestParam(name = "review_text") String reviewText,
                       @RequestParam(name = "tutee_email") String tuteeEmail,
                       @RequestParam(name = "tutor_email") String tutorEmail) {
        TutorReviewModel tutorReviewModel = TutorReviewModel.builder()
                .appointmentId(appointmentId)
                .numberStars(numberStars)
                .reviewText(reviewText)
                .tuteeEmail(tuteeEmail)
                .tutorEmail(tutorEmail)
                .build();
        this.tutorReviewService.create(tutorReviewModel);
    }
    @GetMapping(value = {"", "/"})
    public PaginationContainerModel read(@RequestParam(name = "appointment_id_equals", required = false) Integer appointmentIdEquals,
                                         @RequestParam(name = "number_stars_greater_than_or_equals", required = false) Integer numberStarsGreaterThanOrEquals,
                                         @RequestParam(name = "number_stars_less_than_or_equals", required = false) Integer numberStarsLessThanOrEquals,
                                         @RequestParam(name = "review_text_contains", required = false) String reviewTextContains,
                                         @RequestParam(name = "tutee_email_contains", required = false) String tuteeEmailContains,
                                         @RequestParam(name = "tutor_email_contains", required = false) String tutorEmailContains,
                                         @RequestParam(name = "page_number", required = false, defaultValue = "1") Integer pageNumber,
                                         @RequestParam(name = "number_entries_per_page", required = false) Integer numberEntriesPerPage) {
        return this.tutorReviewService.read(appointmentIdEquals,
                numberStarsGreaterThanOrEquals,
                numberStarsLessThanOrEquals,
                reviewTextContains,
                tuteeEmailContains,
                tutorEmailContains,
                pageNumber,
                numberEntriesPerPage);
    }
    @GetMapping(value = {"/pending_reviews"})
    public List<AppointmentModel> getPendingReviews(@RequestParam(name = "tutee_email") String tuteeEmail) {
        return this.tutorReviewService.getPendingReviews(tuteeEmail);
    }
    //    @PutMapping(value = {"", "/"})
    @RequestMapping(value = {"/update"})
    public void update(@RequestParam(name = "appointment_id_old") Integer appointmentIdOld,
                       @RequestParam(name = "tutee_email_old") String tuteeEmailOld,
                       @RequestParam(name = "tutor_email_old") String tutorEmailOld,
                       @RequestParam(name = "number_stars_new", required = false) Integer numberStarsNew,
                       @RequestParam(name = "review_text_new", required = false) String reviewTextNew) {
        TutorReviewModel tutorReviewModelOld = TutorReviewModel.builder()
                .appointmentId(appointmentIdOld)
                .tuteeEmail(tuteeEmailOld)
                .tutorEmail(tutorEmailOld)
                .build();
        TutorReviewModel tutorReviewModelNew = TutorReviewModel.builder()
                .numberStars(numberStarsNew)
                .reviewText(reviewTextNew)
                .build();
        this.tutorReviewService.update(tutorReviewModelOld, tutorReviewModelNew);
    }
    @DeleteMapping(value = {"", "/"})
    public void delete(@RequestParam(name = "appointment_id") Integer appointmentId,
                       @RequestParam(name = "tutee_email") String tuteeEmail,
                       @RequestParam(name = "tutor_email") String tutorEmail) {
        TutorReviewModel tutorReviewModel= TutorReviewModel.builder()
                .appointmentId(appointmentId)
                .tuteeEmail(tuteeEmail)
                .tutorEmail(tutorEmail)
                .build();
        this.tutorReviewService.delete(tutorReviewModel);
    }
}