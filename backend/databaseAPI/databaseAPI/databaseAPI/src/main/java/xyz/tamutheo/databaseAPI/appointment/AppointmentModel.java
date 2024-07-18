package xyz.tamutheo.databaseAPI.appointment;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AppointmentModel {
    Integer appointmentId;
    String appointmentSizeName;
    String cancellationReason;
    String endDateTimeString;
    String CommentTitle;
    @JsonIgnore
    LocalDateTime endDateTimeValue;
    Boolean isCancelled;
    Boolean isConfirmed;
    String locationName;
    String startDateTimeString;
    @JsonIgnore
    LocalDateTime startDateTimeValue;
    String tuteeEmail;
    String tuteeFirstName;
    String tuteeLastName;
    String tuteeMajorAbbreviation;
    Long tuteePhoneNumber;
    String tuteePictureUrl;
    String tuteeRequestComment;
    String tuteeSeniorityName;
    String tutorEmail;
    String tutorFirstName;
    String tutorLastName;
    String tutorMajorAbbreviation;
    Long tutorPhoneNumber;
    String tutorPictureUrl;
    String tutorSeniorityName;
}
