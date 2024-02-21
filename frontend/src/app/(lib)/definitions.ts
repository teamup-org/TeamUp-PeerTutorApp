// This file contains type definitions for your data.
// It describes the shape of the data, and what data type each property should accept.
// These types are generated automatically if you're using an ORM such as Prisma.

type JSONValue =
  | string
  | number
  | boolean
  | { [x: string]: JSONValue }
  | Array<JSONValue>;

type Tutor = {
  id: number,
  name: string,
  pfp_url: string,
  hourly_rate: number,
  rating: number,
  rating_count: number,
  title: string,
  courses: string[],
  description: string,
};