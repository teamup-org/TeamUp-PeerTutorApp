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

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import xyz.tamutheo.databaseAPI.tutee.TuteeController;
import xyz.tamutheo.databaseAPI.tutee.TuteeMapper;
import xyz.tamutheo.databaseAPI.tutee.TuteeModel;
import xyz.tamutheo.databaseAPI.tutee.TuteeService;

@RunWith(SpringRunner.class)
@WebMvcTest(TuteeController.class)
public class TuteeTests {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private TuteeService tuteeService;

    // Test for create endpoint
    public void testCreateTutee() throws Exception {
        mockMvc.perform(post("/tutee")
                .param("active_status_name", "active")
                .param("email", "spongebob.squarepants@krusty.krab")
                .param("first_name", "SpongeBob")
                .param("last_name", "SquarePants")
                .param("major_abbreviation", "KYKB")
                .param("phone_number", "8088088088")
                .param("seniority_name", "Freshman")
                .contentType(MediaType.APPLICATION_FORM_URLENCODED))
                .andExpect(status().isOk());

        verify(tuteeService).create(any(TuteeModel.class));
    }

    // Test for updating a tutee
    @Test
    public void testUpdateTutee() throws Exception {
        mockMvc.perform(put("/tutee")
                .param("email_old", "squidward.tentacles@krusty.krab")
                .param("active_status_name_new", "active")
                .param("email_new", "spongebob.squarepants@krusty.krab")
                .param("first_name_new", "SpongeBob")
                .param("last_name_new", "SquarePants")
                .param("major_abbreviation_new", "KYKB")
                .param("phone_number_new", "8088088088")
                .param("seniority_name_new", "Sophomore")
                .contentType(MediaType.APPLICATION_FORM_URLENCODED))
                .andExpect(status().isOk());

        verify(tuteeService).update(any(TuteeModel.class), any(TuteeModel.class));
    }

    // Test for listing filtering by last name
    @Test
    public void testFilterTuteesByLastName() throws Exception {
        String lastNameToFilter = "SquarePants";
        mockMvc.perform(get("/tutee")
                .param("last_name_contains", lastNameToFilter)
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());

        verify(tuteeService).read(anyString(), anyString(), anyString(), eq(lastNameToFilter), anyString(), anyLong(), anyList(), anyInt(), anyInt());
    }

    // Test for listing filtering by major abbreviation
    @Test
    public void testFilterTuteesByMajorAbbreviation() throws Exception {
        String majorAbbreviationToFilter = "KYKB";
        mockMvc.perform(get("/tutee")
                .param("major_abbreviation_contains", majorAbbreviationToFilter)
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());

        verify(tuteeService).read(anyString(), anyString(), anyString(), anyString(), eq(majorAbbreviationToFilter), anyLong(), anyList(), anyInt(), anyInt());
}
    
    // Test for listing filtering by e-mail
    @Test
    public void testFilterTuteesByEmail() throws Exception {
        String emailToFilter = "spongebob.squarepants@krusty.krab";
        mockMvc.perform(get("/tutee")
                .param("email_contains", emailToFilter)
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());

        verify(tuteeService).read(anyString(), eq(emailToFilter), anyString(), anyString(), anyString(), anyLong(), anyList(), anyInt(), anyInt());
    }

    // Test for handling missing required parameters
    @Test
    public void testCreateTuteeMissingParameters() throws Exception {
        mockMvc.perform(post("/tutee")
                .contentType(MediaType.APPLICATION_FORM_URLENCODED))
                .andExpect(status().isBadRequest());
        verify(tuteeService, never()).create(any(TuteeModel.class));
    }

    // Test for handling invalid input
    @Test
    public void testUpdateTuteeInvalidInput() throws Exception {
        mockMvc.perform(put("/tutee")
                .param("email_old", "squidward.tentacles@krusty.krab")
                .param("phone_number_new", "-2147842638")
                .contentType(MediaType.APPLICATION_FORM_URLENCODED))
                .andExpect(status().isBadRequest());
        verify(tuteeService, never()).update(any(TuteeModel.class), any(TuteeModel.class));
    }
}
