package xyz.tamutheo.databaseAPI.custom.tutorListing.nestedModels;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TutorCoursePreferenceModel {
    String majorAbbreviation;
    Character courseGrade;
    String courseTitle;
    Integer courseNumber;
}
