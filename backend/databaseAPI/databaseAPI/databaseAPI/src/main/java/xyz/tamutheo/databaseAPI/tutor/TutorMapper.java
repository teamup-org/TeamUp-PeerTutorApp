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
                          @Param("contains") String contains,
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
                          @Param("sortBy") String sortBy,
                          // tutor_eligible_course parameters
                          @Param("eligibleCourseGradeInList") List<String> eligibleCourseGradeInList,
                          @Param("eligibleCourseNumberEquals") Integer eligibleCourseNumberEquals,
                          @Param("eligibleCourseNumberGreaterThanOrEquals") Integer eligibleCourseNumberGreaterThanOrEquals,
                          @Param("eligibleCourseNumberLessThanOrEquals") Integer eligibleCourseNumberLessThanOrEquals,
                          @Param("eligibleCourseMajorAbbreviationContains") String eligibleCourseMajorAbbreviationContains,
                          // tutor_course_preference parameters
                          @Param("coursePreferenceGradeInList") List<String> coursePreferenceGradeInList,
                          @Param("coursePreferenceNumberEquals") Integer coursePreferenceNumberEquals,
                          @Param("coursePreferenceNumberGreaterThanOrEquals") Integer coursePreferenceNumberGreaterThanOrEquals,
                          @Param("coursePreferenceNumberLessThanOrEquals") Integer coursePreferenceNumberLessThanOrEquals,
                          @Param("coursePreferenceMajorAbbreviationContains") String coursePreferenceMajorAbbreviationContains,
                          // tutor_location_preference parameters
                          @Param("locationNameInList") List<String> locationNameInList,
                          @Param("limit") Integer limit,
                          @Param("offset") Integer offset);
    void create(TutorModel tutorModel);
    void update(@Param("tutorModelOld") TutorModel tutorModelOld,
                @Param("tutorModelNew") TutorModel tutorModelNew);
    Integer getTotalNumberEntries(@Param("activeStatusNameEquals") String activeStatusNameEquals,
                                  @Param("averageRatingGreaterThanOrEquals") Double averageRatingGreaterThanOrEquals,
                                  @Param("averageRatingLessThanOrEquals") Double averageRatingLessThanOrEquals,
                                  @Param("bioTextContains") String bioTextContains,
                                  @Param("contains") String contains,
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
                                  @Param("sortBy") String sortBy,
                                  // tutor_eligible_course parameters
                                  @Param("eligibleCourseGradeInList") List<String> eligibleCourseGradeInList,
                                  @Param("eligibleCourseNumberEquals") Integer eligibleCourseNumberEquals,
                                  @Param("eligibleCourseNumberGreaterThanOrEquals") Integer eligibleCourseNumberGreaterThanOrEquals,
                                  @Param("eligibleCourseNumberLessThanOrEquals") Integer eligibleCourseNumberLessThanOrEquals,
                                  @Param("eligibleCourseMajorAbbreviationContains") String eligibleCourseMajorAbbreviationContains,
                                  // tutor_course_preference parameters
                                  @Param("coursePreferenceGradeInList") List<String> coursePreferenceGradeInList,
                                  @Param("coursePreferenceNumberEquals") Integer coursePreferenceNumberEquals,
                                  @Param("coursePreferenceNumberGreaterThanOrEquals") Integer coursePreferenceNumberGreaterThanOrEquals,
                                  @Param("coursePreferenceNumberLessThanOrEquals") Integer coursePreferenceNumberLessThanOrEquals,
                                  @Param("coursePreferenceMajorAbbreviationContains") String coursePreferenceMajorAbbreviationContains,
                                  // tutor_location_preference parameters
                                  @Param("locationNameInList") List<String> locationNameInList);
}