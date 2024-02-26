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
    String courseDept;
    Integer courseId;
    String courseName;
    Integer courseNumber;
}
