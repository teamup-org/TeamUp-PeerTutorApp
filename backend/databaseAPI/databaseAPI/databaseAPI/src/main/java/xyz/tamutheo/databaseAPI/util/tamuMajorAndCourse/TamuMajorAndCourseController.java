package xyz.tamutheo.databaseAPI.util.tamuMajorAndCourse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/tamu_major_and_course")
public class TamuMajorAndCourseController {
    @Autowired
    private TamuMajorAndCourseService tamuMajorAndCourseService;
    @RequestMapping(value = {"", "/"})
    public void populate() {
        this.tamuMajorAndCourseService.replace();
    }
}
