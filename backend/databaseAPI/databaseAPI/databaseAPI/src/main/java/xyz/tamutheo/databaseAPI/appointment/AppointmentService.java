
package xyz.tamutheo.databaseAPI.appointment;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Service
public class AppointmentService {
    @Autowired
    private AppointmentMapper appointmentMapper;

    public void create(AppointmentModel appointmentModel) {
        List<AppointmentModel> appointmentModelList = this.appointmentMapper.overlaps(appointmentModel);
        System.out.println(appointmentModelList);
        if (!appointmentModelList.isEmpty()) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST, "Requested appointment overlaps with other existing appointments." + appointmentModelList);
        }
        throw new ResponseStatusException(
                HttpStatus.BAD_REQUEST, "OK");
//        this.appointmentMapper.create(appointmentModel);
    }

    public List<AppointmentModel> read(Integer appointmentIdEquals,
                                       String appointmentSizeNameContains,
                                       String cancellationReasonContains,
                                       String endDateTimeLessThanOrEquals,
                                       Boolean isCancelledEquals,
                                       Boolean isConfirmedEquals,
                                       List<String> locationNameInList,
                                       String tuteeEmailContains,
                                       String tutorEmailContains,
                                       String startDateTimeGreaterThanOrEquals,
                                       Integer limit,
                                       Integer offset) {
        List<AppointmentModel> appointmentModelList = this.appointmentMapper.read(appointmentIdEquals,
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
        for (AppointmentModel appointmentModel : appointmentModelList) {
            appointmentModel.setStartDateTimeString(appointmentModel.getStartDateTimeValue().format(DateTimeFormatter.ISO_LOCAL_DATE_TIME));
            appointmentModel.setEndDateTimeString(appointmentModel.getEndDateTimeValue().format(DateTimeFormatter.ISO_LOCAL_DATE_TIME));
        }
        return appointmentModelList;
    }

    public void update(AppointmentModel appointmentModelOld, AppointmentModel appointmentModelNew) {
        this.appointmentMapper.update(appointmentModelOld, appointmentModelNew);
    }
}

