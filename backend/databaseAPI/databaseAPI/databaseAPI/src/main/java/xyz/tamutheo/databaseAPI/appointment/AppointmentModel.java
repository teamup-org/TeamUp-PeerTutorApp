package xyz.tamutheo.databaseAPI.appointment;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AppointmentModel {
    LocalDate appointmentDate;
    Integer appointmentId;
    Integer appointmentStatusId;
    Integer appointmentTypeId;
    Integer endTimeId;
    Integer locationId;
    Integer startTimeId;
    Integer tuteeId;
    Integer tutorId;
}
