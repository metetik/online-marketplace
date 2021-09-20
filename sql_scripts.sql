create schema online_marketplace;

use online_marketplace;

drop table if exists `product`;
drop table if exists `role`;
drop table if exists `seller`;
drop table if exists `user`;
drop table if exists `user_black_list`;
drop table if exists `user_favorite_list`;
drop table if exists `user_roles`;

create table `product` (
	`id` integer not null auto_increment,
	`name` varchar(255),
	`seller_id` integer,
	primary key (`id`)
) engine=InnoDB;
create table `role` (
	`id` integer not null auto_increment,
	`name` varchar(255),
	primary key (`id`)
) engine=InnoDB;
create table `seller` (
	`id` integer not null auto_increment,
	`name` varchar(255),
	primary key (`id`)
) engine=InnoDB;
create table `user` (
	`id` integer not null auto_increment,
	`password` varchar(120),
	`username` varchar(20),
	primary key (`id`)
) engine=InnoDB;
create table `user_black_list` (
	`user_id` integer not null,
	`black_list_id` integer not null
) engine=InnoDB;
create table `user_favorite_list` (
	`user_id` integer not null,
	`favorite_list_id` integer not null
) engine=InnoDB;
create table `user_roles` (
	`user_id` integer not null,
	`role_id` integer not null,
	primary key (`user_id`, `role_id`)
) engine=InnoDB;
alter table `product`
	add constraint `FK608brpktjy9oai14lh34qqmj8`
	foreign key (`seller_id`)
	references `seller` (`id`);
alter table `user_black_list`
	add constraint `FKdqso0lmsynmgc8ovbt3b3x1ie`
	foreign key (`black_list_id`)
	references `seller` (`id`);
alter table `user_black_list`
	add constraint `FKd1asbjfwepng4e09xs1rlvqdo`
	foreign key (`user_id`)
	references `user` (`id`);
alter table `user_favorite_list`
	add constraint `FKlqxe7t2uw03r8ys9h5fyqeuhd`
	foreign key (`favorite_list_id`)
	references `product` (`id`);
alter table `user_favorite_list`
	add constraint `FKc2aihw3hf385dom73mm9wyd06`
	foreign key (`user_id`)
	references `user` (`id`);
alter table `user_roles`
	add constraint `FKlhhbknkqrbbja7jt6ao2vluhx`
	foreign key (`role_id`)
	references `role` (`id`);
alter table `user_roles`
	add constraint `FK40cm955hgg5oxf1oax8mqw0c4`
	foreign key (`user_id`)
	references `user` (`id`);

insert into role(name) values ('ROLE_USER');
insert into role(name) values ('ROLE_ADMIN');

insert into user (id, password, username) values (1, '$2a$10$o4YUxGtyGoYe.IzABumL..JC/Y44iLS5/T.iqyyMeef/KyM.XrPD.', 'user');
insert into user (id, password, username) values (2, '$2a$10$tnT4kSuGG1KxCkwVwGKX/us53PAVZMggVele5wP1wm9cWvZJtVrPW', 'admin');

INSERT INTO user_roles (user_id, role_id) VALUES (1, 1);
INSERT INTO user_roles (user_id, role_id) VALUES (2, 2);

INSERT INTO seller (name) VALUES ('seller0');
INSERT INTO seller (name) VALUES ('seller1');
INSERT INTO seller (name) VALUES ('seller2');
INSERT INTO seller (name) VALUES ('seller3');
INSERT INTO seller (name) VALUES ('seller4');
INSERT INTO seller (name) VALUES ('seller5');

-- https://www.kaggle.com/ylchang/coffee-shop-sample-data-1113

INSERT INTO product (name,seller_id) VALUES ('Brazilian - Organic', 1);
INSERT INTO product (name,seller_id) VALUES ('Our Old Time Diner Blend', 3);
INSERT INTO product (name,seller_id) VALUES ('Espresso Roast', 4);
INSERT INTO product (name,seller_id) VALUES ('Primo Espresso Roast', 5);
INSERT INTO product (name,seller_id) VALUES ('Columbian Medium Roast', 4);
INSERT INTO product (name,seller_id) VALUES ('Ethiopia', 3);
INSERT INTO product (name,seller_id) VALUES ('Jamacian Coffee River', 1);
INSERT INTO product (name,seller_id) VALUES ('Civet Cat', 4);
INSERT INTO product (name,seller_id) VALUES ('Organic Decaf Blend', 2);
INSERT INTO product (name,seller_id) VALUES ('Guatemalan Sustainably Grown', 5);
INSERT INTO product (name,seller_id) VALUES ('Lemon Grass', 6);
INSERT INTO product (name,seller_id) VALUES ('Peppermint', 6);
INSERT INTO product (name,seller_id) VALUES ('English Breakfast', 4);
INSERT INTO product (name,seller_id) VALUES ('Earl Grey', 6);
INSERT INTO product (name,seller_id) VALUES ('Serenity Green Tea', 1);
INSERT INTO product (name,seller_id) VALUES ('Traditional Blend Chai', 1);
INSERT INTO product (name,seller_id) VALUES ('Morning Sunrise Chai', 6);
INSERT INTO product (name,seller_id) VALUES ('Spicy Eye Opener Chai', 6);
INSERT INTO product (name,seller_id) VALUES ('Dark chocolate', 2);
INSERT INTO product (name,seller_id) VALUES ('Sustainably Grown Organic', 6);
INSERT INTO product (name,seller_id) VALUES ('Chili Mayan', 3);
INSERT INTO product (name,seller_id) VALUES ('Our Old Time Diner Blend Sm', 4);
INSERT INTO product (name,seller_id) VALUES ('Our Old Time Diner Blend Rg', 2);
INSERT INTO product (name,seller_id) VALUES ('Our Old Time Diner Blend Lg', 1);
INSERT INTO product (name,seller_id) VALUES ('Brazilian Sm', 1);
INSERT INTO product (name,seller_id) VALUES ('Brazilian Rg', 3);
INSERT INTO product (name,seller_id) VALUES ('Brazilian Lg', 4);
INSERT INTO product (name,seller_id) VALUES ('Columbian Medium Roast Sm', 4);
INSERT INTO product (name,seller_id) VALUES ('Columbian Medium Roast Rg', 6);
INSERT INTO product (name,seller_id) VALUES ('Columbian Medium Roast Lg', 3);
INSERT INTO product (name,seller_id) VALUES ('Ethiopia Sm', 4);
INSERT INTO product (name,seller_id) VALUES ('Ethiopia Rg', 2);
INSERT INTO product (name,seller_id) VALUES ('Ethiopia Lg', 1);
INSERT INTO product (name,seller_id) VALUES ('Jamaican Coffee River Sm', 2);
INSERT INTO product (name,seller_id) VALUES ('Jamaican Coffee River Rg', 1);
INSERT INTO product (name,seller_id) VALUES ('Jamaican Coffee River Lg', 2);
INSERT INTO product (name,seller_id) VALUES ('Espresso shot', 4);
INSERT INTO product (name,seller_id) VALUES ('Latte', 4);
INSERT INTO product (name,seller_id) VALUES ('Latte Rg', 3);
INSERT INTO product (name,seller_id) VALUES ('Cappuccino', 4);
INSERT INTO product (name,seller_id) VALUES ('Cappuccino Lg', 3);
INSERT INTO product (name,seller_id) VALUES ('Lemon Grass Rg', 4);
INSERT INTO product (name,seller_id) VALUES ('Lemon Grass Lg', 2);
INSERT INTO product (name,seller_id) VALUES ('Peppermint Rg', 3);
INSERT INTO product (name,seller_id) VALUES ('Peppermint Lg', 6);
INSERT INTO product (name,seller_id) VALUES ('Serenity Green Tea Rg', 1);
INSERT INTO product (name,seller_id) VALUES ('Serenity Green Tea Lg', 2);
INSERT INTO product (name,seller_id) VALUES ('English Breakfast Rg', 5);
INSERT INTO product (name,seller_id) VALUES ('English Breakfast Lg', 6);
INSERT INTO product (name,seller_id) VALUES ('Earl Grey Rg', 3);
INSERT INTO product (name,seller_id) VALUES ('Earl Grey Lg', 4);
INSERT INTO product (name,seller_id) VALUES ('Traditional Blend Chai Rg', 3);
INSERT INTO product (name,seller_id) VALUES ('Traditional Blend Chai Lg', 5);
INSERT INTO product (name,seller_id) VALUES ('Morning Sunrise Chai Rg', 6);
INSERT INTO product (name,seller_id) VALUES ('Morning Sunrise Chai Lg', 6);
INSERT INTO product (name,seller_id) VALUES ('Spicy Eye Opener Chai Rg', 2);
INSERT INTO product (name,seller_id) VALUES ('Spicy Eye Opener Chai Lg', 4);
INSERT INTO product (name,seller_id) VALUES ('Dark chocolate Rg', 6);
INSERT INTO product (name,seller_id) VALUES ('Dark chocolate Lg', 3);
INSERT INTO product (name,seller_id) VALUES ('Sustainably Grown Organic Rg', 4);
INSERT INTO product (name,seller_id) VALUES ('Sustainably Grown Organic Lg', 3);
INSERT INTO product (name,seller_id) VALUES ('Snow Day Hot Chocolate', 1);
INSERT INTO product (name,seller_id) VALUES ('Carmel syrup', 5);
INSERT INTO product (name,seller_id) VALUES ('Hazelnut syrup', 5);
INSERT INTO product (name,seller_id) VALUES ('Sugar Free Vanilla syrup', 1);
INSERT INTO product (name,seller_id) VALUES ('Pumpkin Spice Latte', 1);
INSERT INTO product (name,seller_id) VALUES ('Pumpkin Spice Latte Lg', 2);
INSERT INTO product (name,seller_id) VALUES ('Happy Holidays hot chocolate', 5);
INSERT INTO product (name,seller_id) VALUES ('Croissant', 2);
INSERT INTO product (name,seller_id) VALUES ('Cranberry Scone', 5);
INSERT INTO product (name,seller_id) VALUES ('Chocolate Croissant', 4);
INSERT INTO product (name,seller_id) VALUES ('Ginger Scone', 2);
INSERT INTO product (name,seller_id) VALUES ('Almond Croissant', 5);
INSERT INTO product (name,seller_id) VALUES ('Ginger Biscotti', 4);
INSERT INTO product (name,seller_id) VALUES ('Hazelnut Biscotti', 4);
INSERT INTO product (name,seller_id) VALUES ('Chocolate Chip Biscotti', 6);
INSERT INTO product (name,seller_id) VALUES ('Oatmeal Scone', 6);
INSERT INTO product (name,seller_id) VALUES ('Scottish Cream Scone ', 4);
INSERT INTO product (name,seller_id) VALUES ('Jumbo Savory Scone', 2);
INSERT INTO product (name,seller_id) VALUES ('I Need My Bean! Toque', 2);
INSERT INTO product (name,seller_id) VALUES ('I Need My Bean! T-shirt', 2);
INSERT INTO product (name,seller_id) VALUES ('I Need My Bean! Diner mug', 6);
INSERT INTO product (name,seller_id) VALUES ('I Need My Bean! Latte cup', 6);
INSERT INTO product (name,seller_id) VALUES ('Chocolate syrup', 2);
INSERT INTO product (name,seller_id) VALUES ('Rio Nights', 6);
INSERT INTO product (name,seller_id) VALUES ('Ouro Brasileiro shot', 2);
INSERT INTO product (name,seller_id) VALUES ('Ouro Brasileiro shot promo', 2);
INSERT INTO product (name,seller_id) VALUES ('Ginger Scone promo', 2);