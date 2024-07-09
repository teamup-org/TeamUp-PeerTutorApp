package xyz.tamutheo.databaseAPI.userFeedback;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserFeedbackService {

    @Autowired
    private UserFeedbackMapper userFeedbackMapper;

    public void saveFeedback(UserFeedbackModel feedback) {
        userFeedbackMapper.save(feedback);
    }

    public boolean getPopupStatus(String userId) {
        return false;
    }
}
