package xyz.tamutheo.databaseAPI.tutee;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;


@Mapper
public interface TuteeMapper {
    List<TuteeModel> read(@Param("uin") Integer uin);
    void create(TuteeModel tuteeModel);
    void update(@Param("tuteeModelOld") TuteeModel tuteeModelOld,
                @Param("tuteeModelNew") TuteeModel tuteeModelNew);

}