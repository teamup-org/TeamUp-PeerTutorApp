
// This file contains type definitions for our backend data.
// It describes the shape of the data, and what data type each property should accept.
// ORM such as Prisma should be considered in the future


import type { SvgIconComponent } 
from "@mui/icons-material";


// Must declare global to access types without import, IF importing. Imports flag file as React module and prevent global scoping by default.
declare global {
  // Custom Hyperlink type, useful for passing custom links to app-bar component as shown in /dashboard layout.tsx
  type Link = {
    name: string,
    href: string,
    icon: SvgIconComponent,
  };

  // Pagination Metadata
  type Metadata = {
    pageNumber: number, 
    totalNumberEntries: number,
    maximumNumberEntriesPerPage: number,
    totalNumberPages: number,
  };

  // REST API: /seniority
  type Seniority = "All" | "Freshman" | "Sophomore" | "Junior" | "Senior" | "Graduate";

  // REST API: /tutor_time_preference
  type TutorTimePreference = {
    startTimeString: string,
    endTimeString: string,

    tutorEmail: string,
    weekdayName: string,
  };

  // 
  type Tutor = {
    activeStatusName: "active" | "inactive" | "banned",

    // Contact Information
    firstName: string,
    lastName: string,
    email: string,
    phoneNumber: number,
    pictureUrl: string,

    // Profile Details
    listingTitle: string,
    bioText: string,
    averageRating: number,

    numberOfRatings: number,
    numberOneStarRatings: number,
    numberTwoStarRatings: number,
    numberThreeStarRatings: number,
    numberFourStarRatings: number,
    numberFiveStarRatings: number,

    coursePreferences: { 
      courseGrade: string, 
      courseNumber: number, 
      majorAbbreviation: string, 
      tutorEmail: string 
    }[],
    locationPreferences: { 
      locationName: string, 
      tutorEmail: string 
    }[],
    timePreferences: TutorTimePreference[],

    majorAbbreviation: string,
    payRate: number,
    seniorityName: Seniority,
  };

  // REST API: /tutor
  type TutorQuery = {
    data: Tutor[],
    metaData: Metadata,
  };

  type Tutee = {
    activeStatusName: string,
    email: string,
    firstName: string,
    lastName: string,
    majorAbbreviation: string,
    phoneNumber: number,
    seniorityName: string
  }

  type TuteeQuery = {
    data: Tutee[]
  }

  // REST API: /major
  type Major = {
    majorAbbreviation: string,
    majorName: string,
  };

  // REST API: /course
  type Course = {
    courseNumber: number,
    courseTitle: string,
    majorAbbreviation: string,
  };

  // 
  type Appointment = {
    appointmentId: number,

    // Appointment Information
    appointmentSizeName: "single" | "group",
    cancellationReason: string,
    tuteeRequestComment: string,
    startDateTimeString: Date,
    endDateTimeString: Date,
    isCancelled: boolean,
    isConfirmed: boolean,
    locationName: "in-person off-campus" | "in-person on-campus" | "online",

    // Tutee Information
    tuteeEmail: string,
    tuteePictureUrl: string,
    tuteeFirstName: string,
    tuteeLastName: string,
    tuteePhoneNumber: number,
    tuteeSeniorityName: Seniority,
    tuteeMajorAbbreviation: string,

    // Tutor Information
    tutorEmail: string,
    tutorPictureUrl: string,
    tutorFirstName: string,
    tutorLastName: string,
    tutorPhoneNumber: number,
    tutorSeniorityName: Seniority,
    tutorMajorAbbreviation: string,
  };

  // REST API: /appointment
  type AppointmentQuery = {
    data: Appointment[],
    metaData: Metadata,
  };

  // 
  type Review = {
    appointmentId: number | null,
    numberStars: number | null,
    reviewText: string,
    reviewDateString: string,

    tuteePictureUrl: string,
    tuteeEmail: string,
    tuteeFirstName: string,
    tuteeLastName: string,
    tuteeSeniority: string,
    tuteeMajorAbbreviation: string,

    tutorEmail: string,
  };

  // REST API: /tutor_review
  type ReviewQuery = {
    data: Review[],
    metaData: Metadata,
  };

  // REST API: /tutor_review/pending_reviews
  type PendingReview = {
    appointmentId: number,
    startDateTimeString: string,
    endDateTimeString, string,

    tutorEmail: string,
    tutorPictureUrl: string,
    tutorFirstName: string,
    tutorLastName: string,
    tutorMajorAbbreviation: string,
    tutorSeniority: Seniority,
  };
}
