package xyz.tamutheo.databaseAPI.appointmentType;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/appointment_type")
public class AppointmentTypeController {
@Autowired
private AppointmentTypeService appointmentTypeService;
@GetMapping(value = {"", "/"})
public List<AppointmentTypeModel> respond() {
    return this.appointmentTypeService.read();
}
}