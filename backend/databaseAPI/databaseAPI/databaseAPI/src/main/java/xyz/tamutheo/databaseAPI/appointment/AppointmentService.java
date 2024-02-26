
package xyz.tamutheo.databaseAPI.appointment;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class AppointmentService {
    @Autowired
    private AppointmentMapper appointmentMapper;
    public List<AppointmentModel> read(Integer tutorId, Integer tuteeId) {
        return this.appointmentMapper.read(tutorId, tuteeId);
    }
    public void create(AppointmentModel appointmentModel) {
        this.appointmentMapper.create(appointmentModel);
    }
    public void update(AppointmentModel appointmentModelOld, AppointmentModel appointmentModelNew) {
        this.appointmentMapper.update(appointmentModelOld, appointmentModelNew);
    }
}


