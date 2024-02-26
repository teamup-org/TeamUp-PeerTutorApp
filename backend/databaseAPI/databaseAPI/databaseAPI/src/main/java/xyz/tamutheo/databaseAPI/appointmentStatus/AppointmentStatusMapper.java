package xyz.tamutheo.databaseAPI.appointmentStatus;

import org.apache.ibatis.annotations.Mapper;

import java.util.List;


@Mapper
public interface AppointmentStatusMapper {
    List<AppointmentStatusModel> read();
}