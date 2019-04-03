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

select * from users;
select * from user_photos;
select * from ghosts;
select * from ghost_type;
select * from homeowner;
select * from house;
select * from house_photos;
select * from year_built;
select * from amenities;
select * from swiped;
select * from messages;

create table users (
    id serial primary key,
    username text unique not null,
    password text not null,
    ghost boolean not null
)

create table user_photos (
    id serial primary key,
    url text not null,
    user_id int references users(id)
)

create table ghosts (
    id serial primary key,
    name text not null,
    bio text not null,
    type int references ghost_type(id),
    user_id int references users(id),
    profile_pic TEXT NOT NULL,
    latitude numeric,
    longitude numeric
)

create table ghost_type (
    id serial primary key,
    type text not null
)

create table homeowner (
    id serial primary key,
    first_name text not null,
    last_name text not null,
    bio text not null,
    user_id int references users(id)
    profile_pic text not null
)

create table house (
    id serial primary key,
    header text not null,
    body text not null,
    rooms int not null,
    remodeled boolean not null,
    owner int references homeowner(id),
    latitude numeric,
    longitude numeric
)

create table house_photos (
    id serial primary key,
    url text not null,
    house_id int references house(id)
)

create table year_built (
    id serial primary key,
    year text not null
)

create table amenities (
    id serial primary key,
    spiderwebs boolean not null,
    basement boolean not null,
    grandfather_clock boolean not null,
    dolls boolean not null,
    electricity boolean not null,
    house_id integer
)

create table swiped (
    id serial primary key,
    user_id references users(id),
    swiped_users references users(id),
    swiped boolean not null
)

create table messages (
    id serial primary key,
    sender int references users(id),
    receiver int references users(id),
    date text not null,
    body text not null
)

-- selects all homeowners, houses, and whether they were swiped on
SELECT * FROM homeowner
inner join users on users.id = homeowner.user_id
inner join house on homeowner.id = house.owner
left JOIN swiped on users.id = swiped.user_id;

create table matches (
    id serial primary key,
    swipping_user int references users(id),
    matched_user int references users(id)
)


-- DATA ON LOCATIONS
select Round(point(house.latitude, house.longitude)<@>point(ghosts.latitude, ghosts.longitude)) as distance
FROM house, ghosts
WHERE house.id = id AND ghosts.id = id


-- ONE OF THESE IS MORE ACCURATE THAN THE OTHER. STILL WORKING IT OUT
select earth_distance(ll_to_earth(34.0522, 118.2437), ll_to_earth(40.7608,111.8910))
