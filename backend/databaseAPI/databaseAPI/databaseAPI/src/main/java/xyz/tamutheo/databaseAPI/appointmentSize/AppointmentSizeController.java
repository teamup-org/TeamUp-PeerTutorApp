package xyz.tamutheo.databaseAPI.appointmentSize;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/appointment_size")
public class AppointmentSizeController {
    @Autowired
    private AppointmentSizeService appointmentSizeService;
    @GetMapping(value = {"", "/"})
    public List<AppointmentSizeModel> read(@RequestParam(name = "appointment_size_name_contains", required = false) String appointmentSizeNameContains,
                                           @RequestParam(name = "limit", required = false) Integer limit,
                                           @RequestParam(name = "offset", required = false) Integer offset) {
        return this.appointmentSizeService.read(appointmentSizeNameContains, limit, offset);
    }
}