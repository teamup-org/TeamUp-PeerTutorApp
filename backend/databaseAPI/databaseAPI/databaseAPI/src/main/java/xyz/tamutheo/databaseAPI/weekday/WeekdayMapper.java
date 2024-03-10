package xyz.tamutheo.databaseAPI.weekday;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface WeekdayMapper {
    List<WeekdayModel> read(@Param("weekdayNameInList") List<String> weekdayNameInList,
                             @Param("limit") Integer limit,
                             @Param("offset") Integer offset);
}
