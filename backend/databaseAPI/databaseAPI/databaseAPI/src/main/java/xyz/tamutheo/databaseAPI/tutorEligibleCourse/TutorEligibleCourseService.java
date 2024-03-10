package xyz.tamutheo.databaseAPI.tutorEligibleCourse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TutorEligibleCourseService {
    @Autowired
    private TutorEligibleCourseMapper tutorEligibleCourseMapper;
    public List<TutorEligibleCourseModel> read(List<String> courseGradeInList,
                                               Integer courseNumberEquals,
                                               Integer courseNumberGreaterThanOrEquals,
                                               Integer courseNumberLessThanOrEquals,
                                               String majorAbbreviationContains,
                                               String tutorEmailContains,
                                               Integer limit,
                                               Integer offset) {
        return this.tutorEligibleCourseMapper.read(courseGradeInList,
                courseNumberEquals,
                courseNumberGreaterThanOrEquals,
                courseNumberLessThanOrEquals,
                majorAbbreviationContains,
                tutorEmailContains,
                limit,
                offset);
    }
    public void create(TutorEligibleCourseModel tutorEligibleCourseModel) {
        this.tutorEligibleCourseMapper.create(tutorEligibleCourseModel);
    }
    public void delete(TutorEligibleCourseModel tutorEligibleCourseModel) {
        this.tutorEligibleCourseMapper.delete(tutorEligibleCourseModel);
    }
}