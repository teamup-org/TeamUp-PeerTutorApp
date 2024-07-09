package xyz.tamutheo.databaseAPI.userFeedback;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user_feedback")
public class UserFeedbackController {

    @Autowired
    private UserFeedbackService userFeedbackService;

    @PostMapping("/submit")
    public void submitFeedback(@RequestBody UserFeedbackModel feedback) {
        userFeedbackService.saveFeedback(feedback);
    }

    @GetMapping("/popup_status")
    public boolean getPopupStatus(@RequestParam String userId) {
        return userFeedbackService.getPopupStatus(userId);
    }
}
