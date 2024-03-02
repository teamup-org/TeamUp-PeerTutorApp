package xyz.tamutheo.databaseAPI.custom.appointmentListing;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AppointmentListingModel {
    Integer appointmentId;
    LocalDate appointmentDate;
    String appointmentStatusName;
    String appointmentTypeName;
    LocalTime endTimeValue;
    String locationName;
    LocalTime startTimeValue;
    String tuteeEmail;
    String tuteeFirstName;
    String tuteeLastName;
    Integer tuteePhoneNumber;
    String tutorEmail;
    String tutorFirstName;
    String tutorLastname;
    Integer tutorPhoneNumber;
}
