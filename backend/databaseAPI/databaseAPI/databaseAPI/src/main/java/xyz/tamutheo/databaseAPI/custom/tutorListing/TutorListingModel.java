package xyz.tamutheo.databaseAPI.custom.tutorListing;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import xyz.tamutheo.databaseAPI.custom.tutorListing.nestedModels.TutorCoursePreferenceModel;
import xyz.tamutheo.databaseAPI.custom.tutorListing.nestedModels.TutorLocationPreferenceModel;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TutorListingModel {
    String activeStatusName;
    String bioText;
    String email;
    String firstName;
    String lastName;
    String listingTitle;
    List<TutorCoursePreferenceModel> coursePreferences;
    List<TutorLocationPreferenceModel> locationPreferences;
    String majorName;
    Integer numberOfRatings;
    Double payRate;
    Long phoneNumber;
    String pictureUrl;
    Double averageRating;
    String seniorityName;
    Integer tutorId;
    Integer uin;
}
