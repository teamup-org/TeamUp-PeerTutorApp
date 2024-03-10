package xyz.tamutheo.databaseAPI.weekday;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class WeekdayService {
    @Autowired
    private WeekdayMapper weekdayMapper;
    public List<WeekdayModel> read(List<String> weekdayNameInList,
                                    Integer limit,
                                    Integer offset) {
        return this.weekdayMapper.read(weekdayNameInList,
                limit,
                offset);
    }
}