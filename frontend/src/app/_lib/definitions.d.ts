
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
    bioText: string,
    coursePreferences: Course[],
    eligibleCourses: Course[],
    email: string,
    firstName: string,
    lastName: string,
    listingTitle: string,
    locationPreferences: { 
      locationName: string, 
      tutorEmail: string 
    }[],
    majorAbbreviation: string,
    payRate: number,
    seniorityName: Seniority,
    numberOfRatings: number
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

  type TuteeQuery = Tutee[];

  // REST API: /major
  type Major = {
    majorAbbreviation: string,
    majorName: string,
  };

  // REST API: /course
  type Course = {
    courseNumber: number,
    courseGrade: string,
    majorAbbreviation: string,
    tutorEmail: string
  };

  // 
  type Appointment = {
    appointmentId: number,

    // Appointment Information
    appointmentSizeName: "single" | "group",
    cancellationReason: string,
    startDateTimeString: Date,
    endDateTimeString: Date,
    isCancelled: boolean,
    isConfirmed: boolean,
    locationName: "in-person off-campus" | "in-person on-campus" | "online",

    // Tutee Information
    tuteeEmail: string,
    tuteeFirstName: string,
    tuteeLastName: string,
    tuteePhoneNumber: number,

    // Tutor Information
    tutorEmail: string,
    tutorFirstName: string,
    tutorLastName: string,
    tutorPhoneNumber: number,
  };

  // REST API: /appointment
  type AppointmentQuery = {
    data: Appointment[],
    metaData: Metadata,
  };
}
