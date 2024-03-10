package xyz.tamutheo.databaseAPI.tutor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import xyz.tamutheo.databaseAPI.tutorCoursePreference.TutorCoursePreferenceMapper;
import xyz.tamutheo.databaseAPI.tutorCoursePreference.TutorCoursePreferenceModel;
import xyz.tamutheo.databaseAPI.tutorLocationPreference.TutorLocationPreferenceMapper;
import xyz.tamutheo.databaseAPI.tutorLocationPreference.TutorLocationPreferenceModel;

import java.util.List;

@Service
public class TutorService {
    @Autowired
    private TutorMapper tutorMapper;
    @Autowired
    private TutorCoursePreferenceMapper tutorCoursePreferenceMapper;
    @Autowired
    private TutorLocationPreferenceMapper tutorLocationPreferenceMapper;

    public List<TutorModel> read(String activeStatusNameEquals,
                                 Double averageRatingGreaterThanOrEquals,
                                 Double averageRatingLessThanOrEquals,
                                 String bioTextContains,
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
                                 // tutor_course_preference parameters
                                 List<String> courseGradeInList,
                                 Integer courseNumberEquals,
                                 Integer courseNumberGreaterThanOrEquals,
                                 Integer courseNumberLessThanOrEquals,
                                 String courseMajorAbbreviationContains,
                                 // tutor_location_preference parameters
                                 List<String> locationNameInList,
                                 Integer limit,
                                 Integer offset) {
        List<TutorModel> tutorModelList = tutorMapper.read(activeStatusNameEquals,
                averageRatingGreaterThanOrEquals,
                averageRatingLessThanOrEquals,
                bioTextContains,
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
                // tutor_course_preference parameters
                courseGradeInList,
                courseNumberEquals,
                courseNumberGreaterThanOrEquals,
                courseNumberLessThanOrEquals,
                courseMajorAbbreviationContains,
                // tutor_location_preference parameters
                locationNameInList,
                limit,
                offset);
        for (TutorModel tutorModel : tutorModelList) {
            String currTutorEmail = tutorModel.getEmail();
            tutorModel.setCoursePreferences(tutorCoursePreferenceMapper.read(courseGradeInList,
                    courseNumberEquals,
                    courseNumberGreaterThanOrEquals,
                    courseNumberLessThanOrEquals,
                    courseMajorAbbreviationContains,
                    currTutorEmail,
                    null,
                    null));
            tutorModel.setLocationPreferences(tutorLocationPreferenceMapper.read(locationNameInList, currTutorEmail, null, null));
        }
        return tutorModelList;
    }

    public void create(TutorModel tutorModel) {
        this.tutorMapper.create(tutorModel);
    }

    public void update(TutorModel tutorModelOld, TutorModel tutorModelNew) {
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