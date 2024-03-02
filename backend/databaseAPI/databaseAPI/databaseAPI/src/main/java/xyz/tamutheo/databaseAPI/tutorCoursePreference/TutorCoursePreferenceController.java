package xyz.tamutheo.databaseAPI.tutorCoursePreference;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import xyz.tamutheo.databaseAPI.tutorLocationPreference.TutorLocationPreferenceModel;

import java.util.List;

@RestController
@RequestMapping("/tutor_course_preference")
public class TutorCoursePreferenceController {
    @Autowired
    private TutorCoursePreferenceService tutorCoursePreferenceService;
    @GetMapping(value = {"", "/"})
    public List<TutorCoursePreferenceModel> read(@RequestParam(name = "tutor_id", required = false) Integer tutorId) {
        return this.tutorCoursePreferenceService.read(tutorId);
    }
    @PostMapping(value = {"", "/"})
    public void create(@RequestParam(name = "eligibility_id") Integer eligibilityId,
                       @RequestParam(name = "tutor_id") Integer tutorId)
                        {
        TutorCoursePreferenceModel tutorCoursePreferenceModel = TutorCoursePreferenceModel.builder()
                .eligibilityId(eligibilityId)
                .tutorId(tutorId)
                .build();
        this.tutorCoursePreferenceService.create(tutorCoursePreferenceModel);
    }
    @DeleteMapping(value = {"", "/"})
    public void delete(@RequestParam(name = "eligibility_id", required = false) Integer eligibilityId,
                       @RequestParam(name = "tutor_id") Integer tutorId) {
        TutorCoursePreferenceModel tutorCoursePreferenceModel = TutorCoursePreferenceModel.builder()
                .eligibilityId(eligibilityId)
                .tutorId(tutorId)
                .build();
        this.tutorCoursePreferenceService.delete(tutorCoursePreferenceModel);
    }
}