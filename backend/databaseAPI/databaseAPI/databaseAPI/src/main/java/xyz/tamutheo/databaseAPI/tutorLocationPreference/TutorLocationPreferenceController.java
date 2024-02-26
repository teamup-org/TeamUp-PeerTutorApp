package xyz.tamutheo.databaseAPI.tutorLocationPreference;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/tutor_location_preference")
public class TutorLocationPreferenceController {
    @Autowired
    private TutorLocationPreferenceService tutorLocationPreferenceService;
    @GetMapping(value = {"", "/"})
    public List<TutorLocationPreferenceModel> read(@RequestParam(name = "tutor_id", required = false) Integer tutorId) {
        return this.tutorLocationPreferenceService.read(tutorId);
    }
    @PostMapping(value = {"", "/"})
    public void create(@RequestParam(name = "tutor_id") Integer tutorId,
                       @RequestParam(name = "location_id") Integer locationId) {
        TutorLocationPreferenceModel tutorLocationPreferenceModel = TutorLocationPreferenceModel.builder()
                .tutorId(tutorId)
                .locationId(locationId)
                .build();
        this.tutorLocationPreferenceService.create(tutorLocationPreferenceModel);
    }
    @DeleteMapping(value = {"", "/"})
    public void delete(@RequestParam(name = "tutor_id") Integer tutorId,
                       @RequestParam(name = "location_id", required = false) Integer locationId) {
        TutorLocationPreferenceModel tutorLocationPreferenceModel = TutorLocationPreferenceModel.builder()
                .tutorId(tutorId)
                .locationId(locationId)
                .build();
        this.tutorLocationPreferenceService.delete(tutorLocationPreferenceModel);
    }
}