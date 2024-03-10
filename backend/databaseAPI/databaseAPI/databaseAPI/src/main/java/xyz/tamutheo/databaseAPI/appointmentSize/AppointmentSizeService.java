package xyz.tamutheo.databaseAPI.appointmentSize;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AppointmentSizeService {
    @Autowired
    private AppointmentSizeMapper appointmentSizeMapper;
    public List<AppointmentSizeModel> read(String appointmentSizeNameContains, Integer limit, Integer offset) {
        return this.appointmentSizeMapper.read(appointmentSizeNameContains, limit, offset);
    }
}