package xyz.tamutheo.databaseAPI.tutorEligibility;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/tutor_eligibility")
public class TutorEligibilityController {
    @Autowired
    private TutorEligibilityService tutorEligibilityService;
    @GetMapping(value = {"", "/"})
    public List<TutorEligibilityModel> read(@RequestParam(name = "tutor_id", required = false) Integer tutorId) {
        return this.tutorEligibilityService.read(tutorId);
    }
    @PostMapping(value = {"", "/"})
    public void create(@RequestParam(name = "tutor_id") Integer tutorId,
                       @RequestParam(name = "course_id") Integer courseId,
                       @RequestParam(name = "course_grade") Character courseGrade,
                       @RequestParam(name = "is_eligible") Boolean isEligible) {
        TutorEligibilityModel tutorEligibilityModel = TutorEligibilityModel.builder()
                .tutorId(tutorId)
                .courseId(courseId)
                .courseGrade(courseGrade)
                .isEligible(isEligible)
                .build();
        this.tutorEligibilityService.create(tutorEligibilityModel);
    }
}