
package xyz.tamutheo.databaseAPI.custom.appointmentListing;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.format.DateTimeFormatter;
import java.util.List;

@Service
public class AppointmentListingService {
    @Autowired
    private AppointmentListingMapper appointmentListingMapper;
    public List<AppointmentListingModel> read(Integer tutorId, Integer tuteeId) {
        List<AppointmentListingModel> appointmentListingModelList = this.appointmentListingMapper.read(tutorId, tuteeId);
        for (AppointmentListingModel appointmentListingModel : appointmentListingModelList) {
            appointmentListingModel.setStartDateTimeString(appointmentListingModel.getStartDateTimeValue().format(DateTimeFormatter.ISO_DATE_TIME));
            appointmentListingModel.setEndDateTimeString(appointmentListingModel.getEndDateTimeValue().format(DateTimeFormatter.ISO_DATE_TIME));
        }
        return appointmentListingModelList;
    }
}


