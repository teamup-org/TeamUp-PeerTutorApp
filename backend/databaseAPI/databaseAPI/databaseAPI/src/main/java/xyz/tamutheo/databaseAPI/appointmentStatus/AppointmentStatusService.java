package xyz.tamutheo.databaseAPI.appointmentStatus;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AppointmentStatusService {
    @Autowired
    private AppointmentStatusMapper appointmentStatusMapper;
    public List<AppointmentStatusModel> read() {
        return this.appointmentStatusMapper.read();
    }
}