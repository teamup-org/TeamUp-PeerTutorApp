package xyz.tamutheo.databaseAPI.appointmentRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AppointmentRequestService {
    @Autowired
    private AppointmentRequestMapper appointmentRequestMapper;
    public List<AppointmentRequestModel> read(Integer appointmentId, Integer initiatorTypeId) {
        return this.appointmentRequestMapper.read(appointmentId, initiatorTypeId);
    }
    public void create(AppointmentRequestModel appointmentRequestModel) {
        this.appointmentRequestMapper.create(appointmentRequestModel);
    }
    public void update(AppointmentRequestModel appointmentRequestModelOld, AppointmentRequestModel appointmentRequestModelNew) {
        this.appointmentRequestMapper.update(appointmentRequestModelOld, appointmentRequestModelNew);
    }
}