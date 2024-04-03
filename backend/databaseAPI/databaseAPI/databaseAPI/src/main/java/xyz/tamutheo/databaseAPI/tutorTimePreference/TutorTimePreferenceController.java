package xyz.tamutheo.databaseAPI.tutorTimePreference;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import java.time.LocalTime;
import java.util.*;

@RestController
@RequestMapping("/tutor_time_preference")
public class TutorTimePreferenceController {
    @Autowired
    private TutorTimePreferenceService tutorTimePreferenceService;

    @GetMapping(value = {"", "/"})
    public List<TutorTimePreferenceModel> read(@RequestParam(name = "tutor_email_equals") String tutorEmailEquals) {
        return this.tutorTimePreferenceService.read(tutorEmailEquals);

    }

    //    @PutMapping(value = {"", "/"})
    @RequestMapping(value = {"/update"})
    // expects time input as a comma separated String
    // template: <start_time> <end_time>
    // example: 05:00:00 06:00:00, 09:00:00 11:00:00, 15:00:00 16:00:00
    public void update(@RequestParam(name = "monday_time_intervals", defaultValue = "empty") String mondayTimeIntervals,
                       @RequestParam(name = "tuesday_time_intervals", defaultValue = "empty") String tuesdayTimeIntervals,
                       @RequestParam(name = "wednesday_time_intervals", defaultValue = "empty") String wednesdayTimeIntervals,
                       @RequestParam(name = "thursday_time_intervals", defaultValue = "empty") String thursdayTimeIntervals,
                       @RequestParam(name = "friday_time_intervals", defaultValue = "empty") String fridayTimeIntervals,
                       @RequestParam(name = "saturday_time_intervals", defaultValue = "empty") String saturdayTimeIntervals,
                       @RequestParam(name = "sunday_time_intervals", defaultValue = "empty") String sundayTimeIntervals,
                       @RequestParam(name = "tutor_email") String tutorEmail) {

        HashMap<String, String> hashMap = new HashMap<>();
        hashMap.put("monday", mondayTimeIntervals);
        hashMap.put("tuesday", tuesdayTimeIntervals);
        hashMap.put("wednesday", wednesdayTimeIntervals);
        hashMap.put("thursday", thursdayTimeIntervals);
        hashMap.put("friday", fridayTimeIntervals);
        hashMap.put("saturday", saturdayTimeIntervals);
        hashMap.put("sunday", sundayTimeIntervals);

        for (String weekdayName : hashMap.keySet()) {
            System.out.println(weekdayName);
            List<TutorTimePreferenceModel> tutorTimePreferenceModelList = null;
            if ((hashMap.get(weekdayName) != null) && !(hashMap.get(weekdayName).equals("empty"))) {
                // parse time intervals into time pairs
                List<List<LocalTime>> timePairs = new ArrayList<>();
                String[] timeIntervalList = hashMap.get(weekdayName).split(", ");
                for (String timeInterval : timeIntervalList) {
                    List<String> timeInfo = Arrays.asList(timeInterval.trim().split(" "));
                    LocalTime startTime = LocalTime.parse(timeInfo.get(0));
                    LocalTime endTime = LocalTime.parse(timeInfo.get(1));
                    // skip invalid pairs
                    if (startTime.isAfter(endTime)) {
                        continue;
                    }
                    timePairs.add(new ArrayList<>(Arrays.asList(startTime, endTime)));
                }
                // sort time pairs
                Collections.sort(timePairs, (a, b) -> a.get(0) == b.get(0) ? a.get(1).toSecondOfDay() - b.get(1).toSecondOfDay() : a.get(0).toSecondOfDay() - b.get(0).toSecondOfDay());
                // merge overlapping time pairs
                LinkedList<List<LocalTime>> merged = new LinkedList<>();
                for (List<LocalTime> timePair : timePairs) {
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
                // create list of model objects
                tutorTimePreferenceModelList = new ArrayList<>();
                for (List<LocalTime> mergedPair : merged) {
                    TutorTimePreferenceModel tutorTimePreferenceModel = TutorTimePreferenceModel.builder()
                            .startTimeValue(mergedPair.get(0))
                            .endTimeValue(mergedPair.get(1))
                            .tutorEmail(tutorEmail)
                            .weekdayName(weekdayName)
                            .build();
                    tutorTimePreferenceModelList.add(tutorTimePreferenceModel);
                }
            }
            this.tutorTimePreferenceService.update(tutorTimePreferenceModelList, tutorEmail, weekdayName);
        }
    }
}