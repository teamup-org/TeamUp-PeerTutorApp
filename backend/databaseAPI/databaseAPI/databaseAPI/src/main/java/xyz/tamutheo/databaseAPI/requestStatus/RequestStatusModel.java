package xyz.tamutheo.databaseAPI.requestStatus;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RequestStatusModel {
    Integer requestStatusId;
    String statusName;
}
