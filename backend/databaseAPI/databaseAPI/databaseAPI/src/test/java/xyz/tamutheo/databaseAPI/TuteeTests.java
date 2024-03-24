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




}
