package xyz.tamutheo.databaseAPI.course;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CourseService {
    @Autowired
    private CourseMapper courseMapper;

    public List<CourseModel> read(Integer courseNumberEquals,
                                  Integer courseNumberLessThanOrEquals,
                                  Integer courseNumberGreaterThanOrEquals,
                                  String courseTitleContains,
                                  String majorAbbreviationContains,
                                  Integer limit,
                                  Integer offset) {
        return this.courseMapper.read(courseNumberEquals,
                courseNumberLessThanOrEquals,
                courseNumberGreaterThanOrEquals,
                courseTitleContains,
                majorAbbreviationContains,
                limit,
                offset);
    }
}