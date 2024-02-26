package xyz.tamutheo.databaseAPI.tutorEligibility;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;


@Mapper
public interface TutorEligibilityMapper {
    List<TutorEligibilityModel> read(@Param("tutorId") Integer tutorId);
    void create(TutorEligibilityModel tutorEligibilityModel);
}