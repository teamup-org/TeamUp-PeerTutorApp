package xyz.tamutheo.databaseAPI.tutor;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;


@Mapper
public interface TutorMapper {
    List<TutorModel> read(@Param("activeStatusNameEquals") String activeStatusNameEquals,
                          @Param("averageRatingGreaterThanOrEquals") Double averageRatingGreaterThanOrEquals,
                          @Param("averageRatingLessThanOrEquals") Double averageRatingLessThanOrEquals,
                          @Param("bioTextContains") String bioTextContains,
                          @Param("emailContains") String emailContains,
                          @Param("firstNameContains") String firstNameContains,
                          @Param("lastNameContains") String lastNameContains,
                          @Param("listingTitleContains") String listingTitleContains,
                          @Param("majorAbbreviationContains") String majorAbbreviationContains,
                          @Param("numberOfRatingsGreaterThanOrEquals") Integer numberOfRatingsGreaterThanOrEquals,
                          @Param("numberOfRatingsLessThanOrEquals") Integer numberOfRatingsLessThanOrEquals,
                          @Param("payRateGreaterThanOrEquals") Double payRateGreaterThanOrEquals,
                          @Param("payRateLessThanOrEquals") Double payRateLessThanOrEquals,
                          @Param("phoneNumberContains") Long phoneNumberContains,
                          @Param("pictureUrlContains") String pictureUrlContains,
                          @Param("seniorityNameInList") List<String> seniorityNameInList,
                          // tutor_course_preference parameters
                          @Param("courseGradeInList") List<String> courseGradeInList,
                          @Param("courseNumberEquals") Integer courseNumberEquals,
                          @Param("courseNumberGreaterThanOrEquals") Integer courseNumberGreaterThanOrEquals,
                          @Param("courseNumberLessThanOrEquals") Integer courseNumberLessThanOrEquals,
                          @Param("courseMajorAbbreviationContains") String courseMajorAbbreviationContains,
                          // tutor_location_preference parameters
                          @Param("locationNameInList") List<String> locationNameInList,
                          @Param("limit") Integer limit,
                          @Param("offset") Integer offset);
    void create(TutorModel tutorModel);
    void update(@Param("tutorModelOld") TutorModel tutorModelOld,
                @Param("tutorModelNew") TutorModel tutorModelNew);
}