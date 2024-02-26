package xyz.tamutheo.databaseAPI.tutorEligibility;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TutorEligibilityService {
    @Autowired
    private TutorEligibilityMapper tutorEligibilityMapper;
    public List<TutorEligibilityModel> read(Integer tutorId) {
        return this.tutorEligibilityMapper.read(tutorId);
    }
    public void create(TutorEligibilityModel tutorEligibilityModel) {
        this.tutorEligibilityMapper.create(tutorEligibilityModel);
    }
}