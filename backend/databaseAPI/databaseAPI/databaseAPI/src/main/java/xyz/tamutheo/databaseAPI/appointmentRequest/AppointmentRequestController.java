package xyz.tamutheo.databaseAPI.appointmentRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/appointment_request")
public class AppointmentRequestController{
    @Autowired
    private AppointmentRequestService appointmentRequestService;
    @GetMapping(value = {"", "/"})
    public List<AppointmentRequestModel> read(@RequestParam(name = "appointment_id", required = false) Integer appointmentId,
                                              @RequestParam(name = "initiator_type_id", required = false) Integer initiatorTypeId) {
        return this.appointmentRequestService.read(appointmentId, initiatorTypeId);
    }
    @PostMapping(value = {"", "/"})
    public void create(@RequestParam(name = "request_type_id") Integer requestTypeId,
                       @RequestParam(name = "appointment_id") Integer appointmentId,
                       @RequestParam(name = "initiator_type_id") Integer initiatorTypeId,
                       @RequestParam(name = "request_status_id") Integer requestStatusId) {
        AppointmentRequestModel appointmentRequestModel = AppointmentRequestModel.builder()
                .requestTypeId(requestTypeId)
                .appointmentId(appointmentId)
                .initiatorTypeId(initiatorTypeId)
                .requestStatusId(requestStatusId)
                .build();
        this.appointmentRequestService.create(appointmentRequestModel);
    }
    @PutMapping(value = {"", "/"})
    public void update(@RequestParam(name = "appointment_id_old") Integer appointmentIdOld,
                       @RequestParam(name = "initiator_type_id_old") Integer initiatorTypeIdOld,
                       @RequestParam(name = "request_type_id_new") Integer requestTypeIdNew,
                       @RequestParam(name = "request_status_id_new") Integer requestStatusIdNew) {
        AppointmentRequestModel appointmentRequestModelOld = AppointmentRequestModel.builder()
                .appointmentId(appointmentIdOld)
                .initiatorTypeId(initiatorTypeIdOld)
                .build();
        AppointmentRequestModel appointmentRequestModelNew = AppointmentRequestModel.builder()
                .requestTypeId(requestTypeIdNew)
                .requestStatusId(requestStatusIdNew)
                .build();
        this.appointmentRequestService.update(appointmentRequestModelOld, appointmentRequestModelNew);
    }
}