create table room (
    room_id serial primary key,
    name varchar(100) not null,
    icon varchar(50) not null
);

create table device (
    device_id serial primary key,
    name varchar(100) not null,
    icon varchar(50) not null,
    state integer default 0,
    room_id integer,
    foreign key (room_id) references room (room_id)
);

create table scene (
    scene_id serial primary key,
    name varchar(100) not null,
    state integer default 0,
    in_progress integer default 0
);

create table task (
    task_id serial primary key,
    active integer default 0,
    action integer not null,
    timer integer not null default 0,
    task_order integer,
    device_id integer,
    scene_id integer,
    foreign key (device_id) references device (device_id),
    foreign key (scene_id) references scene (scene_id),
    unique (scene_id, task_order)
);
