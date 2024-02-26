package xyz.tamutheo.databaseAPI.tutorTimePreference;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;


@Mapper
public interface TutorTimePreferenceMapper {
    List<TutorTimePreferenceModel> read(@Param("tutorId") Integer tutorId);
    void create(TutorTimePreferenceModel tutorTimePreferenceModel);
    void delete(TutorTimePreferenceModel tutorTimePreferenceModel);
}