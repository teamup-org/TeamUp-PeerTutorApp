package xyz.tamutheo.databaseAPI.tutorTimePreference;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TutorTimePreferenceModel {
    String endTimeString;
    @JsonIgnore
    LocalTime endTimeValue;
    String startTimeString;
    @JsonIgnore
    LocalTime startTimeValue;
    String tutorEmail;
    String weekdayName;
}