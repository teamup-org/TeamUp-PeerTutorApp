package xyz.tamutheo.databaseAPI.tutorReview;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import xyz.tamutheo.databaseAPI.appointment.AppointmentModel;
import xyz.tamutheo.databaseAPI.util.paginationContainer.PaginationContainerModel;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class TutorReviewService {
    @Autowired
    private TutorReviewMapper tutorReviewMapper;
    public PaginationContainerModel read(Integer appointmentIdEquals,
                                         Integer numberStarsGreaterThanOrEquals,
                                         Integer numberStarsLessThanOrEquals,
                                         String reviewTextContains,
                                         String tuteeEmailContains,
                                         String tutorEmailContains,
                                         Integer pageNumber,
                                         Integer numberEntriesPerPage)  {
        Integer limit = numberEntriesPerPage != null ? numberEntriesPerPage : null;
        Integer offset = (numberEntriesPerPage != null) && (pageNumber != null) ? (pageNumber - 1) * numberEntriesPerPage : null;
        List<TutorReviewModel> tutorReviewModelList = this.tutorReviewMapper.read(appointmentIdEquals,
                numberStarsGreaterThanOrEquals,
                numberStarsLessThanOrEquals,
                reviewTextContains,
                tuteeEmailContains,
                tutorEmailContains,
                limit,
                offset);
        Integer totalNumberEntries = this.tutorReviewMapper.getTotalNumberEntries(appointmentIdEquals,
                numberStarsGreaterThanOrEquals,
                numberStarsLessThanOrEquals,
                reviewTextContains,
                tuteeEmailContains,
                tutorEmailContains);
        Integer totalNumberPages = numberEntriesPerPage != null ? (int) (Math.ceil((double) totalNumberEntries / numberEntriesPerPage)) : 1;
        Map<String, Integer> metaDataMap = new HashMap<>();
        metaDataMap.put("totalNumberEntries", totalNumberEntries);
        metaDataMap.put("totalNumberPages", totalNumberPages);
        metaDataMap.put("maximumNumberEntriesPerPage", numberEntriesPerPage);
        metaDataMap.put("pageNumber", pageNumber);
        PaginationContainerModel paginationContainerModel = PaginationContainerModel.builder()
                .data(tutorReviewModelList)
                .metaData(metaDataMap)
                .build();
        return paginationContainerModel;
    }
    public void create(TutorReviewModel tutorReviewModel) {
        // check that session is confirmed, is not cancelled, and current time is past session end time
        List<AppointmentModel> appointmentModelList = this.tutorReviewMapper.getPendingReviews(tutorReviewModel.getAppointmentId(),
                null,
                null,
                null,
                false,
                true,
                null,
                tutorReviewModel.getTuteeEmail(),
                tutorReviewModel.getTutorEmail(),
                null);
        if (appointmentModelList.size() != 1) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST, "Cannot review this appointment.");
        }
       this.tutorReviewMapper.create(tutorReviewModel);
    }
    public void update(TutorReviewModel tutorReviewModelOld, TutorReviewModel tutorReviewModelNew) {
        this.tutorReviewMapper.update(tutorReviewModelOld, tutorReviewModelNew);
    }
    public void delete(TutorReviewModel tutorReviewModel) {
        this.tutorReviewMapper.delete(tutorReviewModel);
    }
    public List<AppointmentModel> getPendingReviews(String tuteeEmail) {
        // check that session is confirmed, is not cancelled, and current time is past session end time
        List<AppointmentModel> appointmentModelList = this.tutorReviewMapper.getPendingReviews(null,
                null,
                null,
                null,
                false,
                true,
                null,
                tuteeEmail,
                null,
                null);
        return appointmentModelList;
    }
}