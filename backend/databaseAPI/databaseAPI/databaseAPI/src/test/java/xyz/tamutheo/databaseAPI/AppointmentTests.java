import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.http.HttpStatus;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

import xyz.tamutheo.databaseAPI.appointment.AppointmentController;
import xyz.tamutheo.databaseAPI.appointment.AppointmentModel;
import xyz.tamutheo.databaseAPI.appointment.AppointmentService;
import xyz.tamutheo.databaseAPI.tutor.TutorService;
import xyz.tamutheo.databaseAPI.tutorTimePreference.TutorTimePreferenceService;
import xyz.tamutheo.databaseAPI.tutorReview.TutorReviewModel;
import xyz.tamutheo.databaseAPI.tutorReview.TutorReviewService;

@RunWith(SpringRunner.class)
@WebMvcTest(AppointmentController.class)
public class AppointmentTests {
    
    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private AppointmentService appointmentService;

    @MockBean
    private TutorReviewService tutorReviewService;

    @MockBean
    private TutorService tutorService;

    @MockBean
    private TutorTimePreferenceService tutorTimePreferenceService;

    // Test for creating an appointment
    @Test
    public void testCreateAppointment() throws Exception {
        mockMvc.perform(post("/appointment")
                .param("appointment_size_name", "single")
                .param("location_name", "Valley Mills, TX")
                .param("tutor_email", "sol@r.eclipse")
                .param("tutee_email", "aggie@gig.em")
                .param("start_date_time", "2025-04-08T13:37")
                .param("end_date_time", "2025-04-08T13:42")
                .contentType(MediaType.APPLICATION_FORM_URLENCODED))
                .andExpect(status().isOk());

        verify(appointmentService).create(any(AppointmentModel.class));
    }

    // Test for accepting an appointment
    @Test
    public void testTutorAcceptsTuteeRequest() throws Exception {
        mockMvc.perform(put("/appointment")
                .param("tutee_email_old", "aggie@gig.em")
                .param("tutor_email_old", "sol@r.eclipse")
                .param("start_date_time_old", "2025-04-08T13:37")
                .param("end_date_time_old", "2025-04-08T13:42")
                .param("is_confirmed_new", "true")
                .contentType(MediaType.APPLICATION_FORM_URLENCODED))
                .andExpect(status().isOk());

        verify(appointmentService).update(any(AppointmentModel.class), any(AppointmentModel.class));
    }


    // Test for cancelling an appointment
    @Test
    public void testTuteeCancelsTutorRequest() throws Exception {
        mockMvc.perform(put("/appointment")
                .param("tutee_email_old", "aggie@gig.em")
                .param("tutor_email_old", "sol@r.eclipse")
                .param("start_date_time_old", "2025-04-08T13:37")
                .param("end_date_time_old", "2025-01-01T13:42")
                .param("is_cancelled_new", "true")
                .param("cancellation_reason_new", "Solar Eclipse")
                .contentType(MediaType.APPLICATION_FORM_URLENCODED))
                .andExpect(status().isOk());

        verify(appointmentService).update(any(AppointmentModel.class), any(AppointmentModel.class));
    }

    // Test for reading appointments with filters
    @Test
    public void testReadAppointments() throws Exception {
        mockMvc.perform(get("/appointment")
                .param("tutor_email_contains", "sol@r.eclipse")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());

        verify(appointmentService).read(null, null, null, null, null, null, null, null, "sol@r.eclipse", null, 1, null);
    }

    // Test for handling invalid input for appointment creation
    @Test
    public void testCreateAppointmentInvalidInput() throws Exception {
        mockMvc.perform(post("/appointment")
                .param("appointment_size_name", "single")
                // missing other required parameters
                .contentType(MediaType.APPLICATION_FORM_URLENCODED))
                .andExpect(status().isBadRequest());

        verify(appointmentService, never()).create(any(AppointmentModel.class));
    }

    // Test for preventing overlapping appointments
    @Test
    public void testPreventOverlappingAppointments() throws Exception {
        doThrow(new ResponseStatusException(HttpStatus.BAD_REQUEST, "Overlapping appointment")).when(appointmentService).create(any(AppointmentModel.class));

        mockMvc.perform(post("/appointment")
                .param("appointment_size_name", "single")
                .param("location_name", "Valley Mills, TX")
                .param("tutor_email", "sol@r.eclipse")
                .param("tutee_email", "aggie@gig.em")
                .param("start_date_time", "2025-04-08T13:37")
                .param("end_date_time", "2025-04-08T13:42")
                .contentType(MediaType.APPLICATION_FORM_URLENCODED))
                .andExpect(status().isBadRequest());

        verify(appointmentService).create(any(AppointmentModel.class));
    }

    // Test for class schedule to block out unavailable appointment times
    @Test
    public void testClassScheduleBlocksUnavailableTimes() throws Exception {
        doThrow(new ResponseStatusException(HttpStatus.BAD_REQUEST, "Appointment conflicts with class schedule"))
                .when(appointmentService).create(any(AppointmentModel.class));

        mockMvc.perform(post("/appointment")
                .param("appointment_size_name", "single")
                .param("location_name", "Valley Mills, TX")
                .param("tutor_email", "sol@r.eclipse")
                .param("tutee_email", "aggie@gig.em")
                .param("start_date_time", "2025-04-08T13:37")
                .param("end_date_time", "2025-04-08T13:42")
                .contentType(MediaType.APPLICATION_FORM_URLENCODED))
                .andExpect(status().isBadRequest());

        verify(appointmentService).create(any(AppointmentModel.class));
    }

    // Test for creating tutor reviews after valid appointments have taken place
    @Test
    public void testCreateTutorReviewAfterValidAppointment() throws Exception {
        mockMvc.perform(post("/tutor_review")
                .param("appointment_id", "1")
                .param("number_stars", "5")
                .param("review_text", "A once in a lifetime session!")
                .param("tutor_email", "sol@r.eclipse")
                .param("tutee_email", "aggie@gig.em")
                .contentType(MediaType.APPLICATION_FORM_URLENCODED))
                .andExpect(status().isOk());

        verify(tutorReviewService).create(any(TutorReviewModel.class));
    }

    // Test for tutor setting valid course preferences
    @Test
    public void testTutorSetsValidCoursePreferences() throws Exception {
        mockMvc.perform(put("/tutor/update")
                .param("email_old", "sol@r.eclipse")
                .param("course_preferences_new", "CS101 A, MATH202 B")
                .contentType(MediaType.APPLICATION_FORM_URLENCODED))
                .andExpect(status().isOk());

        verify(tutorService).update(any(), any(), any());
    }
}