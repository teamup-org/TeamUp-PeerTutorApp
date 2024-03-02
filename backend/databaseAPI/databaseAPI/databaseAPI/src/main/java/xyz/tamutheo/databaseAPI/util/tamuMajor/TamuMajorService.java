package xyz.tamutheo.databaseAPI.util.tamuMajor;

import org.jsoup.*;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

import java.util.ArrayList;
import java.util.List;

public class TamuMajorService {
//    public List<TamuMajorModel> read() {
public static void main(String[] args) {
        try {
            // connect to target web page
            String url = "https://catalog.tamu.edu/course-search/";
            String userAgent = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36";
            Document document = Jsoup.connect(url).userAgent(userAgent).get();
            // retrieve HTML elements
//            Elements majorDropDown = document.getElementsByClass("seligo-options");
//            System.out.println(majorDropDown);
//            List<TamuMajorModel> tamuMajorModelList = new ArrayList<>();
//            for (Element majorOption: majorDropDown) {
////                Element majorDescription = majorOption.select(",test").
////                TamuMajorModel tamuMajorModel = TamuMajorModel.builder()
////                        .
//                System.out.println(majorOption);
//            }
            Elements elements = document.body().select("*");

            for (Element element : elements) {
                System.out.println(element.ownText());
            }
        } catch (Exception e) {
            System.err.println(e);
        }
    }

}
