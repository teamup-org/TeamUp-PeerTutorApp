package xyz.tamutheo.databaseAPI.course;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/course")
public class CourseController {
@Autowired
private CourseService courseService;
@GetMapping(value = {"", "/"})
public List<CourseModel> read(@RequestParam(name = "course_number_equals", required = false) Integer courseNumberEquals,
                              @RequestParam(name = "course_number_less_than_or_equals", required = false) Integer courseNumberLessThanOrEquals,
                              @RequestParam(name = "course_number_greater_than_or_equals", required = false) Integer courseNumberGreaterThanOrEquals,
                              @RequestParam(name = "course_title_contains", required = false) String courseTitleContains,
                              @RequestParam(name = "major_abbreviation_contains", required = false) String majorAbbreviationContains,
                              @RequestParam(name = "limit", required = false) Integer limit,
                              @RequestParam(name = "offset", required = false) Integer offset) {
    return this.courseService.read(courseNumberEquals,
            courseNumberLessThanOrEquals,
            courseNumberGreaterThanOrEquals,
            courseTitleContains,
            majorAbbreviationContains,
            limit,
            offset);
    }
}