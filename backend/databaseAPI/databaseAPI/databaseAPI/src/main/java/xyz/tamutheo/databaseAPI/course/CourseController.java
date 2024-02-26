package xyz.tamutheo.databaseAPI.course;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/course")
public class CourseController {
@Autowired
private CourseService courseService;
@GetMapping(value = {"", "/"})
public List<CourseModel> respond() {
    return this.courseService.read();
}
}