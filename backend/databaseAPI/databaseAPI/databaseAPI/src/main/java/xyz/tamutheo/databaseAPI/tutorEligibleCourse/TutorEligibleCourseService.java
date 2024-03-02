package xyz.tamutheo.databaseAPI.tutorEligibleCourse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TutorEligibleCourseService {
    @Autowired
    private TutorEligibleCourseMapper tutorEligibleCourseMapper;
    public List<TutorEligibleCourseModel> read(Integer tutorId) {
        return this.tutorEligibleCourseMapper.read(tutorId);
    }
    public void create(TutorEligibleCourseModel tutorEligibleCourseModel) {
        this.tutorEligibleCourseMapper.create(tutorEligibleCourseModel);
    }
}