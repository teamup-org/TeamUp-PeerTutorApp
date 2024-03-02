//package xyz.tamutheo.databaseAPI.util.tamuCourse;
//
//import org.springframework.http.HttpEntity;
//import org.springframework.http.HttpHeaders;
//import org.springframework.http.MediaType;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.client.RestTemplate;
//
//import java.util.Collections;
//
//public class TamuMajorCourseService {
//    public static void main(String[] args) {
//        RestTemplate restTemplate = new RestTemplate();
//        String url = "https://catalog.tamu.edu/course-search/api/?page=fose&route=search&subject=CSCE";
//        // configure header
//        HttpHeaders headers = new HttpHeaders();
//        headers.setAccept(Collections.singletonList(MediaType.APPLICATION_JSON));
//        headers.add("user-agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.99 Safari/537.36");
//        // configure parameter
//        String parameter = "%7B%22other%22%3A%7B%22srcdb%22%3A%22%22%7D%2C%22criteria%22%3A%5B%7B%22field%22%3A%22subject%22%2C%22value%22%3A%22CSCE%22%7D%5D%7D";
//        // create HTTP Entity
//        HttpEntity<String> entity = new HttpEntity<>(parameter, headers);
//        ResponseEntity<String> response = restTemplate.getForEntity(url, String.class);
//        System.out.println(response.getBody());
//
//
//
//        String url = localhost:80; // or any other uri
//
//        HttpHeaders headers = new HttpHeaders();
//        headers.setAccept(Collections.singletonList(MediaType.APPLICATION_JSON));
//        headers.add("user-agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.99 Safari/537.36");
//
//        HttpEntity<String> entity = new HttpEntity<>("parameters", headers);
//        ResponseEntity<?> result =
//                restTemplate.exchange(uri, HttpMethod.GET, entity, returnClass);
//        return result.getBody();
//    }
//}
