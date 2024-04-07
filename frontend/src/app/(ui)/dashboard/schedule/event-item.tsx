'use client';


import * as React from 'react';

import { useSession } 
  from 'next-auth/react';

import AccessTimeIcon from '@mui/icons-material/AccessTime';
import EmailIcon from '@mui/icons-material/Email';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import DateRangeIcon from '@mui/icons-material/DateRange';
import DoNotDisturbIcon from '@mui/icons-material/DoNotDisturb';
import DoneIcon from '@mui/icons-material/Done';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import PersonPinCircleIcon from '@mui/icons-material/PersonPinCircle';
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
import { Box, Stack, Avatar, Typography, Button, Divider, Tooltip, Dialog, DialogContent }
  from '@mui/material';

import { toTitleCase, toPhoneNumber, toAppointmentTime, toAppointmentDateOnly, toAppointmentTimeOnly } 
  from '@/app/_lib/utils';
import { TableUpdate }
  from '@/app/_lib/data';

export default function EventItem(
  { appointment, event: [eventOpen, setEventOpen], refetch: [tutorRefetch, tuteeRefetch] }: 
  { appointment: Appointment | undefined, event: [boolean, Function], refetch: [Function, Function] }
){
  const [startDate, endDate] = [new Date(appointment ? appointment.startDateTimeString : ""), new Date(appointment ? appointment.endDateTimeString : "")];
  
  const updateSchedule = TableUpdate("appointment/update");

  const handleConfirm = () => {
    appointment &&
    updateSchedule.mutate({
      appointment_id_old: appointment.appointmentId,
      is_confirmed_new: true,
    }, {
      onSuccess: () => {
        tutorRefetch(); tuteeRefetch();
        setEventOpen(false);
      }
    });
  };

  const handleCancel = () => {
    appointment &&
    updateSchedule.mutate({
      appointment_id_old: appointment.appointmentId,
      is_cancelled_new: true,
    }, {
      onSuccess: () => {
        tutorRefetch(); tuteeRefetch();
        setEventOpen(false);
      }
    });
  };

  const appointmentDateOnly = toAppointmentDateOnly(startDate, endDate);
  const appointmentTimeOnly = toAppointmentTimeOnly(startDate, endDate);
  const sessionEmail = useSession().data?.user?.email;
  const isCancelled = appointment?.isCancelled;
  const isConfirmed = appointment?.isConfirmed;
  const isPending = !appointment?.isCancelled && !appointment?.isConfirmed;

  var avatar = appointment?.tutorPictureUrl;
  var name = toTitleCase(`${appointment?.tutorFirstName} ${appointment?.tutorLastName}`);
  var email = appointment?.tutorEmail;
  var phone = toPhoneNumber(appointment?.tutorPhoneNumber.toString());
  var major = appointment?.tutorMajorAbbreviation.toUpperCase();
  var seniority = toTitleCase(appointment?.tutorSeniorityName);
  var target = "Your Tutor";

  if (sessionEmail === appointment?.tutorEmail) {
    avatar = appointment?.tuteePictureUrl;
    name = toTitleCase(`${appointment?.tuteeFirstName} ${appointment?.tuteeLastName}`);
    email = appointment?.tuteeEmail;
    phone = toPhoneNumber(appointment?.tuteePhoneNumber.toString());
    major = appointment?.tuteeMajorAbbreviation.toUpperCase();
    seniority = toTitleCase(appointment?.tuteeSeniorityName);
    target = "Your Tutee"
  }


  return (
    <Dialog 
      open={eventOpen} onClose={() => setEventOpen(false)}
      maxWidth="md" fullWidth
    >
      <DialogContent>

        <Stack direction="column" spacing={3}>

          {/* Tutor/Tutee Header */}
          <Stack direction="row" spacing={2} pb={1} borderBottom={1} borderColor="divider">
            <Avatar src={avatar} sx={{ width: 75, height: 75 }} />
            
            <Stack direction="column" justifyContent="center" alignItems="flex-start">
              <Typography variant="body2" color="text.secondary" borderBottom={1} borderColor="divider"> {target} </Typography>
              
              <Stack direction="row" spacing={2} alignItems="center" divider={ <Divider orientation="vertical" sx={{ height: '75%' }} /> }>
                <Typography variant="h4" fontWeight="bold"> {name} </Typography>
                <Typography variant="body1" color="text.secondary"> {major} </Typography>
                <Typography variant="body1" color="text.secondary"> {seniority} </Typography>
              </Stack>
            </Stack>
          </Stack>
          
          {/* Body */}
          <Stack direction="column" spacing={3}>
            <Stack direction="row" alignItems="center" justifyContent="space-between">
              <Stack direction="row" spacing={1} alignItems="center" width="55%">
              <PendingActionsIcon fontSize="large" />
              <Typography variant="h6"> 
                {
                  appointment?.isConfirmed ? "Confirmed!" : 
                  ( appointment?.isCancelled ? "Cancelled" : 
                    ( sessionEmail === appointment?.tutorEmail ? "Awaiting Your Decision . . ." :
                      "Awaiting Tutor's Decision . . ."
                    )
                  )
                } 
              </Typography>

              </Stack>

              <Stack direction="row" spacing={1} alignItems="center" width="45%">
              <PersonPinCircleIcon fontSize="large" />
              <Typography variant="h5"> {toTitleCase(appointment?.locationName)} </Typography>
              </Stack>
            </Stack>

            <Stack direction="row" alignItems="center" justifyContent="space-between">
              <Stack direction="row" spacing={1} alignItems="center" width="55%">
                <DateRangeIcon fontSize="large" />
                <Typography variant="h6"> {appointmentDateOnly} </Typography>
              </Stack>

              <Stack direction="row" spacing={1} alignItems="center" width="45%">
                <AccessTimeIcon fontSize="large" />
                <Typography variant="h6"> {appointmentTimeOnly} </Typography>
              </Stack>
            </Stack>

            <Stack direction="row" justifyContent="space-between">
              <Stack direction="row" spacing={1} alignItems="center" width="55%">
                <EmailIcon fontSize="large" />
                <Tooltip title={email} placement="top-start" arrow slotProps={{ popper: { modifiers: [ { name: 'offset', options: { offset: [0, -14], } } ] } }}>
                  <Typography variant="h6" noWrap> {email} </Typography>
                </Tooltip>
              </Stack>

              <Stack direction="row" spacing={1} alignItems="center" width="45%">
                <PhoneIphoneIcon fontSize="large" />
                <Typography variant="h6"> {phone} </Typography>
              </Stack>
            </Stack>

            <Stack direction="row" spacing={1} alignItems="center">
              <FormatAlignLeftIcon fontSize="large" />

              { appointment?.tuteeRequestComment ?
              <Typography variant="h6"> {appointment?.tuteeRequestComment} </Typography>
              :
              <Typography variant="body1" color="text.secondary"> Tutee left no additional request details . . . </Typography>
              }
            </Stack>
          </Stack>
          
          
          {/* Button Row */}
          <Stack direction="row" justifyContent="space-between" pt={1} borderTop={1} borderColor="divider">
            { !isConfirmed && (sessionEmail === appointment?.tutorEmail) && 
            <Button variant="contained" color="success" startIcon={ <DoneIcon /> } onClick={handleConfirm}> Accept Request </Button> 
            }

            { !isCancelled && 
            <Button variant="contained" color="error" startIcon={ <DoNotDisturbIcon /> } onClick={handleCancel}> 
              { (sessionEmail === appointment?.tutorEmail) ? 
                (isConfirmed ? "Cancel Appointment" : "Deny Request") : 
                (isConfirmed ? "Cancel Appointment" : "Delete Request") 
              } 
            </Button> 
            }
          </Stack>

        </Stack>

      </DialogContent>
    </Dialog>
  );
}
