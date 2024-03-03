package xyz.tamutheo.databaseAPI.util.tamuMajorAndCourse.tamuMajor;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TamuMajorModel {
    String majorAbbreviation;
    String majorName;
}
