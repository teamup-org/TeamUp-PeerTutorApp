// This file contains type definitions for your data.
// It describes the shape of the data, and what data type each property should accept.
// These types are generated automatically if you're using an ORM such as Prisma.

import type { SvgIconComponent } 
from "@mui/icons-material";

declare global {
  type Link = {
    name: string,
    href: string,
    icon: SvgIconComponent,
  };

  type Tutor = {
    activeStatusName: string,
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
    numberOfRatings: number,
    payRate: number,
    phoneNumber: number,
    pictureUrl: string,
    seniorityName: string,
  };

  type TutorQuery = {
    data: Tutor[],
    metaData: { 
      pageNumber: number, 
      totalNumberEntries: number,
      maximumNumberEntriesPerPage: number,
      totalNumberPages: number,
    },
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

  type Major = {
    majorAbbreviation: string,
    majorName: string,
  };

  type Course = {
    courseNumber: number,
    courseGrade: string,
    majorAbbreviation: string,
    tutorEmail: string
  };
}