package xyz.tamutheo.databaseAPI.tutorEligibleCourse;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TutorEligibleCourseModel {
    Character courseGrade;
    Integer courseId;
    Integer eligibilityId;
    Integer tutorId;
}
