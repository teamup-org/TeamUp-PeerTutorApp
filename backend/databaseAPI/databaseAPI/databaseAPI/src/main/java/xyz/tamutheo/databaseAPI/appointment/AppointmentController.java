package xyz.tamutheo.databaseAPI.appointment;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Arrays;
import java.util.List;
import java.time.LocalDate;

@RestController
@RequestMapping("/appointment")
public class AppointmentController {
    @Autowired
    private AppointmentService appointmentService;

    @PostMapping(value = {"", "/"})
    public void create(@RequestParam(name = "appointment_size_name", defaultValue = "single") String appointmentSizeName,
                       @RequestParam(name = "end_date_time") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime endDateTimeValue,
                       @RequestParam(name = "location_name") String locationName,
                       @RequestParam(name = "tutee_email") String tuteeEmail,
                       @RequestParam(name = "tutor_email") String tutorEmail,
                       @RequestParam(name = "start_date_time") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime startDateTimeValue) {
        AppointmentModel appointmentModel = AppointmentModel.builder()
                .appointmentSizeName(appointmentSizeName)
                .endDateTimeValue(endDateTimeValue)
                .locationName(locationName)
                .tuteeEmail(tuteeEmail)
                .tutorEmail(tutorEmail)
                .startDateTimeValue(startDateTimeValue)
                .build();
        this.appointmentService.create(appointmentModel);
    }

    @GetMapping(value = {"", "/"})
    public List<AppointmentModel> read(@RequestParam(name = "appointment_id_equals", required = false) Integer appointmentIdEquals,
                                       @RequestParam(name = "appointment_size_name_contains", required = false) String appointmentSizeNameContains,
                                       @RequestParam(name = "cancellation_reason_contains", required = false) String cancellationReasonContains,
                                       @RequestParam(name = "end_date_time_less_than_or_equals", required = false) String endDateTimeLessThanOrEquals,
                                       @RequestParam(name = "is_cancelled_equals", required = false) Boolean isCancelledEquals,
                                       @RequestParam(name = "is_confirmed_equals", required = false) Boolean isConfirmedEquals,
                                       @RequestParam(name = "location_name_in", required = false) String locationNameIn,
                                       @RequestParam(name = "tutee_email_contains", required = false) String tuteeEmailContains,
                                       @RequestParam(name = "tutor_email_contains", required = false) String tutorEmailContains,
                                       @RequestParam(name = "start_date_time_greater_than_or_equals", required = false) String startDateTimeGreaterThanOrEquals,
                                       @RequestParam(name = "limit", required = false) Integer limit,
                                       @RequestParam(name = "offset", required = false) Integer offset) {
        List<String> locationNameInList = null;
        if (locationNameIn != null) {
            locationNameInList = Arrays.asList(locationNameIn.split(", "));
            for (int idx = 0; idx < locationNameInList.size(); idx++) {
                locationNameInList.set(idx, locationNameInList.get(idx).trim());
            }
        }
        return this.appointmentService.read(appointmentIdEquals,
                appointmentSizeNameContains,
                cancellationReasonContains,
                endDateTimeLessThanOrEquals,
                isCancelledEquals,
                isConfirmedEquals,
                locationNameInList,
                tuteeEmailContains,
                tutorEmailContains,
                startDateTimeGreaterThanOrEquals,
                limit,
                offset);
    }
    @PutMapping(value = {"", "/"})
    public void update(@RequestParam(name = "end_date_time_old") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime endDateTimeValueOld,
                       @RequestParam(name = "tutee_email_old") String tuteeEmailOld,
                       @RequestParam(name = "tutor_email_old") String tutorEmailOld,
                       @RequestParam(name = "start_date_time_old") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime startDateTimeValueOld,
                       @RequestParam(name = "appointment_size_name_new", required = false) String appointmentSizeNameNew,
                       @RequestParam(name = "cancellation_reason_new", required = false) String cancellationReasonNew,
                       @RequestParam(name = "end_date_time_new", required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime endDateTimeValueNew,
                       @RequestParam(name = "is_cancelled_new", required = false) Boolean isCancelledNew,
                       @RequestParam(name = "is_confirmed_new", required = false) Boolean isConfirmedNew,
                       @RequestParam(name = "location_name_new", required = false) String locationNameNew,
                       @RequestParam(name = "start_date_time_new", required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime startDateTimeValueNew) {
        AppointmentModel appointmentModelOld = AppointmentModel.builder()
                .endDateTimeValue(endDateTimeValueOld)
                .tuteeEmail(tuteeEmailOld)
                .tutorEmail(tutorEmailOld)
                .startDateTimeValue(startDateTimeValueOld)
                .build();
        AppointmentModel appointmentModelNew = AppointmentModel.builder()
                .appointmentSizeName(appointmentSizeNameNew)
                .cancellationReason(cancellationReasonNew)
                .isCancelled(isCancelledNew)
                .isConfirmed(isConfirmedNew)
                .endDateTimeValue(endDateTimeValueNew)
                .locationName(locationNameNew)
                .startDateTimeValue(startDateTimeValueNew)
                .build();
        this.appointmentService.update(appointmentModelOld, appointmentModelNew);
    }
}