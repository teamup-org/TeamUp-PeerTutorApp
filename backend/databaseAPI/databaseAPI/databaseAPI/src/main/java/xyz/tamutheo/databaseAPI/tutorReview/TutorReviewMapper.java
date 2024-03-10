package xyz.tamutheo.databaseAPI.tutorReview;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;


@Mapper
public interface TutorReviewMapper {
    List<TutorReviewModel> read(@Param("appointmentIdEquals") Integer appointmentIdEquals,
                                @Param("numberStarsGreaterThanOrEquals") Integer numberStarsGreaterThanOrEquals,
                                @Param("numberStarsLessThanOrEquals") Integer numberStarsLessThanOrEquals,
                                @Param("reviewTextContains") String reviewTextContains,
                                @Param("tuteeEmailContains") String tuteeEmailContains,
                                @Param("tutorEmailContains") String tutorEmailContains,
                                @Param("limit") Integer limit,
                                @Param("offset") Integer offset);
    void create(TutorReviewModel tutorReviewModel);
    void update (@Param("tutorReviewModelOld") TutorReviewModel tutorReviewModelOld,
                 @Param("tutorReviewModelNew") TutorReviewModel tutorReviewModelNew);
    void delete(TutorReviewModel tutorReviewModel);
}
