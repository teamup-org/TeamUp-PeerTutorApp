package xyz.tamutheo.databaseAPI.tutorTimePreference;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TutorTimePreferenceModel {
    Integer endTimeId;
    Integer startTimeId;
    Integer tutorId;
    Integer tutorTimePreferenceId;
}
