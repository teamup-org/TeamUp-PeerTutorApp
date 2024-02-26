package xyz.tamutheo.databaseAPI.rating;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RatingModel {
    Integer numberStars;
    Integer ratingId;
}
