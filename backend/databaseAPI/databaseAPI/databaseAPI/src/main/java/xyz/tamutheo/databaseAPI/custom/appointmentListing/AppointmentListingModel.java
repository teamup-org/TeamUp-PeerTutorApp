package xyz.tamutheo.databaseAPI.custom.appointmentListing;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AppointmentListingModel {
    Integer appointmentId;
    LocalDateTime startDateTimeValue;
    LocalDateTime endDateTimeValue;
    String startDateTimeString;
    String endDateTimeString;
    String appointmentStatusName;
    String appointmentTypeName;
    String locationName;
    String tuteeEmail;
    String tuteeFirstName;
    String tuteeLastName;
    Long tuteePhoneNumber;
    String tutorEmail;
    String tutorFirstName;
    String tutorLastname;
    Long tutorPhoneNumber;
}
