package xyz.tamutheo.databaseAPI.tutorReview;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;


@Mapper
public interface TutorReviewMapper {
    List<TutorReviewModel> read(@Param("tutorId") Integer tutorId, @Param("tuteeId") Integer tuteeId);
    void create(TutorReviewModel tutorReviewModel);
    void update (@Param("tutorReviewModelOld") TutorReviewModel tutorReviewModelOld,
                 @Param("tutorReviewModelNew") TutorReviewModel tutorReviewModelNew);
    void delete(TutorReviewModel tutorReviewModel);
}