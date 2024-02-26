package xyz.tamutheo.databaseAPI.appointmentType;

import org.apache.ibatis.annotations.Mapper;

import java.util.List;


@Mapper
public interface AppointmentTypeMapper {
    List<AppointmentTypeModel> read();
}