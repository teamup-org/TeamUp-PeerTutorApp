package xyz.tamutheo.databaseAPI.util.tamuMajorAndCourse.tamuCourse;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.*;

@Service
public class TamuCourseService {
    public List<TamuCourseModel> get(String majorAbbreviation) {
        String url = "https://catalog.tamu.edu/course-search/api/?page=fose&route=search&subject=" + majorAbbreviation;
        // configure header
        HttpHeaders headers = new HttpHeaders();
        headers.setAccept(Arrays.asList(MediaType.APPLICATION_JSON));
        headers.add("user-agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.99 Safari/537.36");
        // configure parameter
        String parameter = "{\"other\":{\"srcdb\":\"\"},\"criteria\":[{\"field\":\"subject\",\"value\":\"" + majorAbbreviation + "\"}]}";
        // create HTTP Entity
        HttpEntity<String> entity = new HttpEntity<>(parameter ,headers);
        // get response
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.POST, entity, String.class);
        String jsonString = response.getBody();
        // convert response to map
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            Map<String, Object> map = objectMapper.readValue(jsonString, new TypeReference<Map<String, Object>>() {
            });
            ArrayList<LinkedHashMap> arrayList = (ArrayList<LinkedHashMap>) map.get("results");
            List<TamuCourseModel> tamuCourseModelList = new ArrayList<>();
            for (LinkedHashMap linkedHashMap : arrayList) {
                String courseCode = linkedHashMap.get("code").toString().toLowerCase();
                String[] courseInfo = courseCode.split(" ");
                TamuCourseModel tamuCourseModel = TamuCourseModel.builder()
                        .majorAbbreviation(courseInfo[0])
                        .courseNumber(Integer.valueOf(courseInfo[1]))
                        .courseTitle(linkedHashMap.get("title").toString().toLowerCase())
                        .build();
                tamuCourseModelList.add(tamuCourseModel);
            }
            return tamuCourseModelList;
        } catch (Exception e) {
            System.out.println(e);
        }
        return null;
    }
}
