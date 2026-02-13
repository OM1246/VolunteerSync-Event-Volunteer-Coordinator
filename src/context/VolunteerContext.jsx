import React, { createContext, useContext, useEffect, useState } from 'react';

const VolunteerContext = createContext();

const STORAGE_KEYS = {
    EVENTS: 'vs_events',
    VOLUNTEERS: 'vs_volunteers',
    NOTIFICATIONS: 'vs_notifications'
};

export const VolunteerProvider = ({ children }) => {
    const [events, setEvents] = useState([]);
    const [volunteers, setVolunteers] = useState([]);
    const [notifications, setNotifications] = useState([]);

    // Initialize Data
    useEffect(() => {
        const loadData = () => {
            const storedEvents = JSON.parse(localStorage.getItem(STORAGE_KEYS.EVENTS)) || [];
            const storedVolunteers = JSON.parse(localStorage.getItem(STORAGE_KEYS.VOLUNTEERS)) || [];
            const storedNotifs = JSON.parse(localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS)) || [];

            if (storedEvents.length === 0) {
                // Seed if empty
                const seedEvents = [
                    { id: 'e1', title: 'Beach Cleanup Drive', description: 'Removing plastic waste from the coastline.', date: '2023-11-15', location: 'Santa Monica Pier', maxVolunteers: 50, status: 'active' },
                    { id: 'e2', title: 'Food Bank Coding', description: 'Helping local food bank organize their inventory system.', date: '2023-11-20', location: 'Downtown Community Center', maxVolunteers: 10, status: 'active' },
                    { id: 'e3', title: 'Tree Planting Marathon', description: 'Aiming to plant 500 trees in one day.', date: '2023-10-05', location: 'Greenwood Park', maxVolunteers: 100, status: 'completed' }
                ];
                setEvents(seedEvents);
                localStorage.setItem(STORAGE_KEYS.EVENTS, JSON.stringify(seedEvents));
            } else {
                setEvents(storedEvents);
            }

            if (storedVolunteers.length === 0 && storedEvents.length === 0) {
                 const seedVols = [
                    { id: 'v1', eventId: 'e1', name: 'John Doe', email: 'john@example.com', phone: '555-0101', status: 'present' },
                    { id: 'v2', eventId: 'e1', name: 'Jane Smith', email: 'jane@example.com', phone: '555-0102', status: 'registered' }
                ];
                setVolunteers(seedVols);
                localStorage.setItem(STORAGE_KEYS.VOLUNTEERS, JSON.stringify(seedVols));
            } else {
                setVolunteers(storedVolunteers);
            }
            
            setNotifications(storedNotifs);
        };
        loadData();
    }, []);

    // Actions
    const addEvent = (event) => {
        const newEvents = [...events, { ...event, id: '_' + Math.random().toString(36).substr(2, 9), status: 'active' }];
        setEvents(newEvents);
        localStorage.setItem(STORAGE_KEYS.EVENTS, JSON.stringify(newEvents));
    };

    const updateEventStatus = (id, status) => {
        const newEvents = events.map(e => e.id === id ? { ...e, status } : e);
        setEvents(newEvents);
        localStorage.setItem(STORAGE_KEYS.EVENTS, JSON.stringify(newEvents));
    };

    const registerVolunteer = (volunteer) => {
        if (volunteers.some(v => v.eventId === volunteer.eventId && v.email === volunteer.email)) {
            throw new Error('Email already registered for this event');
        }
        const newVols = [...volunteers, { ...volunteer, id: '_' + Math.random().toString(36).substr(2, 9), status: 'registered' }];
        setVolunteers(newVols);
        localStorage.setItem(STORAGE_KEYS.VOLUNTEERS, JSON.stringify(newVols));
    };

    const updateVolunteerStatus = (id, status) => {
        const newVols = volunteers.map(v => v.id === id ? { ...v, status } : v);
        setVolunteers(newVols);
        localStorage.setItem(STORAGE_KEYS.VOLUNTEERS, JSON.stringify(newVols));
    };

    const addNotification = (message) => {
        const newNotifs = [...notifications, { id: '_' + Math.random().toString(36).substr(2, 9), message, date: new Date().toISOString() }];
        setNotifications(newNotifs);
        localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(newNotifs));
    };

    return (
        <VolunteerContext.Provider value={{
            events, volunteers, notifications,
            addEvent, updateEventStatus, registerVolunteer, updateVolunteerStatus, addNotification
        }}>
            {children}
        </VolunteerContext.Provider>
    );
};

export const useVolunteer = () => useContext(VolunteerContext);
