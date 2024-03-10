package xyz.tamutheo.databaseAPI.tutorLocationPreference;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping("/tutor_location_preference")
public class TutorLocationPreferenceController {
    @Autowired
    private TutorLocationPreferenceService tutorLocationPreferenceService;
    @GetMapping(value = {"", "/"})
    public List<TutorLocationPreferenceModel> read(@RequestParam(name = "location_name_in", required = false) String locationNameIn,
                                                   @RequestParam(name = "tutor_email_contains", required = false) String tutorEmailContains,
                                                   @RequestParam(name = "limit", required = false) Integer limit,
                                                   @RequestParam(name = "offset", required = false) Integer offset) {
        List<String> locationNameInList = null;
        if (locationNameIn != null) {
            locationNameInList = Arrays.asList(locationNameIn.split(", "));
            for (int idx = 0; idx < locationNameInList.size(); idx++) {
                locationNameInList.set(idx, locationNameInList.get(idx).trim());
            }
        }
        return this.tutorLocationPreferenceService.read(locationNameInList,
                tutorEmailContains,
                limit,
                offset);
    }
    @PostMapping(value = {"", "/"})
    public void create(@RequestParam(name = "location_name") String locationName,
                       @RequestParam(name = "tutor_email") String tutorEmail) {
        TutorLocationPreferenceModel tutorLocationPreferenceModel = TutorLocationPreferenceModel.builder()
                .locationName(locationName)
                .tutorEmail(tutorEmail)
                .build();
        this.tutorLocationPreferenceService.create(tutorLocationPreferenceModel);
    }
    @DeleteMapping(value = {"", "/"})
    public void delete(@RequestParam(name = "location_name", required = false) String locationName,
                       @RequestParam(name = "tutor_email") String tutorEmail) {
        TutorLocationPreferenceModel tutorLocationPreferenceModel = TutorLocationPreferenceModel.builder()
                .locationName(locationName)
                .tutorEmail(tutorEmail)
                .build();
        this.tutorLocationPreferenceService.delete(tutorLocationPreferenceModel);
    }
}