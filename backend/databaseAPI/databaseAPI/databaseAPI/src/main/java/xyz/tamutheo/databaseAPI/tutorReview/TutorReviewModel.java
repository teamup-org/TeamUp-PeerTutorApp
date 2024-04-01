package xyz.tamutheo.databaseAPI.tutorReview;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TutorReviewModel {
    Integer appointmentId;
    Integer numberStars;
    String reviewText;
    @JsonIgnore
    LocalDate reviewDateValue;
    String reviewDateString;
    String tuteeEmail;
    String tutorEmail;
    String tuteeFirstName;
    String tuteeLastName;
    String tuteeSeniority;
    String tuteeMajorAbbreviation;
    String tuteePictureUrl;
}
