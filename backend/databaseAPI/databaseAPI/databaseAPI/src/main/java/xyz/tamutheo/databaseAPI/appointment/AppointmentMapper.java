package xyz.tamutheo.databaseAPI.appointment;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.time.LocalDate;
import java.util.List;


@Mapper
public interface AppointmentMapper {
    void create(AppointmentModel appointmentModel);
    List<AppointmentModel> read(@Param("tutorId") Integer tutorId, @Param("tuteeId") Integer tuteeId);
    void update(@Param("appointmentModelOld") AppointmentModel appointmentModelOld,
                @Param("appointmentModelNew") AppointmentModel appointmentModelNew);
}
