package xyz.tamutheo.databaseAPI.appointmentRequest;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;


@Mapper
public interface AppointmentRequestMapper {
    List<AppointmentRequestModel> read(@Param("appointmentId") Integer appointmentId, @Param("initiatorTypeId") Integer initiatorTypeId);
    void create(AppointmentRequestModel appointmentRequestModel);
    void update(@Param("appointmentRequestModelOld") AppointmentRequestModel appointmentRequestModelOld,
                @Param("appointmentRequestModelNew") AppointmentRequestModel appointmentRequestModelNew);
}
