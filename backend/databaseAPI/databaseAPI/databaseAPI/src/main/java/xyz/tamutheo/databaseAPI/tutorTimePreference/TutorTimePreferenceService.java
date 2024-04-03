package xyz.tamutheo.databaseAPI.tutorTimePreference;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import xyz.tamutheo.databaseAPI.tutorLocationPreference.TutorLocationPreferenceModel;

import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.*;

@Service
public class TutorTimePreferenceService {
    @Autowired
    private TutorTimePreferenceMapper tutorTimePreferenceMapper;
    public List<TutorTimePreferenceModel> read(String tutorEmailEquals) {
        List<TutorTimePreferenceModel> tutorTimePreferenceModelList = this.tutorTimePreferenceMapper.read(tutorEmailEquals);
        // group time preferences by weekday
        List<String> weekdays = Arrays.asList(new String[] {"monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"});
        // initialize hash map
        HashMap<String, List<List<LocalTime>>> rawTimeIntervals = new HashMap<>();
        for (String weekday : weekdays) {
            rawTimeIntervals.put(weekday, new ArrayList<>());
        }
        for (TutorTimePreferenceModel tutorTimePreferenceModel : tutorTimePreferenceModelList) {
            String weekday = tutorTimePreferenceModel.getWeekdayName();
            LocalTime startTime = tutorTimePreferenceModel.getStartTimeValue();
            LocalTime endTime = tutorTimePreferenceModel.getEndTimeValue();
            // skip invalid pairs
            if (startTime.isAfter(endTime)) {
                continue;
            }
            rawTimeIntervals.get(weekday).add(new ArrayList<>(Arrays.asList(startTime, endTime)));
        }
        // for each weekday, sort time intervals
        for (String weekday : weekdays) {
            Collections.sort(rawTimeIntervals.get(weekday), (a, b) -> a.get(0) == b.get(0) ? a.get(1).toSecondOfDay() - b.get(1).toSecondOfDay() : a.get(0).toSecondOfDay() - b.get(0).toSecondOfDay());
        }
        // initialize hash map
        HashMap<String, LinkedList<List<LocalTime>>> mergedTimeIntervals = new HashMap<>();
        // for each weekday, merge overlapping time intervals
        for (String weekday : weekdays) {
            LinkedList<List<LocalTime>> merged = new LinkedList<>();
            for (List<LocalTime> timePair : rawTimeIntervals.get(weekday)) {
                // if list of merged intervals is empty or if the current interval does not overlap with previous, append it
                if (merged.isEmpty() || merged.getLast().get(1).isBefore(timePair.get(0))) {
                    merged.add(timePair);
                }
                // otherwise, there is an overlap, so merge the current and previous intervals
                else {
                    if (timePair.get(1).isAfter(merged.getLast().get(1))) {
                        merged.getLast().set(1, timePair.get(1));
                    }
                }
            }
            // convert to iso format
            mergedTimeIntervals.put(weekday, merged);
        }
        // store into model
        List<TutorTimePreferenceModel> tutorTimePreferenceModels = new ArrayList<>();
        for (String weekday : weekdays) {
            for (List<LocalTime> timeInterval : mergedTimeIntervals.get(weekday)) {
                TutorTimePreferenceModel tutorTimePreferenceModel = TutorTimePreferenceModel.builder()
                        .endTimeString(timeInterval.get(1).format(DateTimeFormatter.ISO_LOCAL_TIME))
                        .startTimeString(timeInterval.get(0).format(DateTimeFormatter.ISO_LOCAL_TIME))
                        .tutorEmail(tutorTimePreferenceModelList.get(0).getTutorEmail())
                        .weekdayName(weekday)
                        .build();
                tutorTimePreferenceModels.add(tutorTimePreferenceModel);
            }
        }
        return tutorTimePreferenceModels;
    }



    public void update(List<TutorTimePreferenceModel> tutorTimePreferenceModelList, String tutorEmail, String weekdayName) {
        this.tutorTimePreferenceMapper.deleteAll(tutorEmail, weekdayName);
        if (tutorTimePreferenceModelList != null) {
            for (TutorTimePreferenceModel tutorTimePreferenceModel : tutorTimePreferenceModelList) {
                this.tutorTimePreferenceMapper.create(tutorTimePreferenceModel);
            }
        }
    }
}