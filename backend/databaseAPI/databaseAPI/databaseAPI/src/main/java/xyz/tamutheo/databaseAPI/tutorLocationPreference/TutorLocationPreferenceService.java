package xyz.tamutheo.databaseAPI.tutorLocationPreference;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TutorLocationPreferenceService {
    @Autowired
    private TutorLocationPreferenceMapper tutorLocationPreferenceMapper;
    public List<TutorLocationPreferenceModel> read(Integer tutorId) {
        return this.tutorLocationPreferenceMapper.read(tutorId);
    }
    public void create(TutorLocationPreferenceModel tutorLocationPreferenceModel) {
        this.tutorLocationPreferenceMapper.create(tutorLocationPreferenceModel);
    }
    public void delete(TutorLocationPreferenceModel tutorLocationPreferenceModel) {
        this.tutorLocationPreferenceMapper.delete(tutorLocationPreferenceModel);
    }
}
