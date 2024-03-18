// PUT DATABASE DATA FETCHING FUNCTIONS HERE

// author: Brandon Nguyen

import { useQuery, useMutation, keepPreviousData } from "@tanstack/react-query";

import axios from "axios";

const development = "http://localhost:8080";
const deployment = "https://tamutheo.xyz/database-api";

axios.defaults.baseURL = development;


export function TableFetch<T>(tableName: string, ...args: string[]) {
  return {...useQuery<T>({
    queryKey: ["table-data-paginated", tableName],
    queryFn: async () => {
      let req = `/${tableName}?${args.join('&')}`
      return (await axios.get(req)).data;
    },
    placeholderData: keepPreviousData,
    })
  };
}

export function TableUpdate(tableName: string, field: string, value: any) {
  const { data, isError } = useMutation({
    mutationFn: async () => {
      return (await axios.put("/" + tableName, (field + '=' + value))).data;
    },
  });

  return { data, isError };
}


// ============== DATABASE TUTOR QUERIES ==============
// active_status_name_equals
// average_rating_greater_than_or_equals
// average_rating_less_than_or_equals
// bio_text_contains
// email_contains
// first_name_contains
// last_name_contains
// listing_title_contains
// major_abbreviation_contains
// number_of_ratings_greater_than_or_equals
// number_of_ratings_less_than_or_equals
// pay_rate_greater_than_or_equals
// pay_rate_less_than_or_equals
// phone_number_contains
// picture_url_contains
// seniority_name_in
// sort_by
          // average_rating_ascending --> equivalent front end label "lowest rating"
          // average_rating_descending --> equivalent front end label "highest rating"
          // pay_rate_ascending --> equivalent front end label "lowest pay rate"
          // pay_rate_descending --> equivalent front end label "highest pay rate"

// tutor_course_preference parameters

// course_grade_in
// course_number_equals
// course_number_greater_than_or_equals
// course_number_less_than_or_equals
// course_major_abbreviation_contains

// tutor_location_preference parameters

// location_name_in

// page_number
// number_entries_per_page
