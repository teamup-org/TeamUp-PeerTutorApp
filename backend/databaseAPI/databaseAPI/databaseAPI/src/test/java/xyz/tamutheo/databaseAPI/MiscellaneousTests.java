import java.util.Arrays;
import java.util.List;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.http.HttpStatus;
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
import xyz.tamutheo.databaseAPI.rating.RatingController;
import xyz.tamutheo.databaseAPI.rating.RatingService;
import xyz.tamutheo.databaseAPI.rating.RatingModel;
import xyz.tamutheo.databaseAPI.seniority.SeniorityController;
import xyz.tamutheo.databaseAPI.seniority.SeniorityService;
import xyz.tamutheo.databaseAPI.seniority.SeniorityModel;
import xyz.tamutheo.databaseAPI.userActiveStatus.UserActiveStatusController;
import xyz.tamutheo.databaseAPI.userActiveStatus.UserActiveStatusService;
import xyz.tamutheo.databaseAPI.userActiveStatus.UserActiveStatusModel;
import xyz.tamutheo.databaseAPI.weekday.WeekdayController;
import xyz.tamutheo.databaseAPI.weekday.WeekdayService;
import xyz.tamutheo.databaseAPI.weekday.WeekdayModel;


@RunWith(SpringRunner.class)
@WebMvcTest({AppointmentSizeController.class, CourseController.class, LocationController.class, MajorController.class, RatingController.class, SeniorityController.class, UserActiveStatusController.class, WeekdayController.class})
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

    @MockBean
    private RatingService ratingService;

    @MockBean
    private SeniorityService seniorityService;

    @MockBean
    private UserActiveStatusService userActiveStatusService;

    @MockBean
    private WeekdayService weekdayService;

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

    // Test reading ratings with no filters
    @Test
    public void testReadRatingsNoFilters() throws Exception {
        when(ratingService.read(null, null, null, null, null)).thenReturn(Arrays.asList(new RatingModel()));

        mockMvc.perform(get("/rating")
                .contentType("application/json"))
                .andExpect(status().isOk());

        verify(ratingService).read(null, null, null, null, null);
    }

    // Test reading ratings with exact number of stars
    @Test
    public void testReadRatingsWithExactStars() throws Exception {
        when(ratingService.read(5, null, null, null, null)).thenReturn(Arrays.asList(new RatingModel()));

        mockMvc.perform(get("/rating")
                .param("number_stars_equals", "5")
                .contentType("application/json"))
                .andExpect(status().isOk());

        verify(ratingService).read(5, null, null, null, null);
    }

    // Test reading ratings with minimum number of stars
    @Test
    public void testReadRatingsWithMinimumStars() throws Exception {
        when(ratingService.read(null, 3, null, null, null)).thenReturn(Arrays.asList(new RatingModel()));

        mockMvc.perform(get("/rating")
                .param("number_stars_greater_than_or_equals", "3")
                .contentType("application/json"))
                .andExpect(status().isOk());

        verify(ratingService).read(null, 3, null, null, null);
    }

    // Test reading ratings with maximum number of stars
    @Test
    public void testReadRatingsWithMaximumStars() throws Exception {
        when(ratingService.read(null, null, 4, null, null)).thenReturn(Arrays.asList(new RatingModel()));

        mockMvc.perform(get("/rating")
                .param("number_stars_less_than_or_equals", "4")
                .contentType("application/json"))
                .andExpect(status().isOk());

        verify(ratingService).read(null, null, 4, null, null);
    }

    // Test reading ratings with pagination
    @Test
    public void testReadRatingsWithPagination() throws Exception {
        when(ratingService.read(null, null, null, 10, 20)).thenReturn(Arrays.asList(new RatingModel()));

        mockMvc.perform(get("/rating")
                .param("limit", "10")
                .param("offset", "20")
                .contentType("application/json"))
                .andExpect(status().isOk());

        verify(ratingService).read(null, null, null, 10, 20);
    }

    // Test reading seniority levels with no filters
    @Test
    public void testReadSeniorityLevelsNoFilters() throws Exception {
        when(seniorityService.read(null, null, null)).thenReturn(Arrays.asList(new SeniorityModel()));

        mockMvc.perform(get("/seniority")
                .contentType("application/json"))
                .andExpect(status().isOk());

        verify(seniorityService).read(null, null, null);
    }

    // Test reading seniority levels with specific names
    @Test
    public void testReadSeniorityLevelsWithNames() throws Exception {
        when(seniorityService.read(Arrays.asList("Junior", "Senior"), null, null)).thenReturn(Arrays.asList(new SeniorityModel()));

        mockMvc.perform(get("/seniority")
                .param("seniority_name_in", "Junior, Senior")
                .contentType("application/json"))
                .andExpect(status().isOk());

        verify(seniorityService).read(Arrays.asList("Junior", "Senior"), null, null);
    }

    // Test reading seniority levels with pagination
    @Test
    public void testReadSeniorityLevelsWithPagination() throws Exception {
        when(seniorityService.read(null, 10, 20)).thenReturn(Arrays.asList(new SeniorityModel()));

        mockMvc.perform(get("/seniority")
                .param("limit", "10")
                .param("offset", "20")
                .contentType("application/json"))
                .andExpect(status().isOk());

        verify(seniorityService).read(null, 10, 20);
    }

    // Test reading user active statuses with no specific filter
    @Test
    public void testReadUserActiveStatusesNoFilter() throws Exception {
        when(userActiveStatusService.read(null, null, null)).thenReturn(Arrays.asList(new UserActiveStatusModel()));

        mockMvc.perform(get("/user_active_status")
                .contentType("application/json"))
                .andExpect(status().isOk());

        verify(userActiveStatusService).read(null, null, null);
    }

    // Test reading user active statuses with a specific name filter
    @Test
    public void testReadUserActiveStatusWithNameFilter() throws Exception {
        when(userActiveStatusService.read(null, null, "Active")).thenReturn(Arrays.asList(new UserActiveStatusModel()));

        mockMvc.perform(get("/user_active_status")
                .param("user_active_status_name", "Active")
                .contentType("application/json"))
                .andExpect(status().isOk());

        verify(userActiveStatusService).read(null, null, "Active");
    }

    // Test reading user active statuses with pagination
    @Test
    public void testReadUserActiveStatusWithPagination() throws Exception {
        when(userActiveStatusService.read(10, 20, null)).thenReturn(Arrays.asList(new UserActiveStatusModel()));

        mockMvc.perform(get("/user_active_status")
                .param("limit", "10")
                .param("offset", "20")
                .contentType("application/json"))
                .andExpect(status().isOk());

        verify(userActiveStatusService).read(10, 20, null);
    }

    // Test reading weekdays with no filters
    @Test
    public void testReadWeekdaysNoFilters() throws Exception {
        when(weekdayService.read(null, null, null)).thenReturn(Arrays.asList(new WeekdayModel()));

        mockMvc.perform(get("/weekday")
                .contentType("application/json"))
                .andExpect(status().isOk());

        verify(weekdayService).read(null, null, null);
    }

    // Test reading weekdays with specific names
    @Test
    public void testReadWeekdaysWithNames() throws Exception {
        List<String> names = Arrays.asList("Monday", "Wednesday");
        when(weekdayService.read(names, null, null)).thenReturn(Arrays.asList(new WeekdayModel()));

        mockMvc.perform(get("/weekday")
                .param("weekday_name_in", "Monday, Wednesday")
                .contentType("application/json"))
                .andExpect(status().isOk());

        verify(weekdayService).read(names, null, null);
    }

    // Test reading weekdays with pagination
    @Test
    public void testReadWeekdaysWithPagination() throws Exception {
        when(weekdayService.read(null, 10, 20)).thenReturn(Arrays.asList(new WeekdayModel()));

        mockMvc.perform(get("/weekday")
                .param("limit", "10")
                .param("offset", "20")
                .contentType("application/json"))
                .andExpect(status().isOk());

        verify(weekdayService).read(null, 10, 20);
    }

    // Test to deny direct URL access except for the login page
    @Test
    public void testDenyDirectURLAccess() throws Exception {
        mockMvc.perform(get("/dashboard")
                .contentType("application/json"))
                .andExpect(status().is(HttpStatus.FORBIDDEN.value()));

        mockMvc.perform(get("/login")
                .contentType("application/json"))
                .andExpect(status().isOk());
    }
}