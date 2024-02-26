package xyz.tamutheo.databaseAPI.timeIncrement;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TimeIncrementService {
    @Autowired
    private TimeIncrementMapper timeIncrementMapper;
    public List<TimeIncrementModel> read() {
        return this.timeIncrementMapper.read();
    }
}