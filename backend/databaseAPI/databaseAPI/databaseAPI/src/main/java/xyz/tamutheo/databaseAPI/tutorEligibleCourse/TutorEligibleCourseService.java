package xyz.tamutheo.databaseAPI.tutorEligibleCourse;

import org.apache.pdfbox.Loader;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.text.PDFTextStripper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import xyz.tamutheo.databaseAPI.tutor.TutorModel;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Service
public class TutorEligibleCourseService {
    @Autowired
    private TutorEligibleCourseMapper tutorEligibleCourseMapper;

    private List<String> getTrimmedWords(List<String> words) {
        for (int idx = 0; idx < words.size(); idx++) {
            words.set(idx, words.get(idx).trim());
        }
        return words;
    }

    private boolean isMajorAbbreviation(String text) {
        // check that text is 4 characters long
        if (text.length() != 4) {
            return false;
        }
        // check that text is only composed of upper case letters
        for (char ch : text.toCharArray()) {
            if (!Character.isLetter(ch) || !Character.isUpperCase(ch)) {
                return false;
            }
        }
        return true;
    }

    private boolean isCourseNumber(String text) {
        try {
            Integer courseNumber = Integer.valueOf(text);
            if ((courseNumber < 100) || (courseNumber > 800)) {
                return false;
            }
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    private boolean isCourseInfo(List<String> words) {
        if ((words.size() >= 2) && (isMajorAbbreviation(words.get(0))) && (isCourseNumber(words.get(1)))) {
            return true;
        }
        return false;
    }

    private boolean hasFullCourseInfo(List<String> words) {
        try {
            Double temp = Double.valueOf(words.get(words.size() - 1));
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    private TutorEligibleCourseModel getTutorEligibleCourseModel(List<String> words) {
        String majorAbbreviation = words.get(0);
        Integer courseNumber = Integer.valueOf(words.get(1));
        Character courseGrade = Character.valueOf(words.get(words.size() - 2).charAt(0));
        TutorEligibleCourseModel tutorEligibleCourseModel = TutorEligibleCourseModel.builder()
                .majorAbbreviation(majorAbbreviation)
                .courseNumber(courseNumber)
                .courseGrade(courseGrade)
                .build();
        return tutorEligibleCourseModel;
    }


    private List<TutorEligibleCourseModel> extract(String text) {
        List<TutorEligibleCourseModel> tutorEligibleCourseModelList = new ArrayList<>();
        List<String> lines = Arrays.asList(text.split(System.lineSeparator()));
        int lineIndex = 0;
        while (lineIndex < lines.size()) {
            // get trimmed words of current line
            String currentLine = lines.get(lineIndex);
            List<String> words = new ArrayList<String>(Arrays.asList(currentLine.split(" ")));
            // check that this line contains course information
            if (!isCourseInfo(words)) {
                lineIndex++;
                continue;
            }
            // grab more lines if current words does not contain all the course info
            while (!hasFullCourseInfo(words) && (lineIndex + 1 < lines.size())) {
                // get trimmed words of new line
                lineIndex++;
                String newLine = lines.get(lineIndex);
                List<String> newWords = Arrays.asList(newLine.split(" "));
                newWords = getTrimmedWords(newWords);
                // append new words
                words.addAll(newWords);
            }
            // if grade meets standard, add course information to list
            TutorEligibleCourseModel tutorEligibleCourseModel = getTutorEligibleCourseModel(words);
            if ((Character.toUpperCase(tutorEligibleCourseModel.getCourseGrade()) == 'A') || (Character.toUpperCase(tutorEligibleCourseModel.getCourseGrade()) == 'B')) {
                tutorEligibleCourseModelList.add(tutorEligibleCourseModel);
            }
            lineIndex++;
        }
        return tutorEligibleCourseModelList;
    }

    public List<TutorEligibleCourseModel> parse(MultipartFile file) {
        try {
            PDDocument document = Loader.loadPDF(file.getBytes());
            PDFTextStripper stripper = new PDFTextStripper();
            String text = stripper.getText(document);
            document.close();
            List<TutorEligibleCourseModel> tutorEligibleCourseModelList =  extract(text);
            return tutorEligibleCourseModelList;
        } catch (Exception e) {
            System.out.println(e);
        }
        return null;
    }

    public Boolean isValidTranscript (MultipartFile file, TutorModel tutorModel) {
        try {
            PDDocument document = Loader.loadPDF(file.getBytes());
            PDFTextStripper stripper = new PDFTextStripper();
            String text = stripper.getText(document);
            document.close();
            Boolean containsFirstName = text.toLowerCase().contains(tutorModel.getFirstName().toLowerCase());
            Boolean containsLastName = text.toLowerCase().contains(tutorModel.getLastName().toLowerCase());
            if (containsFirstName && containsLastName) {
                return true;
            }
        } catch (Exception e) {
            System.out.println(e);
        }
        return false;
    }

    public void create(String tutorEmail, MultipartFile file) {
        List<TutorEligibleCourseModel> tutorEligibleCourseModelList = parse(file);
        this.tutorEligibleCourseMapper.deleteAll(tutorEmail);
        for (TutorEligibleCourseModel tutorEligibleCourseModel : tutorEligibleCourseModelList) {
            tutorEligibleCourseModel.setTutorEmail(tutorEmail);
            this.tutorEligibleCourseMapper.create(tutorEligibleCourseModel);
        }
    }

    public List<TutorEligibleCourseModel> read(List<String> courseGradeInList,
                                               Integer courseNumberEquals,
                                               Integer courseNumberGreaterThanOrEquals,
                                               Integer courseNumberLessThanOrEquals,
                                               String majorAbbreviationContains,
                                               String tutorEmailContains,
                                               Integer limit,
                                               Integer offset) {
        return this.tutorEligibleCourseMapper.read(courseGradeInList,
                courseNumberEquals,
                courseNumberGreaterThanOrEquals,
                courseNumberLessThanOrEquals,
                majorAbbreviationContains,
                tutorEmailContains,
                limit,
                offset);
    }

    public void delete(TutorEligibleCourseModel tutorEligibleCourseModel) {
        this.tutorEligibleCourseMapper.delete(tutorEligibleCourseModel);
    }
}