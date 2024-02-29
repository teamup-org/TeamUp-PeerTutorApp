package xyz.tamutheo.databaseAPI.tutor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/tutor")
public class TutorController {
    @Autowired
    private TutorService tutorService;
    @GetMapping(value = {"", "/"})
    public List<TutorModel> read(@RequestParam(name = "uin", required = false) Integer uin) {
        return this.tutorService.read(uin);
    }
    @PostMapping(value = {"", "/"})
    public void create(@RequestParam(name = "uin") Integer uin,
                       @RequestParam(name = "first_name") String firstName,
                       @RequestParam(name = "last_name") String lastName,
                       @RequestParam(name = "major_id") Integer majorId,
                       @RequestParam(name = "seniority_id") Integer seniorityId,
                       @RequestParam(name = "pay_rate") Double payRate,
                       @RequestParam(name = "bio_text") String bioText,
                       @RequestParam(name = "picture_url") String pictureUrl,
                       @RequestParam(name = "phone_number") Long phoneNumber,
                       @RequestParam(name = "email") String email,
                       @RequestParam(name = "active_status_id") Integer activeStatusId){
        TutorModel tutorModel = TutorModel.builder()
                .uin(uin)
                .firstName(firstName)
                .lastName(lastName)
                .majorId(majorId)
                .seniorityId(seniorityId)
                .payRate(payRate)
                .bioText(bioText)
                .pictureUrl(pictureUrl)
                .phoneNumber(phoneNumber)
                .email(email)
                .activeStatusId(activeStatusId)
                .build();
        this.tutorService.create(tutorModel);
    }
    @PutMapping(value = {"", "/"})
    public void update(@RequestParam(name = "uin_old") Integer uinOld,
                       @RequestParam(name = "uin_new") Integer uinNew,
                       @RequestParam(name = "first_name_new") String firstNameNew,
                       @RequestParam(name = "last_name_new") String lastNameNew,
                       @RequestParam(name = "major_id_new") Integer majorIdNew,
                       @RequestParam(name = "seniority_id_new") Integer seniorityIdNew,
                       @RequestParam(name = "pay_rate_new") Double payRateNew,
                       @RequestParam(name = "bio_text_new") String bioTextNew,
                       @RequestParam(name = "picture_url_new") String pictureUrlNew,
                       @RequestParam(name = "phone_number_new") Long phoneNumberNew,
                       @RequestParam(name = "email_new") String emailNew,
                       @RequestParam(name = "active_status_id_new") Integer activeStatusIdNew) {
        TutorModel tutorModelOld = TutorModel.builder()
                .uin(uinOld)
                .build();
        TutorModel tutorModelNew = TutorModel.builder()
                .uin(uinNew)
                .firstName(firstNameNew)
                .lastName(lastNameNew)
                .majorId(majorIdNew)
                .seniorityId(seniorityIdNew)
                .payRate(payRateNew)
                .bioText(bioTextNew)
                .pictureUrl(pictureUrlNew)
                .phoneNumber(phoneNumberNew)
                .email(emailNew)
                .activeStatusId(activeStatusIdNew)
                .build();
        this.tutorService.update(tutorModelOld, tutorModelNew);
    }
}