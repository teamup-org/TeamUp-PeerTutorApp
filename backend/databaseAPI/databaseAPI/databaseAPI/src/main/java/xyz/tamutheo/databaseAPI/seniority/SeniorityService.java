package xyz.tamutheo.databaseAPI.seniority;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SeniorityService {
    @Autowired
    private SeniorityMapper seniorityMapper;
    public List<SeniorityModel> read() {
        return this.seniorityMapper.read();
    }
}