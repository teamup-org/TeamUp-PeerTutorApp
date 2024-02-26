package xyz.tamutheo.databaseAPI.initiatorType;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class InitiatorTypeModel {
    Integer initiatorTypeId;
    String initiatorTypeName;
}
