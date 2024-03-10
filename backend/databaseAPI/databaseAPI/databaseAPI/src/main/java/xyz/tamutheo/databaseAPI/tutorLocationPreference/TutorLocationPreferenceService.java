package xyz.tamutheo.databaseAPI.tutorLocationPreference;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TutorLocationPreferenceService {
    @Autowired
    private TutorLocationPreferenceMapper tutorLocationPreferenceMapper;
    public List<TutorLocationPreferenceModel> read(List<String> locationNameInList,
                                                   String tutorEmailContains,
                                                   Integer limit,
                                                   Integer offset) {
        return this.tutorLocationPreferenceMapper.read(locationNameInList,
                tutorEmailContains,
                limit,
                offset);
    }
    public void create(TutorLocationPreferenceModel tutorLocationPreferenceModel) {
        this.tutorLocationPreferenceMapper.create(tutorLocationPreferenceModel);
    }
    public void delete(TutorLocationPreferenceModel tutorLocationPreferenceModel) {
        this.tutorLocationPreferenceMapper.delete(tutorLocationPreferenceModel);
    }
}
