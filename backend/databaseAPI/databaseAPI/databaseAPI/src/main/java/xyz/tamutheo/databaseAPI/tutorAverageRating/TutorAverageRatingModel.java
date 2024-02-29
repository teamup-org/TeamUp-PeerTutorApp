package xyz.tamutheo.databaseAPI.tutorAverageRating;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TutorAverageRatingModel {
    Integer tutorId;
    Double averageRating;
}
