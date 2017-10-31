# public-event-planner

In VERY early development. Do not use!

Cloud-based planning software for public events. Project deploys to Heroku. 

Copyright (C) 2017 Alistair Davidson <alistair.l.davidson@gmail.com>
Licensed under GNU Affero General Public License Version 3, see LICENSE file

TODO

act-contact editor
    type into search box -> press create button to add item with that name
    edit/create button shows contact form 
    possibly seperate edit and create buttons?
    possibly move fab to bottom of card?

Contact editor
    prepopulate one of each contact detail type
    address layout fix when - is present

create ep-form, ep-modal

loading bar
image edit - show image somehow?

move all lists to ep-list

contact detail lists    
    facebook and twitter icons - really ought to be sent regexes from server, reading from /plugins/contact-urls
    
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


validation, accessibility pass

hook up remaining code

Upgrade booking form to new style

Act
    Upgrade act form
    act-from-application
        Three columns: act, main contact, booking

        Radio: existing act (dropdown) or new act (create fields)
        Same for contact
        If merging with existing records, prompt for overwrites - this becomes a generic merge form / set of merge forms - possible ep-merge...

    Detail view 
        single-page, single act, editable, will show timeline etc later
        add bookings, applications from here

tech specs - when creating booking, use Act tech specs only if none against booking, checkbox
bio onto booking, same rules as tech specs


async/await?

search over existing answers for the likes of band type

Solve issue with dates on viewmodels (set createdDate -> also sets createdDateAsDate) 

Surely consolidate code more, somehow - esp front page

Do something so contact sort is by last name

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