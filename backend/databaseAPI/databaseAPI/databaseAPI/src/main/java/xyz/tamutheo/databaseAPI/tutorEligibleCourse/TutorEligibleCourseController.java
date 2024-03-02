package xyz.tamutheo.databaseAPI.tutorEligibleCourse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/tutor_eligible_course")
public class TutorEligibleCourseController {
    @Autowired
    private TutorEligibleCourseService tutorEligibleCourseService;
    @GetMapping(value = {"", "/"})
    public List<TutorEligibleCourseModel> read(@RequestParam(name = "tutor_id", required = false) Integer tutorId) {
        return this.tutorEligibleCourseService.read(tutorId);
    }
    @PostMapping(value = {"", "/"})
    public void create(@RequestParam(name = "tutor_id") Integer tutorId,
                       @RequestParam(name = "course_id") Integer courseId,
                       @RequestParam(name = "course_grade") Character courseGrade) {
        TutorEligibleCourseModel tutorEligibleCourseModel = TutorEligibleCourseModel.builder()
                .tutorId(tutorId)
                .courseId(courseId)
                .courseGrade(courseGrade)
                .build();
        this.tutorEligibleCourseService.create(tutorEligibleCourseModel);
    }
}