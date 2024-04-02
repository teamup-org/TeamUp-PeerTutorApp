package xyz.tamutheo.databaseAPI.tutee;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping("/tutee")
public class TuteeController {
    @Autowired
    private TuteeService tuteeService;
    @PostMapping(value = {"", "/"})
    public void create(@RequestParam(name = "active_status_name", defaultValue = "active") String activeStatusName,
                       @RequestParam(name = "email") String email,
                       @RequestParam(name = "first_name") String firstName,
                       @RequestParam(name = "last_name") String lastName,
                       @RequestParam(name = "major_abbreviation") String majorAbbreviation,
                       @RequestParam(name = "picture_url") String pictureUrl,
                       @RequestParam(name = "phone_number") Long phoneNumber,
                       @RequestParam(name = "seniority_name") String seniorityName){
        TuteeModel tuteeModel = TuteeModel.builder()
                .activeStatusName(activeStatusName)
                .email(email)
                .firstName(firstName)
                .lastName(lastName)
                .majorAbbreviation(majorAbbreviation)
                .pictureUrl(pictureUrl)
                .phoneNumber(phoneNumber)
                .seniorityName(seniorityName)
                .build();
        this.tuteeService.create(tuteeModel);
    }

    @GetMapping(value = {"", "/"})
    public List<TuteeModel> read(@RequestParam(name = "active_status_name_equals", required = false) String activeStatusNameEquals,
                                 @RequestParam(name = "email_contains", required = false) String emailContains,
                                 @RequestParam(name = "first_name_contains", required = false) String firstNameContains,
                                 @RequestParam(name = "last_name_contains", required = false) String lastNameContains,
                                 @RequestParam(name = "major_abbreviation_contains", required = false) String majorAbbreviationContains,
                                 @RequestParam(name = "phone_number_contains", required = false) Long phoneNumberContains,
                                 @RequestParam(name = "seniority_name_in", required = false) String seniorityNameIn,
                                 @RequestParam(name = "limit", required = false) Integer limit,
                                 @RequestParam(name = "offset", required = false) Integer offset) {
        List<String> seniorityNameInList = null;
        if (seniorityNameIn != null) {
            seniorityNameInList = Arrays.asList(seniorityNameIn.split(", "));
            for (int idx = 0; idx < seniorityNameInList.size(); idx++) {
                seniorityNameInList.set(idx, seniorityNameInList.get(idx).trim());
            }
        }
        return this.tuteeService.read(activeStatusNameEquals,
                emailContains,
                firstNameContains,
                lastNameContains,
                majorAbbreviationContains,
                phoneNumberContains,
                seniorityNameInList,
                limit,
                offset);
    }

    //    @PutMapping(value = {"", "/"})
    @RequestMapping(value = {"/update"})
    public void update(@RequestParam(name = "email_old") String emailOld,
                       @RequestParam(name = "active_status_name_new", required = false) String activeStatusNameNew,
                       @RequestParam(name = "email_new", required = false) String emailNew,
                       @RequestParam(name = "first_name_new", required = false) String firstNameNew,
                       @RequestParam(name = "last_name_new", required = false) String lastNameNew,
                       @RequestParam(name = "major_abbreviation_new", required = false) String majorAbbreviationNew,
                       @RequestParam(name = "picture_url_new", required = false) String pictureUrlNew,
                       @RequestParam(name = "phone_number_new", required = false) Long phoneNumberNew,
                       @RequestParam(name = "seniority_name_new", required = false) String seniorityNameNew) {
        TuteeModel tuteeModelOld = TuteeModel.builder()
                .email(emailOld)
                .build();
        TuteeModel tuteeModelNew = TuteeModel.builder()
                .activeStatusName(activeStatusNameNew)
                .email(emailNew)
                .firstName(firstNameNew)
                .lastName(lastNameNew)
                .majorAbbreviation(majorAbbreviationNew)
                .pictureUrl(pictureUrlNew)
                .phoneNumber(phoneNumberNew)
                .seniorityName(seniorityNameNew)
                .build();
        this.tuteeService.update(tuteeModelOld, tuteeModelNew);
    }
}