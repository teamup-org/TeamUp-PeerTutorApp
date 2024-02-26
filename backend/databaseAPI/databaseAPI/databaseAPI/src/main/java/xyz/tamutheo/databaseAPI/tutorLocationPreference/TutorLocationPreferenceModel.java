package xyz.tamutheo.databaseAPI.tutorLocationPreference;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TutorLocationPreferenceModel {
    Integer locationId;
    Integer locationPreferenceId;
    Integer tutorId;
}
