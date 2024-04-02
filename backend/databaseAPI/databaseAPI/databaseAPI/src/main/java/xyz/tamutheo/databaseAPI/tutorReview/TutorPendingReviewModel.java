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
    @JsonIgnore
    String appointmentSizeName;
    @JsonIgnore
    String cancellationReason;
    String endDateTimeString;
    @JsonIgnore
    LocalDateTime endDateTimeValue;
    @JsonIgnore
    Boolean isCancelled;
    @JsonIgnore
    Boolean isConfirmed;
    String locationName;
    String startDateTimeString;
    @JsonIgnore
    LocalDateTime startDateTimeValue;
    @JsonIgnore
    String tuteeEmail;
    @JsonIgnore
    String tuteeFirstName;
    @JsonIgnore
    String tuteeLastName;
    @JsonIgnore
    Long tuteePhoneNumber;
    String tutorEmail;
    String tutorFirstName;
    String tutorLastName;
    Long tutorPhoneNumber;
    String tutorMajorAbbreviation;
    String tutorSeniority;
    String tutorPictureUrl;
}
