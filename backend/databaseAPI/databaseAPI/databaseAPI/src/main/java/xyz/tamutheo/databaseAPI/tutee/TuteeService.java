package xyz.tamutheo.databaseAPI.tutee;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TuteeService {
    @Autowired
    private TuteeMapper tuteeMapper;
    public List<TuteeModel> read(String activeStatusNameEquals,
                                 String emailContains,
                                 String firstNameContains,
                                 String lastNameContains,
                                 String majorAbbreviationContains,
                                 Long phoneNumberContains,
                                 List<String> seniorityNameInList,
                                 Integer limit,
                                 Integer offset) {
        return this.tuteeMapper.read(activeStatusNameEquals,
                emailContains,
                firstNameContains,
                lastNameContains,
                majorAbbreviationContains,
                phoneNumberContains,
                seniorityNameInList,
                limit,
                offset);
    }
    public void create(TuteeModel tuteeModel) {
        this.tuteeMapper.create(tuteeModel);
    }
    public void update(TuteeModel tuteeModelOld, TuteeModel tuteeModelNew) {
        this.tuteeMapper.update(tuteeModelOld, tuteeModelNew);
    }
}