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

import xyz.tamutheo.databaseAPI.tutee.TuteeService;
import xyz.tamutheo.databaseAPI.tutee.TuteeController;
import xyz.tamutheo.databaseAPI.tutee.TuteeModel;

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


    
}
