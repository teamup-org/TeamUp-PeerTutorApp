package xyz.tamutheo.databaseAPI.tutee;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import xyz.tamutheo.databaseAPI.tutorCoursePreference.TutorCoursePreferenceModel;
import xyz.tamutheo.databaseAPI.tutorLocationPreference.TutorLocationPreferenceModel;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TuteeModel {
    String activeStatusName;
    String email;
    String firstName;
    String lastName;
    String majorAbbreviation;
    Long phoneNumber;
    String seniorityName;
    String pictureUrl;
}
