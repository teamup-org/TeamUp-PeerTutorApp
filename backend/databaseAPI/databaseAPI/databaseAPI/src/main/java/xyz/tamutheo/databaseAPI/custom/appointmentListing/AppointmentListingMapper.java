package xyz.tamutheo.databaseAPI.custom.appointmentListing;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;


@Mapper
public interface AppointmentListingMapper {
    List<AppointmentListingModel> read(@Param("tutorId") Integer tutorId, @Param("tuteeId") Integer tuteeId);
}
