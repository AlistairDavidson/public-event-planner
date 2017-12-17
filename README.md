# public-event-planner

In VERY early development. Do not use!

Cloud-based planning software for public events. Project deploys to Heroku. 

Copyright (C) 2017 Alistair Davidson <alistair.l.davidson@gmail.com>
Licensed under GNU Affero General Public License Version 3, see LICENSE file

TODO

bookings
    list widget show real information
    use Act tech specs only if none against booking,
    add bio to booking, same rules as tech specs
        ...use placeholders

stationery for contacts

consolidate act-contact and contact forms
    possibly put search in a modal

Save etc buttons on act editor title

auto-saves in edit widgets

At this point should be able to do end-to-end act editing

booking statuses fully featured - colours, icons

ep-list remove proper dialogue text


Single-line summary widgets - content for md-list
    act
    act-contact
    application
    contact
        pulls things from contact details
        first in list in summary
    booking
        act-booking and event-booking
    contact detail

    popup contact detail view


create ep-form, ep-modal

Applications, acts, events ep-lists

loading bar
toasts, fired from services on save or error

validation, accessibility pass

Act
    act-from-application
        Radio: existing act (dropdown) or new act (create fields)
        Same for contact
        If merging with existing records, prompt for overwrites - this becomes a generic merge form / set of merge forms - possible ep-merge...

    Detail view 
        single-page, single act, editable, will show timeline etc later
        add bookings, applications from here


search over existing answers for the likes of band type

Solve issue with dates on viewmodels (set createdDate -> also sets createdDateAsDate)
    ... global hydration solution?
        ... mobx-state-tree?

Surely consolidate code more, somehow - esp front page



Applications
    Detail view - card with all details, pops up from table 

Dashboard / Events management page - create and edit events
    this should be sort of a top level page... need to be able to come 'out' of an event
    automatically create a 'main stage' and other such blank stationery

Event view
    Locations
    Calendar

Admin page
    Grid of users vs permissions

Booking status
    Colour, icon
Proper login page, no signup page, password reset / invite email

Maybe some direct management of contacts

ep-table
    Page length option
    Focus search field when search button pressed
    Improve search styling
    Get select and delete working

Dashboard

Rider prices

Full tenants on acts and events

-- MINOR THINGS I DEFERRED

act-contact editor
    type into search box -> press create button to add item with that name    
    ensure primary contact is working correctly

Contact editor
    prepopulate one of each contact detail type
    address layout fix when - is present

image edit - show image somehow?

contact detail lists    
    facebook and twitter icons - really ought to be sent regexes from server, reading from /plugins/contact-urls

-- LATER

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

-- LATER STILL

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

    Trello integration?

Comments
    On acts, contacts, events, bookings...

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

Connect to facebook, twitter, eventbrite, youtube...
    Fetch band follower numbers
    Fetch profile pictures into images list when url first added
    Sync up ticket information if possible - primarily for band tickets, maybe show a sales graph
    Plugin system?

Location
    Location types
        Venue
        Green room
        etc

Equipment
    Equipment types
    Equipment sources
    List of all equipment needed

-- MAYBE

Web sockets subscriptions on these services report changes on sub-objects too
    websocket/id
    websocket/list (if id = list...)

Switch from Sequelize to Objection.js