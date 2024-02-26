package xyz.tamutheo.databaseAPI.tutee;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TuteeModel {
    String email;
    String firstName;
    String lastName;
    Integer majorId;
    Long phoneNumber;
    Integer seniorityId;
    Integer tuteeId;
    Integer uin;
}
