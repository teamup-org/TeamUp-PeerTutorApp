package xyz.tamutheo.databaseAPI.util.paginationContainer;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PaginationContainerModel {
    Object data;
    Object metaData;
}
