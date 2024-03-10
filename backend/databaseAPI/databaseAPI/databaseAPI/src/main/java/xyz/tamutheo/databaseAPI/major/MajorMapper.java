package xyz.tamutheo.databaseAPI.major;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;


@Mapper
public interface MajorMapper {
    List<MajorModel> read(@Param("majorAbbreviationContains") String majorAbbreviationContains,
                          @Param("majorNameContains") String majorNameContains,
                          @Param("limit") Integer limit,
                          @Param("offset") Integer offset);
}