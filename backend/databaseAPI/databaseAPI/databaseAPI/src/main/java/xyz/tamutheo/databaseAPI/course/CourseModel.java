package xyz.tamutheo.databaseAPI.course;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CourseModel {
    String majorAbbreviation;
    Integer courseId;
    String courseTitle;
    Integer courseNumber;
}
