import * as React from 'react';
  
import { Typography, Divider, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Checkbox } 
  from '@mui/material';

import FullCalendar 
from '@fullcalendar/react';

import timeGridPlugin 
from '@fullcalendar/timegrid';

import dayGridPlugin 
from '@fullcalendar/daygrid';

import interactionPlugin 
from '@fullcalendar/interaction';

import { EventInput }
from '@fullcalendar/core/index.js';

import type { DateSelectArg, EventClickArg, EventDropArg, EventAddArg } 
  from '@fullcalendar/core/index.js';

import { scheduleToTimes } 
  from '@/app/_lib/utils';

/**
 * Component for displaying time preferences on registration page
 * @param data - Tutor Data 
 * @returns 
 */
export function TimePreferences(
  {data : [data, setData]}
  :
  {data : [Tutor, Function]}
) {

  const scheduleRef = React.useRef<FullCalendar | null>(null);
  var selectedEvent: EventClickArg;
  
  const Day: { [key: string]: number } = { 
    "sunday": 0, 
    "monday": 1, 
    "tuesday": 2, 
    "wednesday": 3, 
    "thursday": 4, 
    "friday": 5, 
    "saturday": 6 
  };

  const [events, setEvents] = React.useState<EventInput[]>();
  
  React.useEffect(() => {
    setEvents(data?.timePreferences.map((time: TutorTimePreference) => (
    {
      startTime: time.startTimeString,
      endTime: time.endTimeString,
      daysOfWeek: [ Day[time.weekdayName] ],
    }
    )));
  }, [data]);
  
  const handleEventRemove = () => {
    if (selectedEvent) selectedEvent.event.remove();
  };
  
  /**
   * Updates time preferences when a new time event is added 
   */
  const handleEventSubmit = () => {
    const timeEvents = scheduleToTimes(scheduleRef);
    let times: TutorTimePreference[] = [];
  
    timeEvents?.map((timeSlot, index) => {
    times.push({tutorEmail: data?.email,
                weekdayName: timeSlot.dow[0],
                startTimeString: timeSlot.time[0],
                endTimeString: timeSlot.time[1]})
    });
  
    setData({
    ...data,
    timePreferences: times
    });
  
  };
  
  // Callback function after releasing click on date selection
  const handleDateSelect = (event: DateSelectArg) => {
    scheduleRef.current?.getApi().addEvent(event);
    scheduleRef.current?.getApi().unselect();
    handleEventSubmit();
  };
  
  // Callback function after clicking event
  const handleEventClick = (info: EventClickArg) => {
    if (selectedEvent) selectedEvent.el.style.outline = "";
    info.el.style.outline = "2px solid black";
    selectedEvent = info;
  };

  return (
    <div style={{ width: '80%', margin: 'auto' }}>
      <div style={{ marginBottom: '15vh' }}>
        <Typography variant="h6">Drag and drop the times you preferred!</Typography>
        <Divider />
      <FullCalendar
        ref={scheduleRef}
        plugins={[ interactionPlugin, dayGridPlugin, timeGridPlugin ]}
        events={events}

        initialView="timeGridWeek"
        height="70vh"
        headerToolbar={{
          left: 'deleteTime'
        }}
        dayHeaderFormat={{ weekday: 'long' }}
        customButtons={{
          deleteTime: {
            text: 'Remove Selected Time',
            click: handleEventRemove,
          }
        }}

        allDaySlot={false} slotDuration="00:15:00" slotLabelInterval="01:00"
        unselectAuto={false} editable selectable selectMirror selectOverlap={false} eventOverlap={false}
        eventClick={handleEventClick} select={handleDateSelect}
      />
      </div>
    </div>
  );
}

/**
 * Component for displaying eligible courses and course preferences on registration page
 * @param data - Tutor Data 
 * @returns 
 */
export function CoursePreferences(
  {data : [data, setData]}
  :
  {data : [Tutor, Function]}
) {

  const handleCheckboxChange = (index: number, isChecked: boolean) => {
    const course = data?.eligibleCourses[index];
    const courseIdentifier = `${course.majorAbbreviation} ${course.courseNumber}`;
    const updatedTutorProfileData = { ...data };
  
    if (isChecked) {
    updatedTutorProfileData.coursePreferences.push(course);
    } else {
    const courseIndex = updatedTutorProfileData.coursePreferences.findIndex((c: any) => `${c.majorAbbreviation} ${c.courseNumber}` === courseIdentifier);
    if (courseIndex !== -1) {
      updatedTutorProfileData.coursePreferences.splice(courseIndex, 1);
    }
    }
  
    setData(updatedTutorProfileData);
  };

  return (
    <div style={{ width: '80%', margin: 'auto' }}>
      <div style={{ marginBottom: '15vh' }}>
        <Typography variant="h6">Select the courses you want to Peer Tutor For!</Typography>
        <Divider />
        <TableContainer sx={{ maxHeight: '25em' }}>
          <Table stickyHeader>
            <TableHead>
            <TableRow>
              <TableCell>Course</TableCell>
              <TableCell>Grade</TableCell>
              <TableCell>Preferred</TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {data?.eligibleCourses.map((item: any, index: number) => (
              <TableRow key={index}>
              <TableCell>{`${item.majorAbbreviation} ${item.courseNumber}`}</TableCell>
              <TableCell>{item.courseGrade}</TableCell>
              <TableCell>
              <Checkbox
                checked={data?.coursePreferences.some((c: any) => `${c.majorAbbreviation} ${c.courseNumber}` === `${item.majorAbbreviation} ${item.courseNumber}`)}
                onChange={(event) => handleCheckboxChange(index, event.target.checked)}
              />
              </TableCell>
              </TableRow>
            ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
  
}

/**
 * Component for displaying location preferences on registration page
 * @param data - Tutor Data 
 * @returns 
 */
export function LocationPreferences(
  {data : [data, setData]}
  :
  {data : [Tutor, Function]}
) {

  /**
   * All Location Options
   */
  const locationOptions: LocationType[] = [
    "in-person on-campus",
    "in-person off-campus",
    "online"
  ];

  /**
   * Changes location preferences
   * @param location 
   */
  const locationChange = (location: LocationType) => {
    const locationObject = { locationName: location, tutorEmail: data.email };
  
    if (data.locationPreferences.some((loc: { locationName: LocationType; tutorEmail: string; }) => loc.locationName === location)) {
    const updatedLocationPreferences = data.locationPreferences.filter((loc: { locationName: LocationType; tutorEmail: string; }) => loc.locationName !== location);
    setData({ ...data, locationPreferences: updatedLocationPreferences });
    } else {
    const updatedLocationPreferences = [...data.locationPreferences, locationObject];
    setData({ ...data, locationPreferences: updatedLocationPreferences });
    }
  };
  
  return (
    <div style={{ width: '80%', margin: 'auto' }}>
      <div style={{ marginBottom: '15vh' }}>
        <Typography variant="h6">Select your location preferences!</Typography>
        <Divider />
        <TableContainer>
        <Table stickyHeader>
          <TableHead>
          <TableRow>
            <TableCell>Location</TableCell>
            <TableCell>Preferred</TableCell>
          </TableRow>
          </TableHead>
          <TableBody>
          {locationOptions.map((location, index) => (
            <TableRow key={index}>
            <TableCell>{location}</TableCell>
            <TableCell>
            <Checkbox
              checked={data.locationPreferences.some((loc: { locationName: LocationType; tutorEmail: string; }) => loc.locationName === location)}
              onChange={() => locationChange(location)}
            />
            </TableCell>
            </TableRow>
          ))}
          </TableBody>
        </Table>
        </TableContainer>
      </div>
    </div>
  );

}
