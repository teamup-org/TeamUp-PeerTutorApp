package xyz.tamutheo.databaseAPI.timeIncrement;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TimeIncrementModel {
    Integer timeId;
    LocalTime timeValue;
}
