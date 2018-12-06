CREATE TABLE IF NOT EXISTS Users(
	ID serial NOT NULL,
	Username varchar(32) NOT NULL,
	Email varchar(55) NOT NULL,
	Password varchar(255) NOT NULL,
	Funds int NOT NULL,
	PRIMARY KEY(ID)
);



CREATE TABLE IF NOT EXISTS Game(
	ID int NOT NULL UNIQUE,
	Home varchar(55),
	HomeScore int,
	Visitor varchar(55),
	VisitorScore int,
	StartDate DATE,
	DayOfWeek varchar(3),
	Status varchar(20),
	PRIMARY KEY(ID)

);

CREATE TABLE IF NOT EXISTS GroupTable(

	ID serial NOT NULL,
	Name varchar(55) NOT NULL,
	Description varchar(255),
	Password varchar(255),
	Max_Members int,
	PRIMARY KEY(ID)
);

CREATE TABLE IF NOT EXISTS UserGame(
	UserID int PRIMARY KEY,
	GameID int,
	foreign key(UserID)references Users(ID),
	foreign key(GameID)references Game(ID)

);

CREATE TABLE IF NOT EXISTS Bets(
	ID serial NOT NULL,
	UserID int,
	GameID int,
	GroupID int,
	Team varchar(20),
	Bet int,
	foreign key(UserID) references Users(ID),
	foreign key(GameID) references Game(ID),
	foreign key(GroupID) references GroupTable(ID),
	PRIMARY KEY(ID)
);


CREATE TABLE IF NOT EXISTS UserGroup(
	UserID int,
	GroupID int,

	foreign key(UserID) references Users(ID),
	foreign key(GroupID) references GroupTable(ID)

);

CREATE TABLE IF NOT EXISTS GroupGame(
	GroupID int PRIMARY KEY,
	GameID int,

	foreign key(GroupID) references GroupTable(ID),
	foreign key(GameID) references Game(ID)

);