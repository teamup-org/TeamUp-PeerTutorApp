package xyz.tamutheo.databaseAPI.tutor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import xyz.tamutheo.databaseAPI.tutorCoursePreference.TutorCoursePreferenceModel;
import xyz.tamutheo.databaseAPI.tutorLocationPreference.TutorLocationPreferenceModel;
import xyz.tamutheo.databaseAPI.util.paginationContainer.PaginationContainerModel;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping("/tutor")
public class TutorController {
    @Autowired
    private TutorService tutorService;
    @PostMapping(value = {"", "/"})
    public void create(@RequestParam(name = "active_status_name") String activeStatusName,
                       @RequestParam(name = "bio_text") String bioText,
                       @RequestParam(name = "email") String email,
                       @RequestParam(name = "first_name") String firstName,
                       @RequestParam(name = "last_name") String lastName,
                       @RequestParam(name = "listing_title") String listingTitle,
                       @RequestParam(name = "major_abbreviation") String majorAbbreviation,
                       @RequestParam(name = "pay_rate") Double payRate,
                       @RequestParam(name = "phone_number") Long phoneNumber,
                       @RequestParam(name = "picture_url") String pictureUrl,
                       @RequestParam(name = "seniority_name") String seniorityName,
                       @RequestParam(name = "transcript") MultipartFile transcript){
        TutorModel tutorModel = TutorModel.builder()
                .activeStatusName(activeStatusName)
                .bioText(bioText)
                .email(email)
                .firstName(firstName)
                .lastName(lastName)
                .listingTitle(listingTitle)
                .majorAbbreviation(majorAbbreviation)
                .payRate(payRate)
                .phoneNumber(phoneNumber)
                .pictureUrl(pictureUrl)
                .seniorityName(seniorityName)
                .build();
        this.tutorService.create(tutorModel, transcript);
    }
    @GetMapping(value = {"", "/"})
    public PaginationContainerModel read(@RequestParam(name = "active_status_name_equals", required = false) String activeStatusNameEquals,
                                         @RequestParam(name = "average_rating_greater_than_or_equals", required = false) Double averageRatingGreaterThanOrEquals,
                                         @RequestParam(name = "average_rating_less_than_or_equals", required = false) Double averageRatingLessThanOrEquals,
                                         @RequestParam(name = "bio_text_contains", required = false) String bioTextContains,
                                         @RequestParam(name = "contains", required = false) String contains,
                                         @RequestParam(name = "email_contains", required = false) String emailContains,
                                         @RequestParam(name = "first_name_contains", required = false) String firstNameContains,
                                         @RequestParam(name = "last_name_contains", required = false) String lastNameContains,
                                         @RequestParam(name = "listing_title_contains", required = false) String listingTitleContains,
                                         @RequestParam(name = "major_abbreviation_contains", required = false) String majorAbbreviationContains,
                                         @RequestParam(name = "number_of_ratings_greater_than_or_equals", required = false) Integer numberOfRatingsGreaterThanOrEquals,
                                         @RequestParam(name = "number_of_ratings_less_than_or_equals", required = false) Integer numberOfRatingsLessThanOrEquals,
                                         @RequestParam(name = "pay_rate_greater_than_or_equals", required = false) Double payRateGreaterThanOrEquals,
                                         @RequestParam(name = "pay_rate_less_than_or_equals", required = false) Double payRateLessThanOrEquals,
                                         @RequestParam(name = "phone_number_contains", required = false) Long phoneNumberContains,
                                         @RequestParam(name = "picture_url_contains", required = false) String pictureUrlContains,
                                         @RequestParam(name = "seniority_name_in", required = false) String seniorityNameIn,
                                         @RequestParam(name = "sort_by", required = false) String sortBy,
                                         // tutor_eligible_course parameters
                                         @RequestParam(name = "eligible_course_grade_in", required = false) String eligibleCourseGradeIn,
                                         @RequestParam(name = "eligible_course_number_equals", required = false) Integer eligibleCourseNumberEquals,
                                         @RequestParam(name = "eligible_course_number_greater_than_or_equals", required = false) Integer eligibleCourseNumberGreaterThanOrEquals,
                                         @RequestParam(name = "eligible_course_number_less_than_or_equals", required = false) Integer eligibleCourseNumberLessThanOrEquals,
                                         @RequestParam(name = "eligible_course_major_abbreviation_contains", required = false) String eligibleCourseMajorAbbreviationContains,
                                         // tutor_course_preference parameters
                                         @RequestParam(name = "course_preference_grade_in", required = false) String coursePreferenceGradeIn,
                                         @RequestParam(name = "course_preference_number_equals", required = false) Integer coursePreferenceNumberEquals,
                                         @RequestParam(name = "course_preference_number_greater_than_or_equals", required = false) Integer coursePreferenceNumberGreaterThanOrEquals,
                                         @RequestParam(name = "course_preference_number_less_than_or_equals", required = false) Integer coursePreferenceNumberLessThanOrEquals,
                                         @RequestParam(name = "course_preference_major_abbreviation_contains", required = false) String coursePreferenceMajorAbbreviationContains,
                                         // tutor_location_preference parameters
                                         @RequestParam(name = "location_name_in", required = false) String locationNameIn,
                                         @RequestParam(name = "page_number", required = false, defaultValue = "1") Integer pageNumber,
                                         @RequestParam(name = "number_entries_per_page", required = false) Integer numberEntriesPerPage) {
        List<String> eligibleCourseGradeInList = null;
        if (eligibleCourseGradeIn != null) {
            eligibleCourseGradeInList = Arrays.asList(eligibleCourseGradeIn.split(", "));
            for (int idx = 0; idx < eligibleCourseGradeInList.size(); idx++) {
                eligibleCourseGradeInList.set(idx, eligibleCourseGradeInList.get(idx).trim());
            }
        }
        List<String> coursePreferenceGradeInList = null;
        if (coursePreferenceGradeIn != null) {
            coursePreferenceGradeInList = Arrays.asList(coursePreferenceGradeIn.split(", "));
            for (int idx = 0; idx < coursePreferenceGradeInList.size(); idx++) {
                coursePreferenceGradeInList.set(idx, coursePreferenceGradeInList.get(idx).trim());
            }
        }
        List<String> locationNameInList = null;
        if (locationNameIn != null) {
            locationNameInList = Arrays.asList(locationNameIn.split(", "));
            for (int idx = 0; idx < locationNameInList.size(); idx++) {
                locationNameInList.set(idx, locationNameInList.get(idx).trim());
            }
        }
        List<String> seniorityNameInList = null;
        if (seniorityNameIn != null) {
            seniorityNameInList = Arrays.asList(seniorityNameIn.split(", "));
            for (int idx = 0; idx < seniorityNameInList.size(); idx++) {
                seniorityNameInList.set(idx, seniorityNameInList.get(idx).trim());
            }
        }
        return this.tutorService.read(activeStatusNameEquals,
                averageRatingGreaterThanOrEquals,
                averageRatingLessThanOrEquals,
                bioTextContains,
                contains,
                emailContains,
                firstNameContains,
                lastNameContains,
                listingTitleContains,
                majorAbbreviationContains,
                numberOfRatingsGreaterThanOrEquals,
                numberOfRatingsLessThanOrEquals,
                payRateGreaterThanOrEquals,
                payRateLessThanOrEquals,
                phoneNumberContains,
                pictureUrlContains,
                seniorityNameInList,
                sortBy,
                // tutor_eligible_course parameters
                eligibleCourseGradeInList,
                eligibleCourseNumberEquals,
                eligibleCourseNumberGreaterThanOrEquals,
                eligibleCourseNumberLessThanOrEquals,
                eligibleCourseMajorAbbreviationContains,
                // tutor_course_preference parameters
                coursePreferenceGradeInList,
                coursePreferenceNumberEquals,
                coursePreferenceNumberGreaterThanOrEquals,
                coursePreferenceNumberLessThanOrEquals,
                coursePreferenceMajorAbbreviationContains,
                // tutor_location_preference parameters
                locationNameInList,
                pageNumber,
                numberEntriesPerPage);
    }
//    @PutMapping(value = {"", "/"})
    @RequestMapping(value = {"/update"})
    public void update(@RequestParam(name = "email_old") String emailOld,
                       @RequestParam(name = "first_name_old", required = false) String firstNameOld,
                       @RequestParam(name = "last_name_old", required = false) String lastNameOld,
                       @RequestParam(name = "active_status_name_new", required = false) String activeStatusNameNew,
                       @RequestParam(name = "bio_text_new", required = false) String bioTextNew,
                       @RequestParam(name = "transcript", required = false) MultipartFile transcript,
                       // expects input as a comma separated String
                       // template: <major_abbreviation> <course_number> <course_grade>
                       // example: csce 121 a, csce 314 b
                       @RequestParam(name = "course_preferences_new", required = false) String coursePreferencesNew,
                       @RequestParam(name = "email_new", required = false) String emailNew,
                       @RequestParam(name = "first_name_new", required = false) String firstNameNew,
                       @RequestParam(name = "last_name_new", required = false) String lastNameNew,
                       @RequestParam(name = "listing_title_new", required = false) String listingTitleNew,
                       // expects input as a comma separated String
                       // template: <location_name>
                       // example: online, in-person off-campus
                       @RequestParam(name = "location_preferences_new", required = false) String locationPreferencesNew,
                       @RequestParam(name = "major_abbreviation_new", required = false) String majorAbbreviationNew,
                       @RequestParam(name = "pay_rate_new", required = false) Double payRateNew,
                       @RequestParam(name = "phone_number_new", required = false) Long phoneNumberNew,
                       @RequestParam(name = "picture_url_new", required = false) String pictureUrlNew,
                       @RequestParam(name = "seniority_name_new", required = false) String seniorityNameNew) {
        List<TutorCoursePreferenceModel> tutorCoursePreferenceModelList = null;
        if (coursePreferencesNew != null) {
            tutorCoursePreferenceModelList = new ArrayList<>();
            String[] coursePreferencesNewList = coursePreferencesNew.split(", ");
            for (String coursePreferenceNew : coursePreferencesNewList) {
                List<String> courseInfo = Arrays.asList(coursePreferenceNew.trim().split(" "));
                TutorCoursePreferenceModel tutorCoursePreferenceModel = TutorCoursePreferenceModel.builder()
                        .majorAbbreviation(courseInfo.get(0))
                        .courseNumber(Integer.valueOf(courseInfo.get(1)))
                        .courseGrade(courseInfo.get(2).charAt(0))
                        .tutorEmail(emailOld)
                        .build();
                tutorCoursePreferenceModelList.add(tutorCoursePreferenceModel);
            }
        }
        List<TutorLocationPreferenceModel> tutorLocationPreferenceModelList = null;
        if (locationPreferencesNew != null) {
            tutorLocationPreferenceModelList = new ArrayList<>();
            String[] locationPreferencesNewList = locationPreferencesNew.split(", ");
            for(String locationPreferenceNew : locationPreferencesNewList) {
                TutorLocationPreferenceModel tutorLocationPreferenceModel = TutorLocationPreferenceModel.builder()
                        .locationName(locationPreferenceNew.trim())
                        .tutorEmail(emailOld)
                        .build();
                tutorLocationPreferenceModelList.add(tutorLocationPreferenceModel);
            }
        }
        TutorModel tutorModelOld = TutorModel.builder()
                .email(emailOld)
                .firstName(firstNameOld)
                .lastName(lastNameOld)
                .build();
        TutorModel tutorModelNew = TutorModel.builder()
                .activeStatusName(activeStatusNameNew)
                .bioText(bioTextNew)
                .coursePreferences(tutorCoursePreferenceModelList)
                .email(emailNew)
                .firstName(firstNameNew)
                .lastName(lastNameNew)
                .listingTitle(listingTitleNew)
                .locationPreferences(tutorLocationPreferenceModelList)
                .majorAbbreviation(majorAbbreviationNew)
                .payRate(payRateNew)
                .phoneNumber(phoneNumberNew)
                .pictureUrl(pictureUrlNew)
                .seniorityName(seniorityNameNew)
                .build();
        this.tutorService.update(tutorModelOld, tutorModelNew, transcript);
    }
}