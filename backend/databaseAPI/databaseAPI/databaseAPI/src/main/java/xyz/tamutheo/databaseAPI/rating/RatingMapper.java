package xyz.tamutheo.databaseAPI.rating;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;


@Mapper
public interface RatingMapper {
    List<RatingModel> read(@Param("numberStarsEquals") Integer numberStarsEquals,
                           @Param("numberStarsGreaterThanOrEquals") Integer numberStarsGreaterThanOrEquals,
                           @Param("numberStarsLessThanOrEquals") Integer numberStarsLessThanOrEquals,
                           @Param("limit") Integer limit,
                           @Param("offset") Integer offset);
}


