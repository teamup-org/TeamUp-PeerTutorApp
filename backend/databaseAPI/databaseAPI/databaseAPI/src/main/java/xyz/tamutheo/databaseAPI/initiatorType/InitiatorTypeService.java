package xyz.tamutheo.databaseAPI.initiatorType;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class InitiatorTypeService {
    @Autowired
    private InitiatorTypeMapper initiatorTypeMapper;
    public List<InitiatorTypeModel> read() {
        return this.initiatorTypeMapper.read();
    }
}