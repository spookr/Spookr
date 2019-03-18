drop table if exists users;
drop table if exists user_photos;
drop table if exists ghosts;
drop table if exists ghost_type;
drop table if exists homeowner;
drop table if exists house;
drop table if exists house_photos;
drop table if exists year_built;
drop table if exists amenities;
drop table if exists swiped;
drop table if exists messages;

create table users(
    id serial primary key,
    username text unique not null,
    password text not null,
    ghost boolean not null
)

create table user_photos(
    id serial primary key,
    url text not null,
    user_id int references users(id)
)

-- need to figure this out sometime today
create table ghosts(
    id serial primary key,
    name text not null,
    bio text not null,
    gender boolean not null,
    type int references ghost_type(id),
    time int references time_period(id),
    user_id int references users(id),
    location text not null
)
-- this hasnt been inserted yet

create table time_period(
    id serial primary key,
    century text not null
)

create table ghost_type(
    id serial primary key,
    type text not null
)

create table homeowner(
    id serial primary key,
    first_name text not null,
    last_name text not null,
    user_id int references users(id)
)

-- location needs to be fixed
create table house(
    id serial primary key,
    header text not null,
    body text not null,
    rooms int not null,
    location text not null,
    remodeled boolean not null,
    year int references year_built(id),
    amenities references amenities(id),
    owner references homeowner(id),
    previously_haunted boolean not null,
    living_occupants int not null,
    pets boolean not null
)
-- fix this

create table house_photos(
    id serial primary key,
    url text not null,
    house_id int references house(id)
)
-- need to enter this in as well

create table year_built(
    id serial primary key,
    year text not null
)

create table amenities(
    id serial primary key,
    house_id references house(id),
    spiderwebs boolean not null,
    basement boolean not null,
    children boolean not null,
    grandfather_clock boolean not null,
    dolls boolean not null,
    electricity boolean not null,

)

create table swiped(
    id serial primary key,
    user_id references users(id),
    swiped_users references users(id),
    swiped boolean not null
)

create table messages(
    id serial primary key,
    sender int references users(id),
    receiver int references users(id),
    date text not null,
    body text not null 
)