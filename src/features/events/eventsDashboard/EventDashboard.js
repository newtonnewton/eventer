import React from 'react';
import {Grid} from 'semantic-ui-react';
import EventList from './EventList';
import {useSelector} from 'react-redux';

export default function EventDashboard() {
    const {events} = useSelector(state => state.event);

    // function handleDeleteEvent(eventId){
    //     setEvents(events.filter(evt => evt.id !== eventId));
    // }

    return (
        <Grid>
            <Grid.Column width={10}>
                <EventList events={events} />
            </Grid.Column>
            <Grid.Column width={6}>
                {/* {formOpen && 
                <EventForm 
                setFormOpen={setFormOpen} 
                setEvents = {setEvents} 
                createEvent={handleCreateEvent} 
                selectedEvent = {selectedEvent}
                updateEvent = {handleUpdateEvent}
                key = {selectedEvent ? selectedEvent.id : null}
                /> } */}
                <h2>Event Filters</h2>
            </Grid.Column>
        </Grid>
    )
}