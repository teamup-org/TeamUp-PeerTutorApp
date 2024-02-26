package xyz.tamutheo.databaseAPI.tutorTimePreference;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/tutor_time_preference")
public class TutorTimePreferenceController {
    @Autowired
    private TutorTimePreferenceService tutorTimePreferenceService;
    @GetMapping(value = {"", "/"})
    public List<TutorTimePreferenceModel> read(@RequestParam(name = "tutor_id", required = false) Integer tutorId) {
        return this.tutorTimePreferenceService.read(tutorId);
    }
    @PostMapping(value = {"", "/"})
    public void create(@RequestParam(name = "tutor_id") Integer tutorId,
                       @RequestParam(name = "start_time_id") Integer startTimeId,
                       @RequestParam(name = "end_time_id") Integer endTimeId) {
        TutorTimePreferenceModel tutorTimePreferenceModel = TutorTimePreferenceModel.builder()
                .tutorId(tutorId)
                .startTimeId(startTimeId)
                .endTimeId(endTimeId)
                .build();
        this.tutorTimePreferenceService.create(tutorTimePreferenceModel);
    }
    @DeleteMapping(value = {"", "/"})
    public void delete(@RequestParam(name = "tutor_id") Integer tutorId,
                       @RequestParam(name = "start_time_id") Integer startTimeId,
                       @RequestParam(name = "end_time_id") Integer endTimeId) {
        TutorTimePreferenceModel tutorTimePreferenceModel = TutorTimePreferenceModel.builder()
                .tutorId(tutorId)
                .startTimeId(startTimeId)
                .endTimeId(endTimeId)
                .build();
        this.tutorTimePreferenceService.delete(tutorTimePreferenceModel);
    }
}