package xyz.tamutheo.databaseAPI.userFeedback;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserFeedbackModel {
    private Long id;
    private String userId;
    private int rating;
    private String feedback1;
    private String feedback2;
    private String feedback3;
    private String feedback4;
    private String feedback5;
    private String feedback6;
    private String feedback7;
}
