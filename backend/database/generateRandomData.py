import csv
import random
import math
import collections

random.seed(42)

# load data

with open("samples/greetings.csv", mode = "r") as file:
    csvFile = csv.reader(file)
    greetings = [*csvFile]
    
with open("samples/femaleFirstNames.csv", mode = "r") as file:
    csvFile = csv.reader(file)
    femaleFirstNames = [*csvFile]
    
with open("samples/maleFirstNames.csv", mode = "r") as file:
    csvFile = csv.reader(file)
    maleFirstNames = [*csvFile]
    
with open("samples/lastNames.csv", mode = "r") as file:
    csvFile = csv.reader(file)
    lastNames = [*csvFile]
    
with open("samples/femalePictureUrls.csv", mode = "r") as file:
    csvFile = csv.reader(file)
    femalePictureUrls = [*csvFile]
    
with open("samples/malePictureUrls.csv", mode = "r") as file:
    csvFile = csv.reader(file)
    malePictureUrls = [*csvFile]
    
with open("samples/seniorityNames.csv", mode = "r") as file:
    csvFile = csv.reader(file)
    seniorityNames = [*csvFile]
       
with open("samples/weekdays.csv", mode = "r") as file:
    csvFile = csv.reader(file)
    weekdays = [*csvFile]
    
with open("samples/location.csv", mode = "r") as file:
    csvFile = csv.reader(file)
    locations = [*csvFile]

with open("samples/majors.csv", mode = "r") as file:
    csvFile = csv.reader(file)
    majors = [*csvFile]

with open("samples/courses.csv", mode = "r") as file:
    csvFile = csv.reader(file)
    courses = [*csvFile]
    
# create dictionary of majors to courses
courseDict = collections.defaultdict(lambda: set())
for major, courseNumber in courses:
    courseDict[major].add(int(courseNumber))
        
class TimePreference:
    def __init__(self, startTime, endTime, weekdayName):
        self.startTime = startTime
        self.endTime = endTime
        self.weekdayName = weekdayName
        
    def __str__(self):
        return f"{self.startTime}, {self.endTime}, {self.weekdayName}"

class Tutor:
    def __init__(self):
        self.bioText = None
        self.email = None
        self.firstName = None
        self.lastName = None
        self.listingTitle = None
        self.majorAbbreviation = None
        self.payRate = None
        self.phoneNumber = None
        self.pictureUrl = None
        self.seniorityName = None
        self.timePreferences = None
        self.courses = []
        self.locationPreference = None
        
    def __str__(self):
        #return f"{self.firstName}, {self.lastName}"
        return f"{self.firstName}, {self.lastName}, {self.email}, {self.bioText}, {self.listingTitle}, {self.majorAbbreviation}, {self.payRate}, {self.phoneNumber}, {self.pictureUrl}, {self.seniorityName}, {self.locationPreference}"

class Tutee:
    def __init__(self):
        self.email = None
        self.firstName = None
        self.lastName = None
        self.majorAbbreviation = None
        self.phoneNumber = None
        self.pictureUrl = None
        self.seniorityName = None
        
    def __str__(self):
        #return f"{self.firstName}, {self.lastName}"
        return f"{self.firstName}, {self.lastName}, {self.email}, {self.majorAbbreviation}, {self.phoneNumber}, {self.pictureUrl}, {self.seniorityName}"

class Appointment:
    def __init__(self, appointmentId):
        self.appointmentId = appointmentId
        self.appointmentSizeName = None
        self.endDateTime = None
        self.isCancelled = None
        self.isConfirmed = None
        self.locationName = None
        self.startDateTime = None
        self.tuteeEmail = None
        self.tutorEmail = None
        self.date = None
        
    def __str__(self):
        return f"{self.appointmentId},\n {self.appointmentSizeName},\n {self.endDateTime},\n {self.isCancelled},\n {self.isConfirmed},\n {self.locationName},\n {self.startDateTime},\n {self.tuteeEmail},\n {self.tutorEmail},\n {self.date}\n"

class Review:
    def __init__(self, appointmentId):
        self.appointmentId = appointmentId
        self.numberStars = None
        self.reviewDate = None
        self.reviewText = None
        self.tuteeEmail = None
        self.tutorEmail = None
        
    def __str__(self):
        return f"{self.appointmentId},\n {self.numberStars},\n {self.reviewDate},\n {self.reviewText},\n {self.tuteeEmail},\n {self.tutorEmail}\n"
        
        

# get random sample of courses by major
def getCourses(major, seniority, idealMin):
    maxCourseNumber = None
    minCourseNumber = 100
    if seniority == "freshman":
        maxCourseNumber = 199
    elif seniority == "sophomore":
        maxCourseNumber = 299
    elif seniority == "junior":
        maxCourseNumber = 399
    elif seniority == "senior":
        maxCourseNumber = 499
    elif seniority == "graduate":
        maxCourseNumber = 800
        minCourseNumber = 600
    eligibleCourses = [*filter(lambda x: (x <= maxCourseNumber) and (x >= minCourseNumber), courseDict[major])]
    maxNumCourses = min(idealMin, len(eligibleCourses))
    courseNumbers = random.sample(eligibleCourses, maxNumCourses)
    return courseNumbers

# generate tutors      
def getTutors(numTutors):
    tutors = []
    # create empty tutors
    for _ in range(numTutors):
        tutors.append(Tutor())
    # split gender evenly
    numMaleTutors = math.floor(numTutors / 2)
    numFemaleTutors = numTutors - numMaleTutors
    fullNames = set()
    # add male tutor names and picture urls
    for idx in range(numMaleTutors):
        tutors[idx].pictureUrl = malePictureUrls[idx % len(malePictureUrls)][0]
        tutors[idx].firstName = random.choice(maleFirstNames)[0]
        tutors[idx].lastName = random.choice(lastNames)[0]
        while (tutors[idx].firstName, tutors[idx].lastName) in fullNames:
            tutors[idx].firstName = random.choice(maleFirstNames)[0]
            tutors[idx].lastName = random.choice(lastNames)[0]
        fullNames.add((tutors[idx].firstName, tutors[idx].lastName))
    # add male tutor names and picture urls
    for idx in range(numFemaleTutors):
        tutors[idx + numMaleTutors].pictureUrl = femalePictureUrls[idx % len(femalePictureUrls)][0]
        tutors[idx + numMaleTutors].firstName = random.choice(femaleFirstNames)[0]
        tutors[idx + numMaleTutors].lastName = random.choice(lastNames)[0]
        while (tutors[idx + numMaleTutors].firstName, tutors[idx + numMaleTutors].lastName) in fullNames:
            tutors[idx + numMaleTutors].firstName = random.choice(femaleFirstNames)[0]
            tutors[idx + numMaleTutors].lastName = random.choice(lastNames)[0]
        fullNames.add((tutors[idx + numMaleTutors].firstName, tutors[idx + numMaleTutors].lastName))
    for idx, tutor in enumerate(tutors):
        # add email
        tutor.email = f"{tutor.firstName}_{tutor.lastName}@gmail.com"
        # add bio text
        tutor.bioText = f"{greetings[idx % len(greetings)][0]} I am {tutor.firstName} {tutor.lastName}!"
        # add major
        tutor.majorAbbreviation = majors[idx % len(majors)][0]
        # add listing title
        tutor.listingTitle = f"{tutor.majorAbbreviation.upper()} tutor"
        # add phone number
        tutor.phoneNumber = 1000000000 + idx
        # add pay rate
        tutor.payRate = max(5, (idx * 10) % 200)
        # add seniority
        tutor.seniorityName = seniorityNames[idx % len(seniorityNames)][0]
        # add time preferences
        timePreferences = []
        for weekday in weekdays:
            startTimes = random.sample(range(0, 20, 3), 2)
            for startTime in startTimes:
                timePreferences.append(TimePreference(f"{str(startTime).zfill(2)}:00:00", f"{str(startTime + 3).zfill(2)}:00:00", weekday[0]))
        tutor.timePreferences = timePreferences
        # add courses
        tutor.courses = getCourses(tutor.majorAbbreviation, tutor.seniorityName, 10)
        # add location preference
        tutor.locationPreference = locations[idx % len(locations)][0]
        
    # # check for anyone with no courses
    validTutors = []
    for tutor in tutors:
        if len(tutor.courses) > 0:
            validTutors.append(tutor)
    return validTutors

# generate tutees
def getTutees(numTutees):
    tutees = []
    # create empty tutees
    for _ in range(numTutees):
        tutees.append(Tutee())
    # split gender evenly
    numMaleTutees = math.floor(numTutees / 2)
    numFemaleTutees = numTutees - numMaleTutees
    fullNames = set()
    # add male tutee names and picture urls
    for idx in range(numMaleTutees):
        tutees[idx].pictureUrl = malePictureUrls[idx % len(malePictureUrls)][0]
        tutees[idx].firstName = random.choice(maleFirstNames)[0]
        tutees[idx].lastName = random.choice(lastNames)[0]
        while ((tutees[idx].firstName + tutees[idx].lastName)) in fullNames:
            tutees[idx].firstName = random.choice(maleFirstNames)[0]
            tutees[idx].lastName = random.choice(lastNames)[0]
        fullNames.add((tutees[idx].firstName + tutees[idx].lastName))
    # add female tutee names and picture urls
    for idx in range(numFemaleTutees):
        tutees[idx + numMaleTutees].pictureUrl = femalePictureUrls[idx % len(femalePictureUrls)][0]
        tutees[idx + numMaleTutees].firstName = random.choice(femaleFirstNames)[0]
        tutees[idx + numMaleTutees].lastName = random.choice(lastNames)[0]
        while ((tutees[idx + numMaleTutees].firstName + tutees[idx + numMaleTutees].lastName)) in fullNames:
            tutees[idx + numMaleTutees].firstName = random.choice(femaleFirstNames)[0]
            tutees[idx + numMaleTutees].lastName = random.choice(lastNames)[0]
        fullNames.add((tutees[idx + numMaleTutees].firstName + tutees[idx + numMaleTutees].lastName))           
    for idx, tutee in enumerate(tutees):
        # add email
        tutee.email = f"{tutee.firstName}_{tutee.lastName}@gmail.com"
        # add major
        tutee.majorAbbreviation = majors[idx % len(majors)][0]
        # add phone number
        tutee.phoneNumber = 5000000000 + idx
        # add seniority
        tutee.seniorityName = seniorityNames[idx % len(seniorityNames)][0]
            
    return tutees

# generate random start and end times
def getStartAndEndTime():
    date = random.randint(1, 20)
    startTime = random.randint(1, 22)
    endTime = startTime + 1
    startDateTime = f"2024-03-{str(date).zfill(2)} {str(startTime).zfill(2)}:00:00"
    endDateTime = f"2024-03-{str(date).zfill(2)} {str(endTime).zfill(2)}:00:00"
    return (startDateTime, endDateTime, f"2024-03-{str(date).zfill(2)}")

# generate appointment
def getAppointments(tutors, tutees, numAppointmentsPerTutor):
    # create dictionary of majors to tutees
    tuteeMajorDict = collections.defaultdict(lambda: [])
    for tutee in tutees:
        tuteeMajorDict[tutee.majorAbbreviation].append(tutee)
    # create place holder appointments
    appointments = []
    for idx in range(len(tutors) * numAppointmentsPerTutor):
        appointments.append(Appointment(idx + 1))
        
    
    for tutorIdx, tutor in enumerate(tutors):
        # find population of valid tutees
        validTuteeSeniority = ["freshman", "sophomore", "junior", "senior", "graduate"]
        if tutor.seniorityName == "freshman":
            validTuteeSeniority = ["freshman"]
        elif tutor.seniorityName == "sophomore":
            validTuteeSeniority = ["freshman", "sophomore"]
        elif tutor.seniorityName == "junior":
            validTuteeSeniority = ["freshman", "sophomore", "junior"]
        elif tutor.seniorityName == "senior":
            validTuteeSeniority = ["freshman", "sophomore", "junior", "senior"]
        elif tutor.seniorityName == "graduate":
            validTuteeSeniority = ["graduate"]
        validTutees = [*filter(lambda tutee: tutee.seniorityName in validTuteeSeniority, tuteeMajorDict[tutor.majorAbbreviation])]
        # assign tutor and tutees to appointment and other details
        for tuteeIdx, tutee in enumerate(random.sample(validTutees, min(len(validTutees), numAppointmentsPerTutor))):
            appointments[tutorIdx * numAppointmentsPerTutor + tuteeIdx].tutorEmail = tutor.email
            appointments[tutorIdx * numAppointmentsPerTutor + tuteeIdx].tuteeEmail = tutee.email
            appointments[tutorIdx * numAppointmentsPerTutor + tuteeIdx].appointmentSizeName = "single"
            appointments[tutorIdx * numAppointmentsPerTutor + tuteeIdx].locationName = tutor.locationPreference
            appointments[tutorIdx * numAppointmentsPerTutor + tuteeIdx].isConfirmed = "true"
            appointments[tutorIdx * numAppointmentsPerTutor + tuteeIdx].isCancelled = "false"
            startTime, endTime, date = getStartAndEndTime()
            appointments[tutorIdx * numAppointmentsPerTutor + tuteeIdx].startDateTime = startTime
            appointments[tutorIdx * numAppointmentsPerTutor + tuteeIdx].endDateTime = endTime
            appointments[tutorIdx * numAppointmentsPerTutor + tuteeIdx].date = date
            
    return appointments
        
# generate reviews
def getReviews(appointments):
    reviews = []
    options = [(1, "terrible tutor"), (2, "bad tutor"), (3, "decent tutor"), (4, "great tutor"), (5, "incredible tutor")]
    for appointment in appointments:
        temp = Review(appointment.appointmentId)
        temp.tutorEmail = appointment.tutorEmail
        temp.tuteeEmail = appointment.tuteeEmail
        temp.reviewDate = appointment.date
        numberStars, reviewText = random.choice(options)
        temp.numberStars = numberStars
        temp.reviewText = reviewText
        reviews.append(temp)
    return reviews
        

# set parameters
numTutors = 270 * 15
numAppointmentsPerTutor = 15
numTutees = numTutors * numAppointmentsPerTutor

# generate data
tutors = getTutors(numTutors)
tutees = getTutees(numTutees)
appointments = getAppointments(tutors, tutees, numAppointmentsPerTutor)
reviews = getReviews(appointments)

# format output
with open("generatedData.sql", "w") as file:
    # insert hard coded values
    with open("hardcoded/majors") as hardcodedMajors:
        file.write(hardcodedMajors.read() + "\n\n")
    with open("hardcoded/courses") as hardcodedCourses:
        file.write(hardcodedCourses.read() + "\n\n")
    with open("hardcoded/misc") as hardcodedMisc:
        file.write(hardcodedMisc.read() + "\n\n")
    
    # insert tutors
    file.write("INSERT INTO tutor" + "\n")
    file.write("\t(first_name, last_name, major_abbreviation, seniority_name, pay_rate, bio_text, picture_url, phone_number, email, listing_title)" + "\n")
    file.write("VALUES" + "\n")
    for tutor in tutors[:-1]:
        file.write(f"\t('{tutor.firstName}', '{tutor.lastName}', '{tutor.majorAbbreviation}', '{tutor.seniorityName}', {tutor.payRate}, '{tutor.bioText}', '{tutor.pictureUrl}', {tutor.phoneNumber}, '{tutor.email}', '{tutor.listingTitle}')," + "\n")
    file.write(f"\t('{tutors[-1].firstName}', '{tutors[-1].lastName}', '{tutors[-1].majorAbbreviation}', '{tutors[-1].seniorityName}', {tutors[-1].payRate}, '{tutors[-1].bioText}', '{tutors[-1].pictureUrl}', {tutors[-1].phoneNumber}, '{tutors[-1].email}', '{tutors[-1].listingTitle}');" + "\n")
    # insert tutor time preferences
    file.write("\n")
    file.write("INSERT INTO tutor_time_preference" + "\n")
    file.write("\t(tutor_email, start_time, end_time, weekday_name)" + "\n")
    file.write("VALUES" + "\n")
    for tutor in tutors[:-1]:
        for timePreference in tutor.timePreferences:
            file.write(f"\t('{tutor.email}', '{timePreference.startTime}', '{timePreference.endTime}', '{timePreference.weekdayName}')," + "\n")
    for timePreference in tutors[-1].timePreferences[:-1]:
        file.write(f"\t('{tutors[-1].email}', '{timePreference.startTime}', '{timePreference.endTime}', '{timePreference.weekdayName}')," + "\n")
    file.write(f"\t('{tutors[-1].email}', '{tutors[-1].timePreferences[-1].startTime}', '{tutors[-1].timePreferences[-1].endTime}', '{tutors[-1].timePreferences[-1].weekdayName}');" + "\n")
    # insert tutor eligible course
    file.write("\n")
    file.write("INSERT INTO tutor_eligible_course" + "\n")
    file.write("\t(tutor_email, major_abbreviation, course_number, course_grade)" + "\n")
    file.write("VALUES" + "\n")
    for tutor in tutors[:-1]:
        for courseNumber in tutor.courses:
            file.write(f"\t('{tutor.email}', '{tutor.majorAbbreviation}', {courseNumber}, 'a')," + "\n")
    for courseNumber in tutors[-1].courses[:-1]:
        file.write(f"\t('{tutors[-1].email}', '{tutors[-1].majorAbbreviation}', {courseNumber}, 'a')," + "\n")
    file.write(f"\t('{tutors[-1].email}', '{tutors[-1].majorAbbreviation}', {tutors[-1].courses[-1]}, 'a');" + "\n")
    
    with open("hardcoded/coursePreferences") as hardcodedCoursePreferences:
            file.write(hardcodedCoursePreferences.read() + "\n\n")
    
    # insert tutor location preferences
    file.write("\n")
    file.write("INSERT INTO tutor_location_preference" + "\n")
    file.write("\t(tutor_email, location_name)" + "\n")
    file.write("VALUES" + "\n")
    for tutor in tutors[:-1]:
        file.write(f"\t('{tutor.email}', '{tutor.locationPreference}')," + "\n")
    file.write(f"\t('{tutors[-1].email}', '{tutors[-1].locationPreference}');" + "\n")
    # insert tutees
    file.write("INSERT INTO tutee" + "\n")
    file.write("\t(first_name, last_name, major_abbreviation, seniority_name, phone_number, email, picture_url)" + "\n")
    file.write("VALUES" + "\n")
    for tutee in tutees[:-1]:
        file.write(f"\t('{tutee.firstName}', '{tutee.lastName}', '{tutee.majorAbbreviation}', '{tutee.seniorityName}', {tutee.phoneNumber}, '{tutee.email}', '{tutee.pictureUrl}')," + "\n")
    file.write(f"\t('{tutees[-1].firstName}', '{tutees[-1].lastName}', '{tutees[-1].majorAbbreviation}', '{tutees[-1].seniorityName}', {tutees[-1].phoneNumber}, '{tutees[-1].email}', '{tutees[-1].pictureUrl}');" + "\n")
    # insert appointments
    file.write("INSERT INTO appointment" + "\n")
    file.write("\t(appointment_id, tutee_email, tutor_email, start_date_time, end_date_time, location_name, is_confirmed)" + "\n")
    file.write("VALUES" + "\n")
    for appointment in appointments[:-1]:
        file.write(f"\t('{appointment.appointmentId}', '{appointment.tuteeEmail}', '{appointment.tutorEmail}', '{appointment.startDateTime}', '{appointment.endDateTime}', '{appointment.locationName}', {appointment.isConfirmed})," + "\n")
    file.write(f"\t('{appointments[-1].appointmentId}', '{appointments[-1].tuteeEmail}', '{appointments[-1].tutorEmail}', '{appointments[-1].startDateTime}', '{appointments[-1].endDateTime}', '{appointments[-1].locationName}', {appointments[-1].isConfirmed});" + "\n")    
    # insert reviews
    file.write("INSERT INTO tutor_review" + "\n")
    file.write("\t(appointment_id, tutee_email, tutor_email, number_stars, review_text, review_date)" + "\n")
    file.write("VALUES" + "\n")
    for review in reviews[:-1]:
        file.write(f"\t('{review.appointmentId}', '{review.tuteeEmail}', '{review.tutorEmail}', {review.numberStars}, '{review.reviewText}', '{review.reviewDate}')," + "\n")
    file.write(f"\t('{reviews[-1].appointmentId}', '{reviews[-1].tuteeEmail}', '{reviews[-1].tutorEmail}', {reviews[-1].numberStars}, '{reviews[-1].reviewText}', '{reviews[-1].reviewDate}');" + "\n")
    
    with open("hardcoded/demo") as hardcodedDemo:
        file.write(hardcodedDemo.read() + "\n\n")
    
