package xyz.tamutheo.databaseAPI.requestStatus;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RequestStatusService {
    @Autowired
    private RequestStatusMapper requestStatusMapper;
    public List<RequestStatusModel> read() {
        return this.requestStatusMapper.read();
    }
}