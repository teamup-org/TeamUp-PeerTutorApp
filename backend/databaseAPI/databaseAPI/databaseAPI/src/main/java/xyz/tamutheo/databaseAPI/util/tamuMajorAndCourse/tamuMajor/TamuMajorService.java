package xyz.tamutheo.databaseAPI.util.tamuMajorAndCourse.tamuMajor;

import org.jsoup.*;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class TamuMajorService {
    public List<TamuMajorModel> get() {
        try {
            // connect to target web page
            String url = "https://catalog.tamu.edu/course-search/";
            String userAgent = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36";
            Document document = Jsoup.connect(url).userAgent(userAgent).get();
            // retrieve HTML elements
            List<TamuMajorModel> tamuMajorModelList = new ArrayList<>();
            Elements majors = document.body().select("#crit-subject").select("option[value~=^(?!\\s*$).+]");
            for (Element major : majors) {
                String majorText = major.ownText().toLowerCase();
                String majorAbbreviation = majorText.substring(0, 4);
                String majorName = majorText.substring(majorText.lastIndexOf("-") + 1).trim();
                TamuMajorModel tamuMajorModel = TamuMajorModel.builder()
                        .majorAbbreviation(majorAbbreviation)
                        .majorName(majorName)
                        .build();
                tamuMajorModelList.add(tamuMajorModel);
            }
            return tamuMajorModelList;
        } catch (Exception e) {
            System.err.println(e);
        }
        return null;
    }
}
