import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.ArgumentMatchers.anyInt;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;

import xyz.tamutheo.databaseAPI.appointmentSize.AppointmentSizeController;
import xyz.tamutheo.databaseAPI.appointmentSize.AppointmentSizeService;
import xyz.tamutheo.databaseAPI.appointmentSize.AppointmentSizeModel;

import java.util.Arrays;
import java.util.List;

@RunWith(SpringRunner.class)
@WebMvcTest(AppointmentSizeController.class)
public class MiscellaneousTests {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private AppointmentSizeService appointmentSizeService;

    // Test reading appointment sizes with no filters
    @Test
    public void testReadAppointmentSizesNoFilters() throws Exception {
        when(appointmentSizeService.read(null, null, null)).thenReturn(Arrays.asList(new AppointmentSizeModel()));

        mockMvc.perform(get("/appointment_size")
                .contentType("application/json"))
                .andExpect(status().isOk());

        verify(appointmentSizeService).read(null, null, null);
    }

    // Test reading appointment sizes with a filter for name contains
    @Test
    public void testReadAppointmentSizesWithNameFilter() throws Exception {
        when(appointmentSizeService.read(anyString(), anyInt(), anyInt())).thenReturn(Arrays.asList(new AppointmentSizeModel()));

        mockMvc.perform(get("/appointment_size")
                .param("appointment_size_name_contains", "single")
                .contentType("application/json"))
                .andExpect(status().isOk());

        verify(appointmentSizeService).read("single", null, null);
    }

    // Test reading appointment sizes with pagination
    @Test
    public void testReadAppointmentSizesWithPagination() throws Exception {
        when(appointmentSizeService.read(null, 10, 20)).thenReturn(Arrays.asList(new AppointmentSizeModel()));

        mockMvc.perform(get("/appointment_size")
                .param("limit", "10")
                .param("offset", "20")
                .contentType("application/json"))
                .andExpect(status().isOk());

        verify(appointmentSizeService).read(null, 10, 20);
    }
}
