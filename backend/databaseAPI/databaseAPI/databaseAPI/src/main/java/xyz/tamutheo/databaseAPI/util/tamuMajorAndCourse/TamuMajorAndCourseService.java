package xyz.tamutheo.databaseAPI.util.tamuMajorAndCourse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import xyz.tamutheo.databaseAPI.util.tamuMajorAndCourse.tamuCourse.TamuCourseModel;
import xyz.tamutheo.databaseAPI.util.tamuMajorAndCourse.tamuCourse.TamuCourseService;
import xyz.tamutheo.databaseAPI.util.tamuMajorAndCourse.tamuMajor.TamuMajorModel;
import xyz.tamutheo.databaseAPI.util.tamuMajorAndCourse.tamuMajor.TamuMajorService;

import java.util.ArrayList;
import java.util.List;

@Service
public class TamuMajorAndCourseService {
    @Autowired
    private TamuMajorAndCourseMapper tamuMajorAndCourseMapper;
    @Autowired
    private TamuMajorService tamuMajorService;
    @Autowired
    private TamuCourseService tamuCourseService;
    public void replace() {
        List<TamuMajorModel> tamuMajorModelList = this.tamuMajorService.get();
        for (TamuMajorModel tamuMajorModel : tamuMajorModelList) {
            String majorAbbreviation = tamuMajorModel.getMajorAbbreviation();
            this.tamuMajorAndCourseMapper.createMajor(tamuMajorModel.getMajorAbbreviation(), tamuMajorModel.getMajorName());
            List<TamuCourseModel> tamuCourseModelList = this.tamuCourseService.get(majorAbbreviation);
            for (TamuCourseModel tamuCourseModel : tamuCourseModelList) {
                this.tamuMajorAndCourseMapper.createCourse(tamuMajorModel.getMajorAbbreviation(), tamuCourseModel.getCourseNumber(), tamuCourseModel.getCourseTitle());
            }
        }
    }
}
