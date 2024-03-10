package xyz.tamutheo.databaseAPI.appointmentSize;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;


@Mapper
public interface AppointmentSizeMapper {
    List<AppointmentSizeModel> read(@Param("appointmentSizeNameContains") String appointmentSizeNameContains,
                                    @Param("limit") Integer limit,
                                    @Param("offset") Integer offset);
}