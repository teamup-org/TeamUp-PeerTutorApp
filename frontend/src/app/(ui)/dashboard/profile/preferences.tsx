import * as React from 'react';

import { Table, TableHead, TableBody, TableRow, TableContainer, TableCell, Checkbox}
    from '@mui/material'

import { scheduleToTimes }
    from '@/app/_lib/utils';

import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { EventInput }
    from '@fullcalendar/core/index.js';

import type { DateSelectArg, EventClickArg } 
    from '@fullcalendar/core/index.js';
    

export function CoursePreferences (props: any) {
    const {data, setData, setTranscript} = props;
  
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
  
      if (files && files.length > 0) {
        const file = files[0];
        setTranscript(file);
      } else {
        setTranscript("");
      }
    };
  
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
      <div >
          <TableContainer sx={{ maxHeight: '75vh' }}>
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
          <div style={{ marginBottom: '5vh', marginTop: '5vh' }}>
            <form id="uploadForm">
              <div>
                <label>Upload your most current transcript: </label>
                <input type="file" accept=".pdf" onChange={handleFileChange} required/>
              </div>
            </form>
          </div>
          </div>
    );
  
}

export function LocationPreferences (props: any) {

    const { data, setData } = props;
    
    const locationOptions: LocationType[] = [
      "in-person on-campus",
      "in-person off-campus",
      "online"
    ];
  
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
      <div style={{ marginBottom: '2vh' }}>
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
                      checked={data.locationPreferences.some((loc: { locationName: LocationType; email: string; }) => loc.locationName === location)}
                      onChange={() => locationChange(location)}
                    />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
    );
  
}

export function TimePreferences (props: any) {
    const { data, setData, setTimeUpdate } = props;
  
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
  
      setTimeUpdate(true);
  
    };
  
    // Callback function after releasing click on date selection
    const handleDateSelect = (event: DateSelectArg) => {
      scheduleRef.current?.getApi().addEvent(event);
      scheduleRef.current?.getApi().unselect();
    };
  
    // Callback function after clicking event
    const handleEventClick = (info: EventClickArg) => {
      if (selectedEvent) selectedEvent.el.style.outline = "";
      info.el.style.outline = "2px solid black";
      selectedEvent = info;
    };
  
    return (
      <FullCalendar
        ref={scheduleRef}
        plugins={[ interactionPlugin, dayGridPlugin, timeGridPlugin ]}
        events={events}
  
        initialView="timeGridWeek"
        height="70vh"
        headerToolbar={{
          left: 'deleteTime',
          right: 'submitTimes',
        }}
        dayHeaderFormat={{ weekday: 'long' }}
        customButtons={{
          deleteTime: {
            text: 'Remove Selected Time',
            click: handleEventRemove,
          },
          submitTimes: {
            text: 'Submit Time Preferences',
            click: handleEventSubmit,
          }
        }}
  
        allDaySlot={false} slotDuration="00:15:00" slotLabelInterval="01:00"
        unselectAuto={false} editable selectable selectMirror selectOverlap={false} eventOverlap={false}
        eventClick={handleEventClick} select={handleDateSelect}
      />
    );
}