package xyz.tamutheo.databaseAPI.appointmentType;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AppointmentTypeModel {
    Integer appointmentTypeId;
    String appointmentTypeName;
}
