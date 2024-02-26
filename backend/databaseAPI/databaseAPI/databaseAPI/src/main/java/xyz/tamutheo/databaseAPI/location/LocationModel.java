package xyz.tamutheo.databaseAPI.location;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class LocationModel {
    Boolean isIndoor;
    Boolean isOnCampus;
    Boolean isOnline;
    Integer locationId;
    String locationName;
}
