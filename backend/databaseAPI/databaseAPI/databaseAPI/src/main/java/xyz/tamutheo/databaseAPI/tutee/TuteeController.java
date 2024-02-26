package xyz.tamutheo.databaseAPI.tutee;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/tutee")
public class TuteeController {
    @Autowired
    private TuteeService tuteeService;
    @GetMapping(value = {"", "/"})
    public List<TuteeModel> read(@RequestParam(name = "uin", required = false) Integer uin) {
        return this.tuteeService.read(uin);
    }
    @PostMapping(value = {"", "/"})
    public void create(@RequestParam(name = "uin") Integer uin,
                       @RequestParam(name = "first_name") String firstName,
                       @RequestParam(name = "last_name") String lastName,
                       @RequestParam(name = "major_id") Integer majorId,
                       @RequestParam(name = "seniority_id") Integer seniorityId,
                       @RequestParam(name = "phone_number") Long phoneNumber,
                       @RequestParam(name = "email") String email) {
        TuteeModel tuteeModel = TuteeModel.builder()
                .uin(uin)
                .firstName(firstName)
                .lastName(lastName)
                .majorId(majorId)
                .seniorityId(seniorityId)
                .phoneNumber(phoneNumber)
                .email(email)
                .build();
        this.tuteeService.create(tuteeModel);
    }
    @PutMapping(value = {"", "/"})
    public void update(@RequestParam(name = "uin_old") Integer uinOld,
                       @RequestParam(name = "uin_new") Integer uinNew,
                       @RequestParam(name = "first_name_new") String firstNameNew,
                       @RequestParam(name = "last_name_new") String lastNameNew,
                       @RequestParam(name = "major_id_new") Integer majorIdNew,
                       @RequestParam(name = "seniority_id_new") Integer seniorityIdNew,
                       @RequestParam(name = "phone_number_new") Long phoneNumberNew,
                       @RequestParam(name = "email_new") String emailNew) {
        TuteeModel tuteeModelOld = TuteeModel.builder()
                .uin(uinOld)
                .build();
        TuteeModel tuteeModelNew = TuteeModel.builder()
                .uin(uinNew)
                .firstName(firstNameNew)
                .lastName(lastNameNew)
                .majorId(majorIdNew)
                .seniorityId(seniorityIdNew)
                .phoneNumber(phoneNumberNew)
                .email(emailNew)
                .build();
        this.tuteeService.update(tuteeModelOld, tuteeModelNew);

    }
}