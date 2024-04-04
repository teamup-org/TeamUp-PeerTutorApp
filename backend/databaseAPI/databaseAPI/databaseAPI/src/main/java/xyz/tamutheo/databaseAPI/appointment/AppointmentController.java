package xyz.tamutheo.databaseAPI.appointment;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;
import xyz.tamutheo.databaseAPI.util.paginationContainer.PaginationContainerModel;

import java.time.LocalDateTime;

import java.util.Arrays;
import java.util.List;


@RestController
@RequestMapping("/appointment")
public class AppointmentController {
    @Autowired
    private AppointmentService appointmentService;
    @PostMapping(value = {"", "/"})
    public void create(@RequestParam(name = "appointment_size_name", defaultValue = "single") String appointmentSizeName,
                       @RequestParam(name = "end_date_time") String endDateTimeString,
                       @RequestParam(name = "location_name") String locationName,
                       @RequestParam(name = "tutee_email") String tuteeEmail,
                       @RequestParam(name = "tutor_email") String tutorEmail,
                       @RequestParam(name = "tutee_request_comment", required = false) String tuteeRequestComment,
                       @RequestParam(name = "start_date_time") String startDateTimeString) {
        AppointmentModel appointmentModel = AppointmentModel.builder()
                .appointmentSizeName(appointmentSizeName)
                .endDateTimeString(endDateTimeString)
                .locationName(locationName)
                .tuteeEmail(tuteeEmail)
                .tuteeRequestComment(tuteeRequestComment)
                .tutorEmail(tutorEmail)
                .startDateTimeString(startDateTimeString)
                .build();
        this.appointmentService.create(appointmentModel);
    }
    @GetMapping(value = {"", "/"})
    public PaginationContainerModel read(@RequestParam(name = "appointment_id_equals", required = false) Integer appointmentIdEquals,
                                         @RequestParam(name = "appointment_size_name_contains", required = false) String appointmentSizeNameContains,
                                         @RequestParam(name = "cancellation_reason_contains", required = false) String cancellationReasonContains,
                                         @RequestParam(name = "end_date_time_less_than_or_equals", required = false) String endDateTimeLessThanOrEquals,
                                         @RequestParam(name = "is_cancelled_equals", required = false) Boolean isCancelledEquals,
                                         @RequestParam(name = "is_confirmed_equals", required = false) Boolean isConfirmedEquals,
                                         @RequestParam(name = "location_name_in", required = false) String locationNameIn,
                                         @RequestParam(name = "tutee_email_contains", required = false) String tuteeEmailContains,
                                         @RequestParam(name = "tutor_email_contains", required = false) String tutorEmailContains,
                                         @RequestParam(name = "start_date_time_greater_than_or_equals", required = false) String startDateTimeGreaterThanOrEquals,
                                         @RequestParam(name = "page_number", required = false, defaultValue = "1") Integer pageNumber,
                                         @RequestParam(name = "number_entries_per_page", required = false) Integer numberEntriesPerPage) {
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
                pageNumber,
                numberEntriesPerPage);
    }

    //    @PutMapping(value = {"", "/"})
    @RequestMapping(value = {"/update"})
    public void update(@RequestParam(name = "end_date_time_old") String endDateTimeStringOld,
                       @RequestParam(name = "tutee_email_old") String tuteeEmailOld,
                       @RequestParam(name = "tutor_email_old") String tutorEmailOld,
                       @RequestParam(name = "start_date_time_old") String startDateTimeStringOld,
                       @RequestParam(name = "cancellation_reason_new", required = false) String cancellationReasonNew,
                       @RequestParam(name = "is_cancelled_new", required = false) Boolean isCancelledNew,
                       @RequestParam(name = "is_confirmed_new", required = false) Boolean isConfirmedNew,
                       @RequestParam(name = "tutee_request_comment_new", required = false) String tuteeRequestCommentNew) {
        AppointmentModel appointmentModelOld = AppointmentModel.builder()
                .endDateTimeString(endDateTimeStringOld)
                .tuteeEmail(tuteeEmailOld)
                .tutorEmail(tutorEmailOld)
                .startDateTimeString(startDateTimeStringOld)
                .build();
        AppointmentModel appointmentModelNew = AppointmentModel.builder()
                .cancellationReason(cancellationReasonNew)
                .isCancelled(isCancelledNew)
                .isConfirmed(isConfirmedNew)
                .tuteeRequestComment(tuteeRequestCommentNew)
                .build();
        this.appointmentService.update(appointmentModelOld, appointmentModelNew);
    }
}