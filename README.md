# public-event-planner

Cloud-based planning software for public events

Copyright (C) 2017 Alistair Davidson <alistair.l.davidson@gmail.com>

TODO

Application editor
Turn into generic editor with template import
Mobile menu
Tables and edit on mobile
Applications should have a coancetated search field so we don't find json prop names

Build application management
    Build contact menu
    new application (also supplies sample form for use in websites)
    application to booking, act, and contact. Act and contact may already exist...



Services
    Act
        get
        updateOrCreate        
        delete
        
        getMainContact

        getContacts
        addContact
        removeContact

        getBookings
        addBookings
        removeBookings

        getApplications
        addApplications
        removeApplications

        getTimeslots
        

    ContactService
        get        
        updateOrCreate
        delete
        
        getActs
        addActs
        removeActs

    EventService
        get        
        updateOrCreate
        delete
        
        getLocations
        addLocations
        removeLocations

        getBookings
        addBookings
        removeBookings

        getTimeslots
        addTimeslots
        removeTimeslots

Web sockets subscriptions on these services report changes on sub-objects too
    websocket/id
    websocket/list (if id = list...)




Handle errors in auth better, redirect to /

application form should name event with hidden field
