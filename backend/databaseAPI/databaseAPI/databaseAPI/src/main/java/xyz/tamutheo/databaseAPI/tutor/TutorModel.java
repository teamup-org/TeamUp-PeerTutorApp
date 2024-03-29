package xyz.tamutheo.databaseAPI.tutor;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import xyz.tamutheo.databaseAPI.tutorCoursePreference.TutorCoursePreferenceModel;
import xyz.tamutheo.databaseAPI.tutorEligibleCourse.TutorEligibleCourseModel;
import xyz.tamutheo.databaseAPI.tutorLocationPreference.TutorLocationPreferenceModel;
import xyz.tamutheo.databaseAPI.tutorTimePreference.TutorTimePreferenceModel;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TutorModel {
    String activeStatusName;
    Double averageRating;
    String bioText;
    List<TutorCoursePreferenceModel> coursePreferences;
    List<TutorEligibleCourseModel> eligibleCourses;
    String email;
    String firstName;
    String lastName;
    String listingTitle;
    List<TutorLocationPreferenceModel> locationPreferences;
    String majorAbbreviation;
    Integer numberOfRatings;
    Integer numberOneStarRatings;
    Integer numberTwoStarRatings;
    Integer numberThreeStarRatings;
    Integer numberFourStarRatings;
    Integer numberFiveStarRatings;
    Double payRate;
    Long phoneNumber;
    String pictureUrl;
    String seniorityName;
    List<TutorTimePreferenceModel> timePreferences;
}
