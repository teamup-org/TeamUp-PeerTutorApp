package xyz.tamutheo.databaseAPI.userActiveStatus;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;


@Mapper
public interface UserActiveStatusMapper {
    List<UserActiveStatusModel> read(@Param("limit") Integer limit,
                                     @Param("offset") Integer offset,
                                     @Param("userActiveStatusName") String userActiveStatusName);
}