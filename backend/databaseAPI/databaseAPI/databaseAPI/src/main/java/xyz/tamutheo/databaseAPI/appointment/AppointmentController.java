package xyz.tamutheo.databaseAPI.appointment;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.time.LocalDate;

@RestController
@RequestMapping("/appointment")
public class AppointmentController {
    @Autowired
    private AppointmentService appointmentService;

    @GetMapping(value = {"", "/"})
    public List<AppointmentModel> read(@RequestParam(name = "tutor_id", required = false) Integer tutorId,
                                       @RequestParam(name = "tutee_id", required = false) Integer tuteeId) {
        return this.appointmentService.read(tutorId, tuteeId);
    }

    @PostMapping(value = {"", "/"})
    public void create(@RequestParam(name = "appointment_type_id") Integer appointmentTypeId,
                       @RequestParam(name = "tutor_id") Integer tutorId,
                       @RequestParam(name = "tutee_id") Integer tuteeId,
                       @RequestParam(name = "appointment_date") @DateTimeFormat(pattern = "dd.MM.yyyy") LocalDate appointmentDate,
                       @RequestParam(name = "start_time_id") Integer startTimeId,
                       @RequestParam(name = "end_time_id") Integer endTimeId,
                       @RequestParam(name = "location_id") Integer locationId,
                       @RequestParam(name = "appointment_status_id") Integer appointmentStatusId) {
        AppointmentModel appointmentModel = AppointmentModel.builder()
                .appointmentTypeId(appointmentTypeId)
                .tutorId(tutorId)
                .tuteeId(tuteeId)
                .appointmentDate(appointmentDate)
                .startTimeId(startTimeId)
                .endTimeId(endTimeId)
                .locationId(locationId)
                .appointmentStatusId(appointmentStatusId).build();
        this.appointmentService.create(appointmentModel);
    }
    @PutMapping(value = {"", "/"})
    public void update(@RequestParam(name = "tutor_id_old") Integer tutorIdOld,
                       @RequestParam(name = "tutee_id_old") Integer tuteeIdOld,
                       @RequestParam(name = "appointment_date_old") @DateTimeFormat(pattern = "dd.MM.yyyy") LocalDate appointmentDateOld,
                       @RequestParam(name = "start_time_id_old") Integer startTimeIdOld,
                       @RequestParam(name = "end_time_id_old") Integer endTimeIdOld,

                       @RequestParam(name = "appointment_type_id_new") Integer appointmentTypeIdNew,
                       @RequestParam(name = "tutor_id_new") Integer tutorIdNew,
                       @RequestParam(name = "tutee_id_new") Integer tuteeIdNew,
                       @RequestParam(name = "appointment_date_new") @DateTimeFormat(pattern = "dd.MM.yyyy") LocalDate appointmentDateNew,
                       @RequestParam(name = "start_time_id_new") Integer startTimeIdNew,
                       @RequestParam(name = "end_time_id_new") Integer endTimeIdNew,
                       @RequestParam(name = "location_id_new") Integer locationIdNew,
                       @RequestParam(name = "appointment_status_id_new") Integer appointmentStatusIdNew) {
        AppointmentModel appointmentModelOld = AppointmentModel.builder()
                .tutorId(tutorIdOld)
                .tuteeId(tuteeIdOld)
                .appointmentDate(appointmentDateOld)
                .startTimeId(startTimeIdOld)
                .endTimeId(endTimeIdOld)
                .build();
        AppointmentModel appointmentModelNew = AppointmentModel.builder()
                .appointmentTypeId(appointmentTypeIdNew)
                .tutorId(tutorIdNew)
                .tuteeId(tuteeIdNew)
                .appointmentDate(appointmentDateNew)
                .startTimeId(startTimeIdNew)
                .endTimeId(endTimeIdNew)
                .locationId(locationIdNew)
                .appointmentStatusId(appointmentStatusIdNew)
                .build();
        this.appointmentService.update(appointmentModelOld, appointmentModelNew);
    }
}