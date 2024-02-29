package xyz.tamutheo.databaseAPI.tutorAverageRating;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface TutorAverageRatingMapper {
    List<TutorAverageRatingModel> read(@Param("tutorId") Integer tutorId);
}
