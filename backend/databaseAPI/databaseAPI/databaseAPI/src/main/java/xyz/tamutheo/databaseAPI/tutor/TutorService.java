package xyz.tamutheo.databaseAPI.tutor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TutorService {
    @Autowired
    private TutorMapper tutorMapper;
    public List<TutorModel> read(Integer uin) {
        return this.tutorMapper.read(uin);
    }
    public void create(TutorModel tutorModel) {
        this.tutorMapper.create(tutorModel);
    }
    public void update(TutorModel tutorModelOld, TutorModel tutorModelNew) {
        this.tutorMapper.update(tutorModelOld, tutorModelNew);
    }
}