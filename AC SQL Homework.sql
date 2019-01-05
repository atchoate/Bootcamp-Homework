use sakila;

select first_name, last_name from actor;

ALTER TABLE actor ADD COLUMN ActorName VARCHAR(100);

UPDATE actor SET ActorName = CONCAT(first_name, ' ', last_name);

select * from actor where first_name = "Joe";

select * from actor where last_name like "%GEN%";

select * from actor where last_name like "%LI%" order by last_name, first_name; 

select * from country limit 5;

select country_id, country from country
where country in ("Afghanistan", "Bangladesh", "China");

ALTER TABLE actor ADD COLUMN description BLOB;

ALTER TABLE actor DROP COLUMN description;

SELECT last_name, COUNT(*) as namecount from actor
GROUP BY last_name
ORDER BY namecount DESC;

SELECT last_name, COUNT(*) as namecount from actor
GROUP BY last_name HAVING namecount >= 2
ORDER BY namecount DESC;

select * from actor where first_name = "GROUCHO";

update actor set first_name = "HARPER" where actor_id = 172;

update actor set first_name = "GROUCHO" where first_name = "HARPER";

SHOW CREATE TABLE address;

select * from staff;

select staff.first_name,
staff.last_name,
address.address,
address.district,
address.city_id,
address.postal_code
from staff
inner join address
on staff.address_id = address.address_id;

select * from film;

select first_name, last_name, SUM(amount)
from staff
inner join payment
on staff.staff_id = payment.staff_id
group by payment.staff_id;

select * from payment;


select title, COUNT(actor_id)
from film
inner join film_actor
on film.film_id = film_actor.film_id
GROUP BY film_actor.film_id;

select * from inventory where film_id = 439;

select film.title, COUNT(inventory_id)
from film 
inner join inventory
on film.film_id = inventory.film_id
WHERE film.title = "HUNCHBACK IMPOSSIBLE";

select first_name, last_name, SUM(amount)
from customer
inner join payment 
on customer.customer_id = payment.customer_id
group by payment.customer_id
order by last_name;

select title from film
where language_id in
		(select language_id from language where name = "English")
AND (title like "K%") or (title like "Q%");

select first_name, last_name from actor
where actor_id in
	(select actor_id from film_actor 
    WHERE film_id in
		(select film_id from film
        where title = "ALONE TRIP"));

select * from city;

select first_name, last_name, email from customer
where address_id in
	(select city_id from address
    where city_id in city
		(select country_id from city
        where country = 20));


Error Code: 1054. Unknown column 'country_id' in 'IN/ALL/ANY subquery'


select title from film
where film_id in
	(select film_id from film_category
    WHERE category_id in
    (select category_id from film_category
    where category_id = 8));


select film.film_id, film.title, count(rental.inventory_id)
from inventory
inner join rental
on inventory.inventory_id = rental.inventory_id
inner join film
on film.film_id = inventory.film_id
group by inventory.film_id
order by count(rental.inventory_id) DESC;


select sum(amount) from payment where staff_id = 1;
select sum(amount) from payment where staff_id = 2;




