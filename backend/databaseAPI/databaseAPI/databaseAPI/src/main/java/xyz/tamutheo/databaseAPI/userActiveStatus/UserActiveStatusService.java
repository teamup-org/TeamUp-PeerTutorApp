package xyz.tamutheo.databaseAPI.userActiveStatus;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserActiveStatusService {
    @Autowired
    private UserActiveStatusMapper userActiveStatusMapper;
    public List<UserActiveStatusModel> read(Integer limit, Integer offset, String userActiveStatusName) {
        return this.userActiveStatusMapper.read(limit, offset, userActiveStatusName);
    }
}