package xyz.tamutheo.databaseAPI.tutorCoursePreference;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TutorCoursePreferenceService {
    @Autowired
    private TutorCoursePreferenceMapper tutorCoursePreferenceMapper;
    public List<TutorCoursePreferenceModel> read(List<String> courseGradeInList,
                                                 Integer courseNumberEquals,
                                                 Integer courseNumberGreaterThanOrEquals,
                                                 Integer courseNumberLessThanOrEquals,
                                                 String majorAbbreviationContains,
                                                 String tutorEmailContains,
                                                 Integer limit,
                                                 Integer offset) {
        return this.tutorCoursePreferenceMapper.read(courseGradeInList,
                courseNumberEquals,
                courseNumberGreaterThanOrEquals,
                courseNumberLessThanOrEquals,
                majorAbbreviationContains,
                tutorEmailContains,
                limit,
                offset);
    }
    public void create(TutorCoursePreferenceModel tutorCoursePreferenceModel) {
        this.tutorCoursePreferenceMapper.create(tutorCoursePreferenceModel);
    }
    public void delete(TutorCoursePreferenceModel tutorCoursePreferenceModel) {
        this.tutorCoursePreferenceMapper.delete(tutorCoursePreferenceModel);
    }
}