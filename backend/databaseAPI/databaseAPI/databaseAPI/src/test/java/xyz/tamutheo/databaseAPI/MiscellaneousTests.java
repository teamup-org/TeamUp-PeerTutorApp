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
import xyz.tamutheo.databaseAPI.course.CourseController;
import xyz.tamutheo.databaseAPI.course.CourseService;
import xyz.tamutheo.databaseAPI.course.CourseModel;

import java.util.Arrays;
import java.util.List;

@RunWith(SpringRunner.class)
@WebMvcTest({AppointmentSizeController.class, CourseController.class})
public class MiscellaneousTests {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private AppointmentSizeService appointmentSizeService;

    @MockBean
    private CourseService courseService;

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

    // Test reading courses with no filters
    @Test
    public void testReadCoursesNoFilters() throws Exception {
        when(courseService.read(null, null, null, null, null, null, null)).thenReturn(Arrays.asList(new CourseModel()));

        mockMvc.perform(get("/course")
                .contentType("application/json"))
                .andExpect(status().isOk());

        verify(courseService).read(null, null, null, null, null, null, null);
    }

    // Test reading courses with course number filters
    @Test
    public void testReadCoursesWithCourseNumberFilters() throws Exception {
        when(courseService.read(101, null, null, null, null, null, null)).thenReturn(Arrays.asList(new CourseModel()));

        mockMvc.perform(get("/course")
                .param("course_number_equals", "101")
                .contentType("application/json"))
                .andExpect(status().isOk());

        verify(courseService).read(101, null, null, null, null, null, null);
    }

    // Test reading courses with course title contains filter
    @Test
    public void testReadCoursesWithTitleFilter() throws Exception {
        when(courseService.read(null, null, null, "Introduction", null, null, null)).thenReturn(Arrays.asList(new CourseModel()));

        mockMvc.perform(get("/course")
                .param("course_title_contains", "Introduction")
                .contentType("application/json"))
                .andExpect(status().isOk());

        verify(courseService).read(null, null, null, "Introduction", null, null, null);
    }

    // Test reading courses with major abbreviation contains filter
    @Test
    public void testReadCoursesWithMajorAbbreviationFilter() throws Exception {
        when(courseService.read(null, null, null, null, "CS", null, null)).thenReturn(Arrays.asList(new CourseModel()));

        mockMvc.perform(get("/course")
                .param("major_abbreviation_contains", "CS")
                .contentType("application/json"))
                .andExpect(status().isOk());

        verify(courseService).read(null, null, null, null, "CS", null, null);
    }

    // Test reading courses with pagination
    @Test
    public void testReadCoursesWithPagination() throws Exception {
        when(courseService.read(null, null, null, null, null, 10, 20)).thenReturn(Arrays.asList(new CourseModel()));

        mockMvc.perform(get("/course")
                .param("limit", "10")
                .param("offset", "20")
                .contentType("application/json"))
                .andExpect(status().isOk());

        verify(courseService).read(null, null, null, null, null, 10, 20);
    }
}
