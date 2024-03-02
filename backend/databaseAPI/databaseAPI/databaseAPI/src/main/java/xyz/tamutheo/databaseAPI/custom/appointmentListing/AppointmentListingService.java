
package xyz.tamutheo.databaseAPI.custom.appointmentListing;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AppointmentListingService {
    @Autowired
    private AppointmentListingMapper appointmentListingMapper;
    public List<AppointmentListingModel> read(Integer tutorId, Integer tuteeId) {
        return this.appointmentListingMapper.read(tutorId, tuteeId);
    }
}


