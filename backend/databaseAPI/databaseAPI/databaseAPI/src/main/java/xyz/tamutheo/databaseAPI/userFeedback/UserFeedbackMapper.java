package xyz.tamutheo.databaseAPI.userFeedback;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface UserFeedbackMapper {
    void save(UserFeedbackModel feedback);
}
