package xyz.tamutheo.databaseAPI.tutorCoursePreference;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TutorCoursePreferenceService {
    @Autowired
    private TutorCoursePreferenceMapper tutorCoursePreferenceMapper;
    public List<TutorCoursePreferenceModel> read(Integer tutorId) {
        return this.tutorCoursePreferenceMapper.read(tutorId);
    }
    public void create(TutorCoursePreferenceModel tutorCoursePreferenceModel) {
        this.tutorCoursePreferenceMapper.create(tutorCoursePreferenceModel);
    }
    public void delete(TutorCoursePreferenceModel tutorCoursePreferenceModel) {
        this.tutorCoursePreferenceMapper.delete(tutorCoursePreferenceModel);
    }
}