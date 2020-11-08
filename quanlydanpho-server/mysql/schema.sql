drop database if exists qldp;

create database qldp;

grant all privileges on qldp.* to 'user'@'%' with grant option;
