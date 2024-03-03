package xyz.tamutheo.databaseAPI.custom.tutorListing;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TutorListingService {
    @Autowired
    private TutorListingMapper tutorListingMapper;
    public List<TutorListingModel> read(Integer tutorId) {
        List<TutorListingModel> tutorListingModelList = tutorListingMapper.read(tutorId);
        for (TutorListingModel tutorListingModel: tutorListingModelList) {
            Integer currTutorId = tutorListingModel.getTutorId();
            tutorListingModel.setCoursePreferences(this.tutorListingMapper.getTutorCoursePreferences(currTutorId));
            tutorListingModel.setLocationPreferences(this.tutorListingMapper.getTutorLocationPreferences(currTutorId));
        }
        return tutorListingModelList;
    }
}