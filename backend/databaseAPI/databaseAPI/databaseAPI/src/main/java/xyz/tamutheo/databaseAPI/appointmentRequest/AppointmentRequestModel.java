package xyz.tamutheo.databaseAPI.appointmentRequest;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AppointmentRequestModel {
    Integer appointmentId;
    Integer appointmentRequestId;
    Integer initiatorTypeId;
    Integer requestStatusId;
    Integer requestTypeId;
}
