-- CREATE TABLE 'ad' (
-- 'id' INTEGER PRIMARY KEY AUTOINCREMENT,
-- 'title' VARCHAR(100) NOT NULL,
-- 'description' TEXT,
-- 'owner' VARCHAR(100) NOT NULL,
-- 'price' INT,
-- 'picture' VARCHAR(100),
-- 'location' VARCHAR(100),
-- 'createdAt' DATE,
-- 'category_id' INTEGER,
-- FOREIGN KEY (category_id) REFERENCES 'category'
-- );


-- INSERT INTO ad (title, description, owner, price, picture, location, createdAt, categoryId)
-- VALUES
-- ('Appartement moderne à Bordeaux', 'Bel appartement de 2 chambres avec vue sur la Garonne.', 'Marie Dupont', 250000, 'www.photo.fr', 'Bordeaux', '2023-09-20', 1),
-- ('Statuette en céramique', 'Statuette en céramique faite à la main, représentant une figure abstraite.', 'Lucie Dupont', 28, 'www.photo.fr', 'Lyon', '2023-09-01', 2),
-- ('Miroir vintage', 'Miroir vintage en bois sculpté, parfait pour ajouter du charme à votre entrée.', 'Alexandre Martin', 37, 'www.photo.fr', 'Paris', '2023-09-01', 3),
-- ('Cadre photo en argent', 'Cadre photo en argent massif avec un design élégant, idéal pour encadrer vos souvenirs.', 'Sophie Lambert', 22, 'www.photo.fr', 'Bordeaux', '2023-09-01', 1),
-- ('Sculpture en métal moderne', 'Sculpture en métal moderne qui servira de pièce maîtresse dans votre salon.', 'Marie Robert', 33, 'www.photo.fr', 'Lyon', '2023-09-01', 3),
-- ('Couverture tricotée à la main', 'Couverture douillette tricotée à la main avec des motifs géométriques.', 'Antoine Durand', 40, 'www.photo.fr', 'Paris', '2023-09-01', 2);


-- SELECT * FROM ad;

-- SELECT * FROM ad WHERE location = 'Bordeaux';

-- DELETE FROM ad WHERE price > 40;

-- UPDATE ad SET price = 0 WHERE createdAt = '2023-09-01';

-- SELECT AVG(price) FROM ad WHERE location = 'Paris';

-- SELECT location, AVG(price) FROM ad GROUP BY location;

-- DROP TABLE tag;

-- CREATE TABLE 'category' (
--     'id' INTEGER PRIMARY KEY AUTOINCREMENT,
--     'name' VARCHAR(100) NOT NULL
-- );

-- INSERT INTO category (title)
-- VALUES ('vêtement'), ('voiture'), ('autre'), ('meuble'), ('immobilier'), ('multimédia');

-- SELECT * FROM ad;

-- pragma table_info('ad');

-- SELECT * FROM ad;
-- SELECT * FROM category;

-- Afficher les annonces de la catégorie “vêtement”

-- SELECT * FROM ad AS a
-- INNER JOIN category AS c
-- ON a.categoryId = c.id
-- WHERE c.title LIKE 'vêtement';

-- Afficher les annonces des catégories “vêtement” et “voiture”

-- SELECT * FROM ad AS a
-- INNER JOIN category AS c
-- ON a.category_id = c.id
-- WHERE c.name = 'vêtement' 
-- OR c.name = 'voiture';

-- Afficher le prix moyen des annonces de la catégorie “autre”

-- SELECT AVG(price) AS average price FROM ad AS a
-- INNER JOIN category AS c
-- ON a.category_id = c.id
-- WHERE c.name = 'autre';

-- Afficher les annonces des catégories dont le nom commence par un “v”

-- SELECT * FROM ad AS a
-- INNER JOIN category AS c
-- ON a.category_id = c.id
-- WHERE c.name LIKE 'v%';

-- INSERT INTO tag (name)
-- VALUES ('femme'), ('homme'), ('enfant'), ('neuf'), ('occasion');

-- SELECT * FROM tag;


--   // const ads = [
--   //   {
--   //     imgUrl: "/images/table.webp",
--   //     link: "/ads/table",
--   //     price: 120,
--   //     title: "Table",
--   //   },
--   //   {
--   //     imgUrl: "/images/dame-jeanne.webp",
--   //     link: "/ads/dame-jeanne",
--   //     price: 75,
--   //     title: "Dame-jeanne",
--   //   },
--   //   {
--   //     imgUrl: "/images/vide-poche.webp",
--   //     link: "/ads/vide-poche",
--   //     price: 4,
--   //     title: "Vide-poche",
--   //   },
--   //   {
--   //     imgUrl: "/images/vaisselier.webp",
--   //     link: "/ads/vaisselier",
--   //     price: 900,
--   //     title: "Vaisselier",
--   //   },
--   //   {
--   //     imgUrl: "/images/bougie.webp",
--   //     link: "/ads/bougie",
--   //     price: 8,
--   //     title: "Bougie",
--   //   },
--   //   {
--   //     imgUrl: "/images/porte-magazine.webp",
--   //     link: "/ads/porte-magazine",
--   //     price: 45,
--   //     title: "Porte-magazine",
--   //   },
--   // ];

-- INSERT INTO ad (picture, description, price, title, owner, location, createdAt)
-- VALUES
--     ('/images/table.webp', '/ads/table', 120, 'Table', 'Marie Dupont', 'Bordeaux', '2023-09-20'),
--     ('/images/dame-jeanne.webp', '/ads/dame-jeanne', 75, 'Dame-jeanne', 'Lucie Dupont', 'Lyon', '2023-09-01'),
--     ('/images/vide-poche.webp', '/ads/vide-poche', 4, 'Vide-poche', 'Alexandre Martin', 'Paris', '2023-09-01'),
--     ('/images/vaisselier.webp', '/ads/vaisselier', 900, 'Vaisselier', 'Sophie Lambert', 'Bordeaux', '2023-09-01'),
--     ('/images/bougie.webp', '/ads/bougie', 8, 'Bougie', 'Marie Robert', 'Lyon', '2023-09-01'),
--     ('/images/porte-magazine.webp', '/ads/porte-magazine', 45, 'Porte-magazine', 'Antoine Durand', 'Paris', '2023-09-01');


INSERT INTO category (title) VALUES ('Ameublement');
INSERT INTO category (title) VALUES ('Électroménager');
INSERT INTO category (title) VALUES ('Photographie');
INSERT INTO category (title) VALUES ('Informatique');
INSERT INTO category (title) VALUES ('Téléphonie');
INSERT INTO category (title) VALUES ('Vélos');
INSERT INTO category (title) VALUES ('Véhicules');
INSERT INTO category (title) VALUES ('Sport');
INSERT INTO category (title) VALUES ('Habillement');
INSERT INTO category (title) VALUES ('Bébé');
INSERT INTO category (title) VALUES ('Outillage');
INSERT INTO category (title) VALUES ('Services');
INSERT INTO category (title) VALUES ('Vacances');