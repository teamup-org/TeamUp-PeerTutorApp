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
    public List<TutorTimePreferenceModel> read(@RequestParam(name = "end_time_less_than_or_equals", required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.TIME) LocalTime endTimeLessThanOrEquals,
                                               @RequestParam(name = "start_time_greater_than_or_equals", required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.TIME) LocalTime startTimeGreaterThanOrEquals,
                                               @RequestParam(name = "tutor_email_equals", required = false) String tutorEmailEquals,
                                               @RequestParam(name = "weekday_name_in", required = false) String weekdayNameIn,
                                               @RequestParam(name = "limit", required = false) Integer limit,
                                               @RequestParam(name = "offset", required = false) Integer offset) {
        List<String> weekdayNameInList = null;
        if (weekdayNameIn != null) {
            weekdayNameInList = Arrays.asList(weekdayNameIn.split(", "));
            for (int idx = 0; idx < weekdayNameInList.size(); idx++) {
                weekdayNameInList.set(idx, weekdayNameInList.get(idx).trim());
            }
        }
        return this.tutorTimePreferenceService.read(endTimeLessThanOrEquals,
                startTimeGreaterThanOrEquals,
                tutorEmailEquals,
                weekdayNameInList,
                limit,
                offset);

    }

    @PutMapping(value = {"", "/"})
    // expects time input as a comma separated String
    // template: <start_time> <end_time>
    // example: 05:00:00 06:00:00, 09:00:00 11:00:00, 15:00:00 16:00:00
    public void update(@RequestParam(name = "time_intervals", defaultValue = "empty") String timeIntervals,
                       @RequestParam(name = "tutor_email") String tutorEmail,
                       @RequestParam(name = "weekday_name") String weekdayName) {

        List<TutorTimePreferenceModel> tutorTimePreferenceModelList = null;
        if ((timeIntervals != null) && !(timeIntervals.equals("empty"))) {
            // parse time intervals into time pairs
            List<List<LocalTime>> timePairs = new ArrayList<>();
            String[] timeIntervalList = timeIntervals.split(", ");
            for (String timeInterval : timeIntervalList) {
                List<String> timeInfo = Arrays.asList(timeInterval.trim().split(" "));
                timePairs.add(new ArrayList<>(Arrays.asList(LocalTime.parse(timeInfo.get(0)), LocalTime.parse(timeInfo.get(1)))));
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