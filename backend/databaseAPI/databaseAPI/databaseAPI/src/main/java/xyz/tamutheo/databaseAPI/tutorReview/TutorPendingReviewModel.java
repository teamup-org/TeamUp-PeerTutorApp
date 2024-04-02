package xyz.tamutheo.databaseAPI.tutorReview;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TutorPendingReviewModel {
    Integer appointmentId;
    String appointmentSizeName;
    String cancellationReason;
    String endDateTimeString;
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
    Long tuteePhoneNumber;
    String tutorEmail;
    String tutorFirstName;
    String tutorLastName;
    Long tutorPhoneNumber;
    String tutorMajorAbbreviation;
    String tutorSeniority;
    String tutorPictureUrl;
}
