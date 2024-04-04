package xyz.tamutheo.databaseAPI.tutorReview;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import xyz.tamutheo.databaseAPI.appointment.AppointmentModel;

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
                                @Param("offset") Integer offset,
                                @Param("sortBy") String sortBy);
    void create(TutorReviewModel tutorReviewModel);
    void update (@Param("tutorReviewModelOld") TutorReviewModel tutorReviewModelOld,
                 @Param("tutorReviewModelNew") TutorReviewModel tutorReviewModelNew);
    void delete(TutorReviewModel tutorReviewModel);
    Integer getTotalNumberEntries(@Param("appointmentIdEquals") Integer appointmentIdEquals,
                                  @Param("numberStarsGreaterThanOrEquals") Integer numberStarsGreaterThanOrEquals,
                                  @Param("numberStarsLessThanOrEquals") Integer numberStarsLessThanOrEquals,
                                  @Param("reviewTextContains") String reviewTextContains,
                                  @Param("tuteeEmailContains") String tuteeEmailContains,
                                  @Param("tutorEmailContains") String tutorEmailContains);
    List<TutorPendingReviewModel> getPendingReviews(@Param("appointmentIdEquals") Integer appointmentIdEquals,
                                @Param("appointmentSizeNameContains") String appointmentSizeNameContains,
                                @Param("cancellationReasonContains") String cancellationReasonContains,
                                @Param("endDateTimeLessThanOrEquals") String endDateTimeLessThanOrEquals,
                                @Param("isCancelledEquals") Boolean isCancelledEquals,
                                @Param("isConfirmedEquals") Boolean isConfirmedEquals,
                                @Param("locationNameInList") List<String> locationNameInList,
                                @Param("tuteeEmailContains") String tuteeEmailContains,
                                @Param("tutorEmailContains") String tutorEmailContains,
                                @Param("startDateTimeGreaterThanOrEquals") String startDateTimeGreaterThanOrEquals);
}
