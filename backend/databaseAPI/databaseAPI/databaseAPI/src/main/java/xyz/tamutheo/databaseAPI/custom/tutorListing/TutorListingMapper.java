package xyz.tamutheo.databaseAPI.custom.tutorListing;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import xyz.tamutheo.databaseAPI.custom.tutorListing.nestedModels.TutorCoursePreferenceModel;
import xyz.tamutheo.databaseAPI.custom.tutorListing.nestedModels.TutorLocationPreferenceModel;

import java.util.List;


@Mapper
public interface TutorListingMapper {
    List<TutorListingModel> read(@Param("tutorId") Integer tutor_id);
    List<TutorLocationPreferenceModel> getTutorLocationPreferences(@Param("tutorId") Integer tutorId);
    List<TutorCoursePreferenceModel> getTutorCoursePreferences(@Param("tutorId") Integer tutorId);
}