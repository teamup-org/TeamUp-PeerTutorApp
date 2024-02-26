package xyz.tamutheo.databaseAPI.tutorTimePreference;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import xyz.tamutheo.databaseAPI.tutorLocationPreference.TutorLocationPreferenceModel;

import java.util.List;

@Service
public class TutorTimePreferenceService {
    @Autowired
    private TutorTimePreferenceMapper tutorTimePreferenceMapper;
    public List<TutorTimePreferenceModel> read(Integer tutorId) {
        return this.tutorTimePreferenceMapper.read(tutorId);
    }
    public void create(TutorTimePreferenceModel tutorTimePreferenceModel) {
        this.tutorTimePreferenceMapper.create(tutorTimePreferenceModel);
    }
    public void delete(TutorTimePreferenceModel tutorTimePreferenceModel) {
        this.tutorTimePreferenceMapper.delete(tutorTimePreferenceModel);
    }
}