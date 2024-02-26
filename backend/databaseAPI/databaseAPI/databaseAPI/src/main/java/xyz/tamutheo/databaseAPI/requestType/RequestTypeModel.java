package xyz.tamutheo.databaseAPI.requestType;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RequestTypeModel {
    Integer requestTypeId;
    String requestTypeName;
}
