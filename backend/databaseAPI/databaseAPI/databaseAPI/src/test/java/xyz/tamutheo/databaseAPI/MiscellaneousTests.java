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
import xyz.tamutheo.databaseAPI.location.LocationController;
import xyz.tamutheo.databaseAPI.location.LocationService;
import xyz.tamutheo.databaseAPI.location.LocationModel;
import xyz.tamutheo.databaseAPI.major.MajorController;
import xyz.tamutheo.databaseAPI.major.MajorService;
import xyz.tamutheo.databaseAPI.major.MajorModel;

import java.util.Arrays;
import java.util.List;

@RunWith(SpringRunner.class)
@WebMvcTest({AppointmentSizeController.class, CourseController.class, LocationController.class, MajorController.class})
public class MiscellaneousTests {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private AppointmentSizeService appointmentSizeService;

    @MockBean
    private CourseService courseService;

    @MockBean
    private LocationService locationService;

    @MockBean
    private MajorService majorService;

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

    // Test reading locations with no filters
    @Test
    public void testReadLocationsNoFilters() throws Exception {
        when(locationService.read(null, null, null)).thenReturn(Arrays.asList(new LocationModel()));

        mockMvc.perform(get("/location")
                .contentType("application/json"))
                .andExpect(status().isOk());

        verify(locationService).read(null, null, null);
    }

    // Test reading locations with a single location name filter
    @Test
    public void testReadLocationsWithSingleNameFilter() throws Exception {
        when(locationService.read(Arrays.asList("Library"), null, null)).thenReturn(Arrays.asList(new LocationModel()));

        mockMvc.perform(get("/location")
                .param("location_name_in", "Library")
                .contentType("application/json"))
                .andExpect(status().isOk());

        verify(locationService).read(Arrays.asList("Library"), null, null);
    }

    // Test reading locations with multiple location name filters
    @Test
    public void testReadLocationsWithMultipleNameFilters() throws Exception {
        when(locationService.read(Arrays.asList("Library", "Cafeteria"), null, null)).thenReturn(Arrays.asList(new LocationModel()));

        mockMvc.perform(get("/location")
                .param("location_name_in", "Library, Cafeteria")
                .contentType("application/json"))
                .andExpect(status().isOk());

        verify(locationService).read(Arrays.asList("Library", "Cafeteria"), null, null);
    }

    // Test reading locations with pagination
    @Test
    public void testReadLocationsWithPagination() throws Exception {
        when(locationService.read(null, 10, 20)).thenReturn(Arrays.asList(new LocationModel()));

        mockMvc.perform(get("/location")
                .param("limit", "10")
                .param("offset", "20")
                .contentType("application/json"))
                .andExpect(status().isOk());

        verify(locationService).read(null, 10, 20);
    }
    
    // Test reading majors with no filters
    @Test
    public void testReadMajorsNoFilters() throws Exception {
        when(majorService.read(null, null, null, null)).thenReturn(Arrays.asList(new MajorModel()));

        mockMvc.perform(get("/major")
                .contentType("application/json"))
                .andExpect(status().isOk());

        verify(majorService).read(null, null, null, null);
    }

    // Test reading majors with major abbreviation filter
    @Test
    public void testReadMajorsWithAbbreviationFilter() throws Exception {
        when(majorService.read("CS", null, null, null)).thenReturn(Arrays.asList(new MajorModel()));

        mockMvc.perform(get("/major")
                .param("major_abbreviation_contains", "CS")
                .contentType("application/json"))
                .andExpect(status().isOk());

        verify(majorService).read("CS", null, null, null);
    }

    // Test reading majors with major name filter
    @Test
    public void testReadMajorsWithNameFilter() throws Exception {
        when(majorService.read(null, "Computer Science", null, null)).thenReturn(Arrays.asList(new MajorModel()));

        mockMvc.perform(get("/major")
                .param("major_name_contains", "Computer Science")
                .contentType("application/json"))
                .andExpect(status().isOk());

        verify(majorService).read(null, "Computer Science", null, null);
    }

    // Test reading majors with pagination
    @Test
    public void testReadMajorsWithPagination() throws Exception {
        when(majorService.read(null, null, 10, 20)).thenReturn(Arrays.asList(new MajorModel()));

        mockMvc.perform(get("/major")
                .param("limit", "10")
                .param("offset", "20")
                .contentType("application/json"))
                .andExpect(status().isOk());

        verify(majorService).read(null, null, 10, 20);
    }
}
