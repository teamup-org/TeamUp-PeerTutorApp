package xyz.tamutheo.databaseAPI.major;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MajorModel {
    String majorAbbreviation;
    String majorName;
}
