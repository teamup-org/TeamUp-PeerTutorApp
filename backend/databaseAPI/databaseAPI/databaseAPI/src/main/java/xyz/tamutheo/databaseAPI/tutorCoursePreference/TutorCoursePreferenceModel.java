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
    Character courseGrade;
    Integer courseNumber;
    String majorAbbreviation;
    String tutorEmail;
}
