package xyz.tamutheo.databaseAPI.course;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CourseService {
    @Autowired
    private CourseMapper courseMapper;
    public List<CourseModel> read() {
        return this.courseMapper.read();
    }
}