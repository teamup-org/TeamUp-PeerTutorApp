package xyz.tamutheo.databaseAPI.tutorCoursePreference;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TutorCoursePreferenceModel {
    Integer coursePreferenceId;
    Integer eligibilityId;
    Integer tutorId;
}
