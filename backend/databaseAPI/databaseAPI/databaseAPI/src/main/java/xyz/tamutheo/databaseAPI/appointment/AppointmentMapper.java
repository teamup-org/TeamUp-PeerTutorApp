package xyz.tamutheo.databaseAPI.appointment;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;


@Mapper
public interface AppointmentMapper {
    void create(AppointmentModel appointmentModel);
    List<AppointmentModel> read(@Param("appointmentIdEquals") Integer appointmentIdEquals,
                                @Param("appointmentSizeNameContains") String appointmentSizeNameContains,
                                @Param("cancellationReasonContains") String cancellationReasonContains,
                                @Param("endDateTimeLessThanOrEquals") String endDateTimeLessThanOrEquals,
                                @Param("isCancelledEquals") Boolean isCancelledEquals,
                                @Param("isConfirmedEquals") Boolean isConfirmedEquals,
                                @Param("locationNameInList") List<String> locationNameInList,
                                @Param("tuteeEmailContains") String tuteeEmailContains,
                                @Param("tutorEmailContains") String tutorEmailContains,
                                @Param("startDateTimeGreaterThanOrEquals") String startDateTimeGreaterThanOrEquals,
                                @Param("limit") Integer limit,
                                @Param("offset") Integer offset);
    void update(@Param("appointmentModelOld") AppointmentModel appointmentModelOld,
                @Param("appointmentModelNew") AppointmentModel appointmentModelNew);
}


