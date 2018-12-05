CREATE TABLE IF NOT EXISTS Users(
	ID serial NOT NULL,
	Username varchar(32) NOT NULL,
	Email varchar(55) NOT NULL,
	Password varchar(255) NOT NULL,
	Funds int NOT NULL,
	PRIMARY KEY(ID)
);


CREATE TABLE IF NOT EXISTS GroupTable(

	ID serial NOT NULL,
	Name varchar(55) NOT NULL,
	Description varchar(255),
	Password varchar(255),
	GroupOwner varchar(32) NOT NULL,
	Poll varchar(255) NOT NULL,
	Option1 varchar(32) NOT NULL,
	Option2 varchar(32) NOT NULL,
	betsOn1 int NOT NULL,
	betsOn2 int NOT NULL,
	pollStatus varchar(32) NOT NULL,

	PRIMARY KEY(ID)
);

CREATE TABLE IF NOT EXISTS UserGroup(
	UserID int,
	GroupID int,

	foreign key(UserID) references Users(ID),
	foreign key(GroupID) references GroupTable(ID)

);

