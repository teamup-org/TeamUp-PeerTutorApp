package xyz.tamutheo.databaseAPI.tutorEligibility;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TutorEligibilityModel {
    Character courseGrade;
    Integer courseId;
    Integer eligibilityId;
    Boolean isEligible;
    Integer tutorId;
}
