package xyz.tamutheo.databaseAPI.tutor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import xyz.tamutheo.databaseAPI.tutorCoursePreference.TutorCoursePreferenceMapper;
import xyz.tamutheo.databaseAPI.tutorCoursePreference.TutorCoursePreferenceModel;
import xyz.tamutheo.databaseAPI.tutorEligibleCourse.TutorEligibleCourseMapper;
import xyz.tamutheo.databaseAPI.tutorEligibleCourse.TutorEligibleCourseService;
import xyz.tamutheo.databaseAPI.tutorLocationPreference.TutorLocationPreferenceMapper;
import xyz.tamutheo.databaseAPI.tutorLocationPreference.TutorLocationPreferenceModel;
import xyz.tamutheo.databaseAPI.tutorTimePreference.TutorTimePreferenceMapper;
import xyz.tamutheo.databaseAPI.tutorTimePreference.TutorTimePreferenceService;
import xyz.tamutheo.databaseAPI.util.paginationContainer.PaginationContainerModel;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class TutorService {
    @Autowired
    private TutorMapper tutorMapper;
    @Autowired
    private TutorEligibleCourseMapper tutorEligibleCourseMapper;
    @Autowired
    private TutorCoursePreferenceMapper tutorCoursePreferenceMapper;
    @Autowired
    private TutorLocationPreferenceMapper tutorLocationPreferenceMapper;
    @Autowired
    private TutorEligibleCourseService tutorEligibleCourseService;
    @Autowired
    private TutorTimePreferenceService tutorTimePreferenceService;

    public PaginationContainerModel read(String activeStatusNameEquals,
                                 Double averageRatingGreaterThanOrEquals,
                                 Double averageRatingLessThanOrEquals,
                                 String bioTextContains,
                                 String contains,
                                 String emailContains,
                                 String firstNameContains,
                                 String lastNameContains,
                                 String listingTitleContains,
                                 String majorAbbreviationContains,
                                 Integer numberOfRatingsGreaterThanOrEquals,
                                 Integer numberOfRatingsLessThanOrEquals,
                                 Double payRateGreaterThanOrEquals,
                                 Double payRateLessThanOrEquals,
                                 Long phoneNumberContains,
                                 String pictureUrlContains,
                                 List<String> seniorityNameInList,
                                 String sortBy,
                                 // tutor_eligible_course parameters
                                 List<String> eligibleCourseGradeInList,
                                 Integer eligibleCourseNumberEquals,
                                 Integer eligibleCourseNumberGreaterThanOrEquals,
                                 Integer eligibleCourseNumberLessThanOrEquals,
                                 String eligibleCourseMajorAbbreviationContains,
                                 // tutor_course_preference parameters
                                 List<String> coursePreferenceGradeInList,
                                 Integer coursePreferenceNumberEquals,
                                 Integer coursePreferenceNumberGreaterThanOrEquals,
                                 Integer coursePreferenceNumberLessThanOrEquals,
                                 String coursePreferenceMajorAbbreviationContains,
                                 // tutor_location_preference parameters
                                 List<String> locationNameInList,
                                 Integer pageNumber,
                                 Integer numberEntriesPerPage) {
        Integer limit = numberEntriesPerPage != null ? numberEntriesPerPage : null;
        Integer offset = (numberEntriesPerPage != null) && (pageNumber != null) ? (pageNumber - 1) * numberEntriesPerPage : null;
        List<TutorModel> tutorModelList = tutorMapper.read(activeStatusNameEquals,
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
                limit,
                offset);
        for (TutorModel tutorModel : tutorModelList) {
            String currTutorEmail = tutorModel.getEmail();
            tutorModel.setEligibleCourses(tutorEligibleCourseMapper.read(eligibleCourseGradeInList,
                    eligibleCourseNumberEquals,
                    eligibleCourseNumberGreaterThanOrEquals,
                    eligibleCourseNumberLessThanOrEquals,
                    eligibleCourseMajorAbbreviationContains,
                    currTutorEmail,
                    null,
                    null));
            tutorModel.setCoursePreferences(tutorCoursePreferenceMapper.read(coursePreferenceGradeInList,
                    coursePreferenceNumberEquals,
                    coursePreferenceNumberGreaterThanOrEquals,
                    coursePreferenceNumberLessThanOrEquals,
                    coursePreferenceMajorAbbreviationContains,
                    currTutorEmail,
                    null,
                    null));
            tutorModel.setLocationPreferences(tutorLocationPreferenceMapper.read(locationNameInList, currTutorEmail, null, null));
            tutorModel.setTimePreferences(tutorTimePreferenceService.read(currTutorEmail));
        }
        Integer totalNumberEntries = this.tutorMapper.getTotalNumberEntries(activeStatusNameEquals,
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
                locationNameInList);
        Integer totalNumberPages = numberEntriesPerPage != null ? (int) (Math.ceil((double) totalNumberEntries / numberEntriesPerPage)) : 1;
        Map<String, Integer> metaDataMap = new HashMap<>();
        metaDataMap.put("totalNumberEntries", totalNumberEntries);
        metaDataMap.put("totalNumberPages", totalNumberPages);
        metaDataMap.put("maximumNumberEntriesPerPage", numberEntriesPerPage);
        metaDataMap.put("pageNumber", pageNumber);
        PaginationContainerModel paginationContainerModel = PaginationContainerModel.builder()
                .data(tutorModelList)
                .metaData(metaDataMap)
                .build();
        return paginationContainerModel;
    }

    public void create(TutorModel tutorModel, MultipartFile transcript) {
        this.tutorMapper.create(tutorModel);
        if (transcript != null) {
            this.tutorEligibleCourseService.create(tutorModel.getEmail(), transcript);
        }
    }

    public void update(TutorModel tutorModelOld, TutorModel tutorModelNew, MultipartFile transcript) {
        if (transcript != null) {
            this.tutorEligibleCourseService.create(tutorModelOld.getEmail(), transcript);
        }
        if (tutorModelNew.getCoursePreferences() != null) {
            this.tutorCoursePreferenceMapper.deleteAll(tutorModelOld.getEmail());
            for (TutorCoursePreferenceModel tutorCoursePreferenceModel : tutorModelNew.getCoursePreferences()) {
                this.tutorCoursePreferenceMapper.create(tutorCoursePreferenceModel);
            }
        }
        if (tutorModelNew.getLocationPreferences() != null) {
            this.tutorLocationPreferenceMapper.deleteAll(tutorModelOld.getEmail());
            for (TutorLocationPreferenceModel tutorLocationPreferenceModel : tutorModelNew.getLocationPreferences()) {
                this.tutorLocationPreferenceMapper.create(tutorLocationPreferenceModel);
            }
        }
        if (tutorModelNew.getActiveStatusName() != null ||
                tutorModelNew.getAverageRating() != null ||
                tutorModelNew.getBioText() != null ||
                tutorModelNew.getEmail() != null ||
                tutorModelNew.getFirstName() != null ||
                tutorModelNew.getLastName() != null ||
                tutorModelNew.getListingTitle() != null ||
                tutorModelNew.getMajorAbbreviation() != null ||
                tutorModelNew.getNumberOfRatings() != null ||
                tutorModelNew.getPayRate() != null ||
                tutorModelNew.getPhoneNumber() != null ||
                tutorModelNew.getPictureUrl() != null ||
                tutorModelNew.getSeniorityName() != null) {
            this.tutorMapper.update(tutorModelOld, tutorModelNew);
        }
    }
}