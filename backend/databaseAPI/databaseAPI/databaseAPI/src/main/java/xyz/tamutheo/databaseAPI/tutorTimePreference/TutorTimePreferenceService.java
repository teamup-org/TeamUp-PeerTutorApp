package xyz.tamutheo.databaseAPI.tutorTimePreference;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import xyz.tamutheo.databaseAPI.tutorLocationPreference.TutorLocationPreferenceModel;

import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Service
public class TutorTimePreferenceService {
    @Autowired
    private TutorTimePreferenceMapper tutorTimePreferenceMapper;
    public List<TutorTimePreferenceModel> read(LocalTime endTimeLessThanOrEquals,
                                               LocalTime startTimeGreaterThanOrEquals,
                                               String tutorEmailEquals,
                                               List<String> weekdayNameInList,
                                               Integer limit,
                                               Integer offset) {
        List<TutorTimePreferenceModel> tutorTimePreferenceModelList = this.tutorTimePreferenceMapper.read(endTimeLessThanOrEquals,
                startTimeGreaterThanOrEquals,
                tutorEmailEquals,
                weekdayNameInList,
                limit,
                offset);
        for (TutorTimePreferenceModel tutorTimePreferenceModel : tutorTimePreferenceModelList) {
            tutorTimePreferenceModel.setEndTimeString(tutorTimePreferenceModel.getEndTimeValue().format(DateTimeFormatter.ISO_LOCAL_TIME));
            tutorTimePreferenceModel.setStartTimeString(tutorTimePreferenceModel.getStartTimeValue().format(DateTimeFormatter.ISO_LOCAL_TIME));
        }
        return tutorTimePreferenceModelList;
    }
    public void update(List<TutorTimePreferenceModel> tutorTimePreferenceModelList, String tutorEmail, String weekdayName) {
        this.tutorTimePreferenceMapper.deleteAll(tutorEmail, weekdayName);
        if (tutorTimePreferenceModelList != null) {
            for (TutorTimePreferenceModel tutorTimePreferenceModel : tutorTimePreferenceModelList) {
                System.out.println(tutorTimePreferenceModel);
                this.tutorTimePreferenceMapper.create(tutorTimePreferenceModel);
            }
        }
    }
}