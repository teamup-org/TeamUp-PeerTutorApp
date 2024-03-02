package xyz.tamutheo.databaseAPI.custom.appointmentListing;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/appointment_listing")
public class AppointmentListingController {
    @Autowired
    private AppointmentListingService appointmentListingService;

    @GetMapping(value = {"", "/"})
    public List<AppointmentListingModel> read(@RequestParam(name = "tutor_id", required = false) Integer tutorId,
                                       @RequestParam(name = "tutee_id", required = false) Integer tuteeId) {
        return this.appointmentListingService.read(tutorId, tuteeId);
    }
}