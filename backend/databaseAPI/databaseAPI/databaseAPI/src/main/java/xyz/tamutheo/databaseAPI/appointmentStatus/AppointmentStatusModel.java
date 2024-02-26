package xyz.tamutheo.databaseAPI.appointmentStatus;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AppointmentStatusModel {
    Integer appointmentStatusId;
    String statusName;
}
