package xyz.tamutheo.databaseAPI.requestType;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RequestTypeService {
    @Autowired
    private RequestTypeMapper requestTypeMapper;
    public List<RequestTypeModel> read() {
        return this.requestTypeMapper.read();
    }
}