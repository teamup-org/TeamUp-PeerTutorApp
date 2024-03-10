
package xyz.tamutheo.databaseAPI.appointment;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Service
public class AppointmentService {
    @Autowired
    private AppointmentMapper appointmentMapper;

    public void create(AppointmentModel appointmentModel) {
        this.appointmentMapper.create(appointmentModel);
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

