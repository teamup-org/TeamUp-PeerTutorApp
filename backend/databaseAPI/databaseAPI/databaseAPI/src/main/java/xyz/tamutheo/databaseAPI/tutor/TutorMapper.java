package xyz.tamutheo.databaseAPI.tutor;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;


@Mapper
public interface TutorMapper {
    List<TutorModel> read(@Param("uin") Integer uin);
    void create(TutorModel tutorModel);
    void update(@Param("tutorModelOld") TutorModel tutorModelOld,
                @Param("tutorModelNew") TutorModel tutorModelNew);
}