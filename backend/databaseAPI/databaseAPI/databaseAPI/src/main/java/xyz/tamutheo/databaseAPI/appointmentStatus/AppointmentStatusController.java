package xyz.tamutheo.databaseAPI.appointmentStatus;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import xyz.tamutheo.databaseAPI.appointmentStatus.AppointmentStatusModel;
import xyz.tamutheo.databaseAPI.appointmentStatus.AppointmentStatusService;

import java.util.List;

@RestController
@RequestMapping("/appointment_status")
public class AppointmentStatusController {
    @Autowired
    private AppointmentStatusService appointmentStatusService;
    @GetMapping(value = {"", "/"})
    public List<AppointmentStatusModel> respond() {
        return this.appointmentStatusService.read();
    }
}