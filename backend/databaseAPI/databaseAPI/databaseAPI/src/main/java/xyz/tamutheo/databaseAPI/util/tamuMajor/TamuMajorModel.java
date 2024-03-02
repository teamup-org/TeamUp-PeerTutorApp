package xyz.tamutheo.databaseAPI.util.tamuMajor;

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
