
package xyz.tamutheo.databaseAPI.appointment;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import xyz.tamutheo.databaseAPI.util.paginationContainer.PaginationContainerModel;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class AppointmentService {
    @Autowired
    private AppointmentMapper appointmentMapper;

    public void create(AppointmentModel appointmentModel) {
        List<AppointmentModel> appointmentModelList = this.appointmentMapper.overlaps(appointmentModel);
        if (!appointmentModelList.isEmpty()) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST, "Requested appointment overlaps with other existing appointments.");
        }
        this.appointmentMapper.create(appointmentModel);
    }

    public PaginationContainerModel read(Integer appointmentIdEquals,
                                       String appointmentSizeNameContains,
                                       String cancellationReasonContains,
                                       String endDateTimeLessThanOrEquals,
                                       Boolean isCancelledEquals,
                                       Boolean isConfirmedEquals,
                                       List<String> locationNameInList,
                                       String tuteeEmailContains,
                                       String tutorEmailContains,
                                       String startDateTimeGreaterThanOrEquals,
                                       Integer pageNumber,
                                       Integer numberEntriesPerPage) {
        Integer limit = numberEntriesPerPage != null ? numberEntriesPerPage : null;
        Integer offset = (numberEntriesPerPage != null) && (pageNumber != null) ? (pageNumber - 1) * numberEntriesPerPage : null;
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
        Integer totalNumberEntries = this.appointmentMapper.getTotalNumberEntries(appointmentIdEquals,
                appointmentSizeNameContains,
                cancellationReasonContains,
                endDateTimeLessThanOrEquals,
                isCancelledEquals,
                isConfirmedEquals,
                locationNameInList,
                tuteeEmailContains,
                tutorEmailContains,
                startDateTimeGreaterThanOrEquals);
        Integer totalNumberPages = numberEntriesPerPage != null ? (int) (Math.ceil((double) totalNumberEntries / numberEntriesPerPage)) : 1;
        Map<String, Integer> metaDataMap = new HashMap<>();
        metaDataMap.put("totalNumberEntries", totalNumberEntries);
        metaDataMap.put("totalNumberPages", totalNumberPages);
        metaDataMap.put("maximumNumberEntriesPerPage", numberEntriesPerPage);
        metaDataMap.put("pageNumber", pageNumber);
        PaginationContainerModel paginationContainerModel = PaginationContainerModel.builder()
                .data(appointmentModelList)
                .metaData(metaDataMap)
                .build();
        return paginationContainerModel;
    }

    public void update(AppointmentModel appointmentModelOld, AppointmentModel appointmentModelNew) {
        this.appointmentMapper.update(appointmentModelOld, appointmentModelNew);
    }
}

