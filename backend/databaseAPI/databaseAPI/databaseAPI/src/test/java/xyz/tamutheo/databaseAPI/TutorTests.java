import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import xyz.tamutheo.databaseAPI.tutor.TutorService;
import xyz.tamutheo.databaseAPI.tutor.TutorController;
import xyz.tamutheo.databaseAPI.tutor.TutorModel;

@RunWith(SpringRunner.class)
@WebMvcTest(TutorController.class)
public class TutorTests {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private TutorService tutorService;

    // Test for create endpoint
    @Test
    public void testCreateTutor() throws Exception {
        mockMvc.perform(post("/tutor")
                .param("active_status_name", "active")
                .param("bio_text", "Hi! I like money!")
                .param("email", "eugene.krabs@krusty.krab")
                .param("first_name", "Eugene")
                .param("last_name", "Krabs")
                .param("listing_title", "Founder/Owner of the Krusty Krab")
                .param("major_abbreviation", "KYKB")
                .param("pay_rate", "1000000")
                .param("phone_number", "9999999999")
                .param("picture_url", "https://upload.wikimedia.org/wikipedia/en/thumb/f/f8/Mr._Krabs.svg/1280px-Mr._Krabs.svg.png")
                .param("seniority_name", "Senior")
                .contentType(MediaType.APPLICATION_FORM_URLENCODED))
                .andExpect(status().isOk());

        verify(tutorService).create(any(TutorModel.class));
    }

    // Test for handling missing required parameters
    @Test
    public void testCreateTutorMissingParameters() throws Exception {
        mockMvc.perform(post("/tutor")
                .contentType(MediaType.APPLICATION_FORM_URLENCODED))
                .andExpect(status().isBadRequest());
        verify(tutorService, never()).create(any(TutorModel.class));
    }
}