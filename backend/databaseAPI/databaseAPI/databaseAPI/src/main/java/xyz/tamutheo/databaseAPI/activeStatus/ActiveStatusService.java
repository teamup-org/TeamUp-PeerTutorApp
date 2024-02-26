package xyz.tamutheo.databaseAPI.activeStatus;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ActiveStatusService {
    @Autowired
    private ActiveStatusMapper activeStatusMapper;
    public List<ActiveStatusModel> read() {
        return this.activeStatusMapper.read();
    }
}