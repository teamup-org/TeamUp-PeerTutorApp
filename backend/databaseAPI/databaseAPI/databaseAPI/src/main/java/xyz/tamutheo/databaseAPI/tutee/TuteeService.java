package xyz.tamutheo.databaseAPI.tutee;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TuteeService {
    @Autowired
    private TuteeMapper tuteeMapper;
    public List<TuteeModel> read(Integer uin) {
        return this.tuteeMapper.read(uin);
    }
    public void create(TuteeModel tuteeModel) {
        this.tuteeMapper.create(tuteeModel);
    }
    public void update(TuteeModel tuteeModelOld, TuteeModel tuteeModelNew) {
        this.tuteeMapper.update(tuteeModelOld, tuteeModelNew);
    }
}