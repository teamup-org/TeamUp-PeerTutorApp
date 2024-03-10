package xyz.tamutheo.databaseAPI.location;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LocationService {
    @Autowired
    private LocationMapper locationMapper;
    public List<LocationModel> read(List<String> locationNameInList,
                                    Integer limit,
                                    Integer offset) {
        return this.locationMapper.read(locationNameInList,
                limit,
                offset);
    }
}