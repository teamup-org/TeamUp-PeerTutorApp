//package xyz.tamutheo.databaseAPI.tutorEligibleCourse;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.web.bind.annotation.*;
//import org.springframework.web.multipart.MultipartFile;
//
//import java.util.Arrays;
//import java.util.List;
//
//@RestController
//@RequestMapping("/tutor_eligible_course")
//public class TutorEligibleCourseController {
//    @Autowired
//    private TutorEligibleCourseService tutorEligibleCourseService;
//    @GetMapping(value = {"", "/"})
//    public List<TutorEligibleCourseModel> read(@RequestParam(name = "course_grade_in", required = false) String courseGradeIn,
//                                               @RequestParam(name = "course_number_equals", required = false) Integer courseNumberEquals,
//                                               @RequestParam(name = "course_number_greater_than_or_equals", required = false) Integer courseNumberGreaterThanOrEquals,
//                                               @RequestParam(name = "course_number_less_than_or_equals", required = false) Integer courseNumberLessThanOrEquals,
//                                               @RequestParam(name = "major_abbreviation_contains", required = false) String majorAbbreviationContains,
//                                               @RequestParam(name = "tutor_email_contains", required = false) String tutorEmailContains,
//                                               @RequestParam(name = "limit", required = false) Integer limit,
//                                               @RequestParam(name = "offset", required = false) Integer offset) {
//        List<String> courseGradeInList = null;
//        if (courseGradeIn != null) {
//            courseGradeInList = Arrays.asList(courseGradeIn.split(", "));
//            for (int idx = 0; idx < courseGradeInList.size(); idx++) {
//                courseGradeInList.set(idx, courseGradeInList.get(idx).trim());
//            }
//        }
//        return this.tutorEligibleCourseService.read(courseGradeInList,
//                courseNumberEquals,
//                courseNumberGreaterThanOrEquals,
//                courseNumberLessThanOrEquals,
//                majorAbbreviationContains,
//                tutorEmailContains,
//                limit,
//                offset);
//    }
//    @PostMapping(value = {"", "/"})
//    public void create(@RequestParam(name = "tutor_email") String tutorEmail,
//                       @RequestParam(name = "file") MultipartFile file) {
//        this.tutorEligibleCourseService.create(tutorEmail, file);
//    }
//
//    @DeleteMapping(value = {"", "/"})
//    public void delete(@RequestParam(name = "course_number") Integer courseNumber,
//                       @RequestParam(name = "major_abbreviation") String majorAbbreviation,
//                       @RequestParam(name = "tutor_email") String tutorEmail) {
//        TutorEligibleCourseModel tutorEligibleCourseModel = TutorEligibleCourseModel.builder()
//                .courseNumber(courseNumber)
//                .majorAbbreviation(majorAbbreviation)
//                .tutorEmail(tutorEmail)
//                .build();
//        this.tutorEligibleCourseService.delete(tutorEligibleCourseModel);
//    }
//}