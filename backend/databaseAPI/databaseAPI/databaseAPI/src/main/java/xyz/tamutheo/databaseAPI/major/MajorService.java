package xyz.tamutheo.databaseAPI.major;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MajorService {
    @Autowired
    private MajorMapper majorMapper;
    public List<MajorModel> read(String majorAbbreviationContains, String majorNameContains, Integer limit, Integer offset) {
        return this.majorMapper.read(majorAbbreviationContains, majorNameContains, limit, offset);
    }
}