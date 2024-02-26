package xyz.tamutheo.databaseAPI.tutorLocationPreference;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;


@Mapper
public interface TutorLocationPreferenceMapper {
    List<TutorLocationPreferenceModel> read(@Param("tutorId") Integer tutorId);
    void create(TutorLocationPreferenceModel tutorLocationPreferenceModel);
    void delete(TutorLocationPreferenceModel tutorLocationPreferenceModel);
}