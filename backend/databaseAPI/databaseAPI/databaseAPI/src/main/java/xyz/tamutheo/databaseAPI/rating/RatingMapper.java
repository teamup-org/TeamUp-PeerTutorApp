package xyz.tamutheo.databaseAPI.rating;

import org.apache.ibatis.annotations.Mapper;

import java.util.List;


@Mapper
public interface RatingMapper {
    List<RatingModel> read();
}