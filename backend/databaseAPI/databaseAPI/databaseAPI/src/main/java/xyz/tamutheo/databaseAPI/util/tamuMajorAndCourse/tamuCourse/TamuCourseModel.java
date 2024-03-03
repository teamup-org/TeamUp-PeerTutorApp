package xyz.tamutheo.databaseAPI.util.tamuMajorAndCourse.tamuCourse;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TamuCourseModel {
    String majorAbbreviation;
    Integer courseNumber;
    String courseTitle;
}
