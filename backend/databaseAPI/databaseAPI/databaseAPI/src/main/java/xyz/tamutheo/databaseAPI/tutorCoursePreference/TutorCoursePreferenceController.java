package xyz.tamutheo.databaseAPI.tutorCoursePreference;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import xyz.tamutheo.databaseAPI.tutorLocationPreference.TutorLocationPreferenceModel;

import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping("/tutor_course_preference")
public class TutorCoursePreferenceController {
    @Autowired
    private TutorCoursePreferenceService tutorCoursePreferenceService;
    @GetMapping(value = {"", "/"})
    public List<TutorCoursePreferenceModel> read(@RequestParam(name = "course_grade_in", required = false) String courseGradeIn,
                                                 @RequestParam(name = "course_number_equals", required = false) Integer courseNumberEquals,
                                                 @RequestParam(name = "course_number_greater_than_or_equals", required = false) Integer courseNumberGreaterThanOrEquals,
                                                 @RequestParam(name = "course_number_less_than_or_equals", required = false) Integer courseNumberLessThanOrEquals,
                                                 @RequestParam(name = "major_abbreviation_contains", required = false) String majorAbbreviationContains,
                                                 @RequestParam(name = "tutor_email_contains", required = false) String tutorEmailContains,
                                                 @RequestParam(name = "limit", required = false) Integer limit,
                                                 @RequestParam(name = "offset", required = false) Integer offset) {
        List<String> courseGradeInList = null;
        if (courseGradeIn != null) {
            courseGradeInList = Arrays.asList(courseGradeIn.split(", "));
            for (int idx = 0; idx < courseGradeInList.size(); idx++) {
                courseGradeInList.set(idx, courseGradeInList.get(idx).trim());
            }
        }
        return this.tutorCoursePreferenceService.read(courseGradeInList,
                courseNumberEquals,
                courseNumberGreaterThanOrEquals,
                courseNumberLessThanOrEquals,
                majorAbbreviationContains,
                tutorEmailContains,
                limit,
                offset);
    }
    @PostMapping(value = {"", "/"})
    public void create(@RequestParam(name = "course_grade") Character courseGrade,
                       @RequestParam(name = "course_number") Integer courseNumber,
                       @RequestParam(name = "major_abbreviation") String majorAbbreviation,
                       @RequestParam(name = "tutor_email") String tutorEmail) {
        TutorCoursePreferenceModel tutorCoursePreferenceModel = TutorCoursePreferenceModel.builder()
                .courseGrade(courseGrade)
                .courseNumber(courseNumber)
                .majorAbbreviation(majorAbbreviation)
                .tutorEmail(tutorEmail)
                .build();
        this.tutorCoursePreferenceService.create(tutorCoursePreferenceModel);
    }
    @DeleteMapping(value = {"", "/"})
    public void delete(@RequestParam(name = "course_number") Integer courseNumber,
                       @RequestParam(name = "major_abbreviation") String majorAbbreviation,
                       @RequestParam(name = "tutor_email") String tutorEmail) {
        TutorCoursePreferenceModel tutorCoursePreferenceModel = TutorCoursePreferenceModel.builder()
                .courseNumber(courseNumber)
                .majorAbbreviation(majorAbbreviation)
                .tutorEmail(tutorEmail)
                .build();
        this.tutorCoursePreferenceService.delete(tutorCoursePreferenceModel);
    }
}