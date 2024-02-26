package xyz.tamutheo.databaseAPI.tutor;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TutorModel {
    Integer activeStatusId;
    Double averageRating;
    String bioText;
    String email;
    String firstName;
    String lastName;
    Integer majorId;
    Double payRate;
    Long phoneNumber;
    String pictureUrl;
    Integer seniorityId;
    Integer tutorId;
    Integer uin;
}
