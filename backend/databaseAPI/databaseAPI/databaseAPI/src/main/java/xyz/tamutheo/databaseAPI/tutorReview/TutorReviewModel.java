package xyz.tamutheo.databaseAPI.tutorReview;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TutorReviewModel {
    Integer ratingId;
    Integer reviewId;
    String reviewText;
    Integer tuteeId;
    Integer tutorId;
}
