# public-event-planner

Cloud-based planning software for public events

Copyright (C) 2017 Alistair Davidson <alistair.l.davidson@gmail.com>

TODO

Single-line summary widgets
    act
    application
    contact

acts, applications -> acts-page, applications-page

Act
    Create / Edit page
        Bookings editor

        act-from-application
            Three columns: act, main contact, booking

            Radio: existing act (dropdown) or new act (create fields)
            Same for contact
            If merging with existing records, prompt for overwrites

    Detail view     
        single-page, single act, editable, will show timeline etc later
        add bookings, applications from here

Validation pass

modal edit with just an id

Solve issue where we don't always want to show selects in forms (eg, when creating a booking from an act, there is no need to allow the user to change act)

Solve issue with dates on viewmodels (possibly just a get createdDateAsDate ?) 

Surely consolidate stuff more, somehow

Do something so contact sort is by last name

Applications
    Detail view - card with all details, pops up from table 

Events management page - create and edit events
    this should be sort of a top level page... need to be able to come 'out' of an event

Give events users, allow sharing
Event list gets from user

unify lists
rework to material-style list

Event view
    Locations
    Calendar

Admin page
    Grid of users vs permissions

Booking status
    Colour, icon

Maybe some direct management of contacts

ep-table
    Page length option
    Focus search field when search button pressed
    Improve search styling
    Get select and delete working

Dashboard

Rider prices

Full tenants on acts and events

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

Todo dependencies, todo lists automatically advancing booking statuses

Connect to facebook, twitter, eventbrite...
    Fetch band follower numbers


Location
    Location types
        Venue
        Green room
        etc

Equipment
    Equipment types
    Equipment sources
    List of all equipment needed



--

Web sockets subscriptions on these services report changes on sub-objects too
    websocket/id
    websocket/list (if id = list...)
