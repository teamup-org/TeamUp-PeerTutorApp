package xyz.tamutheo.databaseAPI.appointmentType;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AppointmentTypeService {
    @Autowired
    private AppointmentTypeMapper appointmentTypeMapper;
    public List<AppointmentTypeModel> read() {
        return this.appointmentTypeMapper.read();
    }
}