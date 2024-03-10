package xyz.tamutheo.databaseAPI.tutee;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;


@Mapper
public interface TuteeMapper {
    List<TuteeModel> read(@Param("activeStatusNameEquals") String activeStatusNameEquals,
                          @Param("emailContains") String emailContains,
                          @Param("firstNameContains") String firstNameContains,
                          @Param("lastNameContains") String lastNameContains,
                          @Param("majorAbbreviationContains") String majorAbbreviationContains,
                          @Param("phoneNumberContains") Long phoneNumberContains,
                          @Param("seniorityNameInList") List<String> seniorityNameInList,
                          @Param("limit") Integer limit,
                          @Param("offset") Integer offset);
    void create(TuteeModel tuteeModel);
    void update(@Param("tuteeModelOld") TuteeModel tuteeModelOld,
                @Param("tuteeModelNew") TuteeModel tuteeModelNew);

}