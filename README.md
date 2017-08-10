# public-event-planner

Cloud-based planning software for public events

Copyright (C) 2017 Alistair Davidson <alistair.l.davidson@gmail.com>

TODO

Acts section pages
    Bookings
        Table
        Create / Edit popup        
        Detail view
    Act
        Summary
        Table
        Create / Edit popup
        Detail view

Application to booking, act, and contact.
    Popup thingy like create
        Radio: existing act (dropdown) or new act (create fields)
        Same for contact
        If merging with existing records, prompt for overwrites

Applications
    Detail view - card with all details, pops up from table 

Events management page - create and edit events
    this should be sort of a top level page... need to be able to come 'out' of an event

Event view
    Locations
    Calendar

Admin page
    Grid of users vs permissions

Maybe some direct management of contacts

ep-table
    Page length option
    Focus search field when search button pressed
    Get select and delete working

Dashboard

User claims on events

--

csv import / export

file attachments

Version tracking
    Apply PaperTrail
        Get user stored in the right place
        Revisions / log interface
        Restore revision option

Full text search (application search is currently wrong)

Email sending
Document generation

--

Todos
    Todo
        Done
        Removed
        Type
        TodoTypeId
        Deadline
    TodoType
        List
        Text
        Optional
        TodoListId
        UserId
    TodoList
        Name
        Optional

Comments

Booking
    Fee negotiation sequence
        Rider + tickets are forms of payment
    Budget
    Numeric advertising priority
    Invoice status

Act
    Tour party - list of names and roles (JSON)
    Can each have a different type of ticket

Todo views

Connect to facebook, twitter, eventbrite...
    Fetch band follower numbers


--

Web sockets subscriptions on these services report changes on sub-objects too
    websocket/id
    websocket/list (if id = list...)
