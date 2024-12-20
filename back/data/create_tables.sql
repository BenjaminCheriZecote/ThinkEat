BEGIN;


DROP FUNCTION IF EXISTS
  create_user(json), find_user(), find_user(int), update_user(json), delete_user(int),
  create_user_key(json), find_user_key(json), delete_user_key(json),
  find_history(int), create_history(json), delete_history(int),
  find_recipe_to_history(), find_recipe_to_history(int), add_recipe_to_history(json), update_recipe_to_history(json), remove_recipe_to_history(json),
  create_family(json), find_family(), find_family(int), update_family(json), delete_family(int),
  create_recipe(json), find_recipe(), find_recipe(int), find_recipe(json), update_recipe(json), delete_recipe(int),
  add_ingredient_to_recipe(json), update_ingredient_to_recipe(json), remove_ingredient_to_recipe(json), add_recipe_to_user(json), remove_recipe_to_user(json), find_recipe_to_user(json), get_recipe_to_user(int),
  create_unit(json), find_unit(), find_unit(INT), update_unit(json), delete_unit(json),
  create_ingredient(json), find_ingredient(), find_ingredient(int), update_ingredient(json), delete_ingredient(int),
  add_family_to_ingredient(json), find_family_to_ingredient(), remove_family_to_ingredient(json),
  evaluate_proposal(int) CASCADE;

DROP VIEW IF EXISTS short_family_view, extends_ingredient, extends_recipe CASCADE;

DROP TYPE IF EXISTS short_user, history_with_recipe, short_history, short_family, short_recype, short_unit, short_ingredient,
  short_ingredient_has_family, short_ingredient_to_recipe, short_user_has_recipe, short_history_has_recipe CASCADE;

DROP TABLE IF EXISTS "user", "user_key", "history", "history_has_recipe",
"family", "recipe", "ingredient", "unit", "ingredient_has_family", "recipe_has_ingredient", "user_has_recipe" CASCADE;

--  ---------------------------------------- Family table -------------------------------------------------------

CREATE TABLE IF NOT EXISTS "family" (
  "id" int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "name" TEXT NOT NULL UNIQUE,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "updated_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "delete_at" TIMESTAMPTZ
);

--  ---------------------------------------- Family view -------------------------------------------------------

CREATE VIEW short_family_view("id", "name") AS
  SELECT "id","name" FROM "family"
  WHERE "delete_at" IS NULL
  ORDER BY "name" ASC;


--  ---------------------------------------- Family type -------------------------------------------------------

CREATE TYPE short_family AS (
	"id" int,
  "name" text
);

--  ---------------------------------------- Family function -------------------------------------------------------

CREATE FUNCTION create_family(json) RETURNS "short_family" AS $$
  INSERT INTO "family"
  ("name") VALUES (($1->>'name')::TEXT)
  RETURNING "id","name"
$$ LANGUAGE SQL;

CREATE FUNCTION find_family() RETURNS SETOF "short_family" AS $$
  SELECT "id","name" FROM "short_family_view"
$$ LANGUAGE SQL;

CREATE FUNCTION find_family(INT) RETURNS SETOF "short_family" AS $$
  SELECT "id","name" FROM "short_family_view"
  WHERE "id" = $1
$$ LANGUAGE SQL;

CREATE FUNCTION update_family(json) RETURNS "short_family" AS $$
  UPDATE "family" SET (
    "name",
    "updated_at"
  ) = (
    COALESCE(($1->>'name')::TEXT, "name"),
    now()
  )
  WHERE "id" = ($1->>'id')::INT
  RETURNING "id","name"
$$ LANGUAGE SQL;

CREATE FUNCTION delete_family(INT) RETURNS "short_family" AS $$
  UPDATE "family" SET "delete_at"= now()
  WHERE "id" = $1
  AND "delete_at" IS NULL
	RETURNING "id","name"
$$ LANGUAGE SQL;


--  ---------------------------------------- Unit table ------------------------------------------------------

CREATE TABLE IF NOT EXISTS "unit" (
  "id" int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "name" TEXT NOT NULL UNIQUE,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "updated_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "delete_at" TIMESTAMPTZ
);

--  ---------------------------------------- Family type -------------------------------------------------------

CREATE TYPE short_unit AS (
	"id" int,
  "name" text
);

--  ---------------------------------------- Unit function ------------------------------------------------------

CREATE FUNCTION create_unit(json) RETURNS "short_unit" AS $$
	INSERT INTO "unit" ("name")	VALUES (($1->>'name')::text)
	RETURNING "id","name"
$$ LANGUAGE sql;

CREATE FUNCTION find_unit() RETURNS SETOF "short_unit" AS $$
  SELECT "id","name" FROM "unit"
  WHERE "delete_at" IS NULL
$$ LANGUAGE SQL;

CREATE FUNCTION find_unit(INT) RETURNS SETOF "short_unit" AS $$
  SELECT "id","name" FROM "unit"
  WHERE "id" = $1
  AND "delete_at" IS NULL
$$ LANGUAGE SQL;

CREATE FUNCTION update_unit(json) RETURNS "short_unit" AS $$
	UPDATE "unit" SET (
    "name",
    "updated_at"
  ) = (
    ($1->>'name')::text,
    now()
  )
  WHERE "id" = ($1->>'id')::int
  AND "delete_at" IS NULL
	RETURNING "id","name"
$$ LANGUAGE sql;

CREATE FUNCTION delete_unit(json) RETURNS "short_unit" AS $$
	UPDATE "unit" SET "delete_at" = now()
  WHERE "id" = ($1->>'id')::int
  AND "delete_at" IS NULL
	RETURNING "id","name"
$$ LANGUAGE sql;

--  ---------------------------------------- Ingredient table ------------------------------------------------------

CREATE TABLE IF NOT EXISTS "ingredient" (
  "id" int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "name" TEXT NOT NULL UNIQUE,
  "image" TEXT,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "updated_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "delete_at" TIMESTAMPTZ
);



CREATE TABLE IF NOT EXISTS "ingredient_has_family" (
  "id" int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "ingredient_id" int REFERENCES "ingredient"("id") NOT NULL,
  "family_id" int REFERENCES "family"("id") NOT NULL,
  UNIQUE("ingredient_id","family_id")
);


--  ---------------------------------------- Ingredient view ------------------------------------------------------

CREATE VIEW extends_ingredient("id", "name", "image", "families") AS
WITH ingredient_families AS (
  SELECT
    ihf.ingredient_id,
    COALESCE(JSON_AGG(f.*) FILTER (WHERE f.* IS NOT NULL), '[]') AS families_json
  FROM
    ingredient_has_family ihf
    JOIN short_family_view f ON ihf.family_id = f.id
  GROUP BY
    ihf.ingredient_id
)
SELECT
  i.id,
  i.name,
  i.image,
  COALESCE(f.families_json, '[]') AS families
FROM
  ingredient i
  LEFT JOIN ingredient_families f ON i.id = f.ingredient_id
WHERE
  i.delete_at IS NULL
ORDER BY
  i.name;

--  ---------------------------------------- Ingredient type ------------------------------------------------------

CREATE TYPE short_ingredient AS (
	"id" int,
  "name" text,
  "image" text
);

CREATE TYPE short_ingredient_has_family AS (
	"id" int,
  "ingredientId" int,
  "familyId" int
);

--  ---------------------------------------- Ingredient function ------------------------------------------------------


CREATE FUNCTION create_ingredient(json) RETURNS "short_ingredient" AS $$
	INSERT INTO "ingredient" (
	  "name",
  	"image"
	)
	VALUES (
  	($1->>'name')::text,
    ($1->>'image')::text
	)
	RETURNING "id", "name", "image"
$$ LANGUAGE sql;

CREATE FUNCTION find_ingredient() RETURNS SETOF "extends_ingredient" AS $$
	SELECT * FROM "extends_ingredient"
  ORDER BY name
$$ LANGUAGE sql;

CREATE FUNCTION find_ingredient(int) RETURNS SETOF "extends_ingredient" AS $$
	SELECT * FROM "extends_ingredient"
  WHERE "id"=$1
$$ LANGUAGE sql;

CREATE FUNCTION update_ingredient(json) RETURNS "short_ingredient" AS $$
	UPDATE "ingredient" SET (
	  "name",
  	"image",
    "updated_at"
	)
	= (
  	COALESCE(($1->>'name')::text, "name"),
    COALESCE(($1->>'image')::text, "image"),
    now()
	)
  WHERE "id" = ($1->>'id')::int
  AND "delete_at" IS NULL
	RETURNING "id", "name", "image"	
$$ LANGUAGE sql;

CREATE FUNCTION delete_ingredient(int) RETURNS "short_ingredient" AS $$
	UPDATE "ingredient" SET "delete_at"	= now()
  WHERE "id" = $1
  AND "delete_at" IS NULL
	RETURNING "id", "name", "image"		
$$ LANGUAGE sql;

CREATE FUNCTION add_family_to_ingredient(json) RETURNS "ingredient_has_family" AS $$
	INSERT INTO "ingredient_has_family" (
	  "ingredient_id",
  	"family_id"
	)
	VALUES (
  	($1->>'ingredientId')::int,
    ($1->>'familyId')::int
	)
	RETURNING "id", "ingredient_id", "family_id"		
$$ LANGUAGE sql;

CREATE FUNCTION find_family_to_ingredient() RETURNS SETOF "short_ingredient_has_family" AS $$
	SELECT "id", "ingredient_id", "family_id" FROM "ingredient_has_family"	
$$ LANGUAGE sql;

CREATE FUNCTION remove_family_to_ingredient(json) RETURNS "ingredient_has_family" AS $$
	DELETE FROM "ingredient_has_family"
  WHERE "ingredient_id" = ($1->>'ingredientId')::int
  AND "family_id" = ($1->>'familyId')::int
	RETURNING *	
$$ LANGUAGE sql;



--  ---------------------------------------- User tables -------------------------------------------------------
CREATE TABLE IF NOT EXISTS "user"(
  "id" int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "name" text NOT NULL,
  "email" text NOT NULL,
  "password" text NOT NULL,
  "active" boolean NOT NULL DEFAULT false,
  "is_admin" boolean NOT NULL DEFAULT false,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
  "updated_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
  "delete_at" TIMESTAMPTZ
);

CREATE TABLE IF NOT EXISTS "user_key"(
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  "type" text NOT NULL,
  "user_id" int REFERENCES "user"("id") NOT NULL,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
  "updated_at" TIMESTAMPTZ NOT NULL DEFAULT now()
);


--  ---------------------------------------- User Type -------------------------------------------------------

CREATE TYPE short_user AS (
	"id" int,
  "name" text,
  "email" text,
  "password" text,
  "active" boolean,
  "isAdmin" boolean
);

CREATE FUNCTION create_user(json) RETURNS "short_user" AS $$
	INSERT INTO "user" (
	  "name",
  	"email",
  	"password"
	)
	VALUES (
  	($1->>'name')::text,
    ($1->>'email')::text,
	  ($1->>'password')::text
	)
	RETURNING "id", "name", "email", "password", "active", "is_admin"
$$ LANGUAGE sql;

CREATE FUNCTION find_user() RETURNS SETOF "short_user" AS $$
	SELECT "id", "name", "email", "password", "active", "is_admin" FROM "user"
  WHERE "delete_at" IS NULL
$$ LANGUAGE sql;

CREATE FUNCTION find_user(int) RETURNS SETOF "short_user" AS $$
	SELECT "id", "name", "email", "password", "active", "is_admin" FROM "user"
  WHERE "id"=$1
  AND "delete_at" IS NULL
$$ LANGUAGE sql;

CREATE FUNCTION update_user(json) RETURNS "short_user" AS $$
	UPDATE "user" SET (
	  "name",
  	"email",
  	"password",
    "active",
    "updated_at"
	)
	= (
  	COALESCE(($1->>'name')::text, "name"),
    COALESCE(($1->>'email')::text, "email"),
	  COALESCE(($1->>'password')::text, "password"),
	  COALESCE(($1->>'active')::boolean, "active"),
    now()
	)
  WHERE "id" = ($1->>'id')::int
  AND "delete_at" IS NULL
	RETURNING "id", "name", "email", "password", "active", "is_admin" 	
$$ LANGUAGE sql;

CREATE FUNCTION delete_user(int) RETURNS "short_user" AS $$
	UPDATE "user" SET "delete_at"	= now()
  WHERE "id" = $1
  AND "delete_at" IS NULL
	RETURNING "id", "name", "email", "password", "active", "is_admin" 		
$$ LANGUAGE sql;

CREATE FUNCTION create_user_key(json) RETURNS "user_key" AS $$
	INSERT INTO "user_key" (
	  "type",
  	"user_id"
	)
	VALUES (
  	($1->>'type')::text,
    ($1->>'user_id')::int
	)
	RETURNING * 	
$$ LANGUAGE sql;

CREATE FUNCTION find_user_key(json) RETURNS "user_key" AS $$
	SELECT * FROM "user_key"
  WHERE "id"=($1->>'id')::uuid
$$ LANGUAGE sql;

CREATE FUNCTION delete_user_key(json) RETURNS "user_key" AS $$
  DELETE FROM "user_key"
  WHERE "id"=($1->>'id')::uuid
  RETURNING *
$$ LANGUAGE sql;


--  ---------------------------------------- Recipe table -------------------------------------------------------


CREATE TABLE IF NOT EXISTS "recipe"(
  "id" int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "name" TEXT NOT NULL,
  "image" TEXT,
  "steps" TEXT[] NOT NULL,
  "hunger" TEXT NOT NULL DEFAULT 'normal',
  "time" INTERVAL NOT NULL,
  "preparating_time" INTERVAL NOT NULL,
  "person" int NOT NULL,
  "diet" TEXT[] DEFAULT NULL,
  "user_id" INT REFERENCES "user"(id),
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
  "updated_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
  "delete_at" TIMESTAMPTZ,
  UNIQUE("user_id","name")
);

-- CREATE TABLE IF NOT EXISTS "recipe"(
--   "id" int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
--   "name" VARCHAR(50) NOT NULL,
--   "image" VARCHAR(20),
--   "steps" VARCHAR(100)[] NOT NULL,
--   "hunger" VARCHAR(10) NOT NULL DEFAULT 'normal',
--   "time" INTERVAL NOT NULL,
--   "preparating_time" INTERVAL NOT NULL,
--   "person" int NOT NULL,
--   "user_id" INT REFERENCES "user"(id),
--   "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
--   "updated_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
--   "delete_at" TIMESTAMPTZ,
--   UNIQUE("user_id","name")
-- );

CREATE TABLE IF NOT EXISTS "recipe_has_ingredient" (
  "id" int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "quantity" NUMERIC,
  "unit_id" int REFERENCES "unit"("id"),
  "recipe_id" int REFERENCES "recipe"("id") NOT NULL,
  "ingredient_id" int REFERENCES "ingredient"("id") NOT NULL,
  UNIQUE("recipe_id","ingredient_id")
);

CREATE TABLE IF NOT EXISTS "user_has_recipe" (
  "id" int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "user_id" int REFERENCES "user"("id") NOT NULL,
  "recipe_id" int REFERENCES "recipe"("id") NOT NULL
);

--  ---------------------------------------- Recipe view ------------------------------------------------------

CREATE VIEW extends_recipe("id", "name", "image", "steps", "hunger", "time", "preparatingTime", "cookingTime", "person", "diet", "userId", "ingredients") AS
WITH ingredients AS (
  SELECT
    rhi.recipe_id,
    JSON_AGG(JSON_BUILD_OBJECT(
      'id', i.id,
      'name', i.name,
      'image', i.image,
      'quantity', rhi.quantity,
      'unit', u.name,
      'families', i.families
    )) AS ingredient_json
  FROM
    recipe_has_ingredient rhi
    JOIN extends_ingredient i ON rhi.ingredient_id = i.id
    LEFT JOIN unit u ON rhi.unit_id = u.id
  GROUP BY
    rhi.recipe_id
)
SELECT
  r.id,
  r.name,
  r.image,
  r.steps,
  r.hunger,
  TO_CHAR(r.time, 'HH24:MI:SS'),
  TO_CHAR(r.preparating_time, 'HH24:MI:SS'),
  TO_CHAR((r.time - r.preparating_time), 'HH24:MI:SS'),
  r.person,
  r.diet,
  r.user_id,
  ingredients.ingredient_json
FROM
  recipe r
  LEFT JOIN ingredients ON r.id = ingredients.recipe_id
WHERE
  r.delete_at IS NULL
ORDER BY
  r.name ASC;

--  ---------------------------------------- Recipe Type -------------------------------------------------------

CREATE TYPE short_recype AS (
	"id" int,
  "name" text,
  "image" TEXT,
  "steps" TEXT[],
  "hunger" TEXT,
  "time" INTERVAL,
  "preparatingTime" INTERVAL,
  "cookingTime" INTERVAL,
  "person" int,
  "diet" TEXT[],
  "userId" int
);

CREATE TYPE short_ingredient_to_recipe AS (
	"id" int,
  "quantity" int,
  "unitId" int,
  "recipeId" int,
  "ingredientId" int
);

CREATE TYPE short_user_has_recipe AS (
  "userId" int,
  "recipeId" int
);

--  ---------------------------------------- Recipe Function -------------------------------------------------------

CREATE FUNCTION create_recipe(json) RETURNS "short_recype" AS $$
  INSERT INTO "recipe" (
    "name",
    "image",
    "hunger",
    "steps",
    "time",
    "preparating_time",
    "person",
    "diet",
    "user_id"
  )
  VALUES (
    ($1->>'name')::text,
    ($1->>'image')::text,
    ($1->>'hunger')::text,
    ARRAY(SELECT json_array_elements_text($1->'steps')),
    ($1->>'time')::INTERVAL,
    ($1->>'preparatingTime')::INTERVAL,
    ($1->>'person')::int,
    ARRAY(SELECT json_array_elements_text($1->'diet')),
    ($1->>'userId')::int
  )
  RETURNING "id","name","image","steps","hunger","time","preparating_time",("time"-"preparating_time") AS "cooking_time","person", "diet","user_id"
$$ LANGUAGE sql;

CREATE FUNCTION find_recipe() RETURNS SETOF "extends_recipe" AS $$
  SELECT *
  FROM extends_recipe
  WHERE "userId" IS NULL
$$ LANGUAGE sql;

CREATE FUNCTION find_recipe(json) RETURNS SETOF "extends_recipe" AS $$
  SELECT *
  FROM extends_recipe
  WHERE "userId" IS NULL
  OR "userId" = ($1->>'id')::int
$$ LANGUAGE sql;

CREATE FUNCTION find_recipe(int) RETURNS SETOF "extends_recipe" AS $$
  SELECT *
  FROM extends_recipe
  WHERE "id"=$1
$$ LANGUAGE sql;

CREATE FUNCTION update_recipe(json) RETURNS "short_recype" AS $$
  UPDATE "recipe" SET (
    "name",
    "image",
    "hunger",
    "steps",
    "time",
    "preparating_time",
    "person",
    "diet",
    "updated_at"
  )
  = (
    COALESCE(($1->>'name')::text, "name"),
    COALESCE(($1->>'image')::text, "image"),
    COALESCE(($1->>'hunger')::text, "hunger"),
    ARRAY(SELECT json_array_elements_text($1->'steps')),
    COALESCE(($1->>'time')::INTERVAL, "time"),
    COALESCE(($1->>'preparatingTime')::INTERVAL, "preparating_time"),
    COALESCE(($1->>'person')::int, "person"),
    ARRAY(SELECT json_array_elements_text($1->'diet')),
    now()
  )
  WHERE "id" = ($1->>'id')::int
  AND "delete_at" IS NULL
  RETURNING "id","name","image","steps","hunger","time","preparating_time",("time"-"preparating_time") AS "cooking_time","person","diet","user_id"   
$$ LANGUAGE sql;

CREATE FUNCTION delete_recipe(int) RETURNS "short_recype" AS $$
  UPDATE "recipe" SET "delete_at" = now()
  WHERE id = $1
  AND delete_at IS NULL
  RETURNING "id","name","image","steps","hunger","time","preparating_time",("time"-"preparating_time") AS "cooking_time","person","diet","user_id"       
$$ LANGUAGE sql;

CREATE FUNCTION add_ingredient_to_recipe(json) RETURNS "recipe_has_ingredient" AS $$
	INSERT INTO "recipe_has_ingredient" (
    "quantity",
    "unit_id",
    "recipe_id",
    "ingredient_id"
	)
	VALUES (
    ($1->>'quantity')::NUMERIC,
    ($1->>'unitId')::int,
    ($1->>'recipeId')::int,
  	($1->>'ingredientId')::int
	)
	RETURNING *	
$$ LANGUAGE sql;

CREATE FUNCTION find_ingredient_to_recipe() RETURNS SETOF "short_ingredient_to_recipe" AS $$
  SELECT * FROM "recipe_has_ingredient"
$$ LANGUAGE sql;

CREATE FUNCTION update_ingredient_to_recipe(json) RETURNS "recipe_has_ingredient" AS $$
  UPDATE "recipe_has_ingredient" SET (
    "quantity",
    "unit_id"
  )
  = (
    COALESCE(($1->>'quantity')::NUMERIC, "quantity"),
    COALESCE(($1->>'unitId')::int, "unit_id")
  )
  WHERE "recipe_id" = ($1->>'recipeId')::int
  AND "ingredient_id" = ($1->>'ingredientId')::int
  RETURNING * 
$$ LANGUAGE sql;

CREATE FUNCTION remove_ingredient_to_recipe(json) RETURNS "recipe_has_ingredient" AS $$
	DELETE FROM "recipe_has_ingredient"
  WHERE "recipe_id" = ($1->>'recipeId')::int
  AND "ingredient_id" = ($1->>'ingredientId')::int
	RETURNING *	
$$ LANGUAGE sql;

CREATE FUNCTION add_recipe_to_user(json) RETURNS SETOF "short_user_has_recipe" AS $$
	INSERT INTO "user_has_recipe" (
    "user_id",
    "recipe_id"
	)
	VALUES (
    ($1->>'userId')::int,
    ($1->>'recipeId')::int
	)
	RETURNING 
	    "user_id" AS "userId", 
	    "recipe_id" AS "recipeId";
$$ LANGUAGE sql;

CREATE FUNCTION remove_recipe_to_user(json) RETURNS "user_has_recipe" AS $$
	DELETE FROM "user_has_recipe"
  WHERE "user_id" = ($1->>'userId')::int
  AND "recipe_id" = ($1->>'recipeId')::int
	RETURNING *
$$ LANGUAGE sql;

CREATE FUNCTION find_recipe_to_user(json) RETURNS "short_user_has_recipe" AS $$
  SELECT 
    "user_id" AS "userId",
    "recipe_id" AS "recipeId"
  FROM "user_has_recipe"
  WHERE "user_id" = ($1->>'userId')::INT AND "recipe_id" = ($1->>'recipeId')::INT
$$ LANGUAGE sql;

CREATE FUNCTION get_recipe_to_user(int) RETURNS SETOF "extends_recipe" AS $$
  SELECT extends_recipe.id, extends_recipe.name, extends_recipe.image, extends_recipe.steps, extends_recipe.hunger, extends_recipe.time, extends_recipe."preparatingTime" AS "preparatingTime", extends_recipe."cookingTime", extends_recipe.person, extends_recipe.diet, extends_recipe."userId" AS "userId", extends_recipe.ingredients
  FROM "extends_recipe"
  JOIN "user_has_recipe" ON "extends_recipe".id = "user_has_recipe".recipe_id
  WHERE "user_has_recipe"."user_id" = $1;
$$ LANGUAGE sql;


--  ---------------------------------------- History table -------------------------------------------------------

CREATE TABLE IF NOT EXISTS "history"(
  "id" int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "user_id" int REFERENCES "user"("id") NOT NULL,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
  "updated_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
  "delete_at" TIMESTAMPTZ
);

CREATE TABLE IF NOT EXISTS "history_has_recipe"(
  "id"  int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "validate" boolean NOT NULL DEFAULT 'false',
  "history_id" int REFERENCES "history"("id") NOT NULL,
  "recipe_id" int REFERENCES "recipe"("id") NOT NULL
);

--  ---------------------------------------- History view -------------------------------------------------------

CREATE VIEW extends_history("id", "userId", "date", "recipes") AS
  SELECT "id","user_id","created_at",(
    SELECT COALESCE(json_agg(r.*) FILTER (WHERE r.id IS NOT NULL), '[]') FROM "extends_recipe" AS r
    WHERE r.id in (SELECT hhr."recipe_id" FROM "history_has_recipe" AS hhr WHERE hhr."id"=h."id")
  ) FROM "history" AS h
  WHERE "delete_at" IS NULL
  ORDER BY h."created_at" DESC;

--  ---------------------------------------- History type -------------------------------------------------------

CREATE TYPE history_with_recipe AS (
	"id" int,
  "userId" int,
  "date" TIMESTAMPTZ,
  "recipes" json
);

CREATE TYPE short_history AS (
	"id" int,
  "userId" int,
  "date" TIMESTAMPTZ
);

CREATE TYPE short_history_has_recipe AS (
	"id"  int,
  "validate" boolean,
  "historyId" int,
  "recipeId" int
);



--  ---------------------------------------- History function -------------------------------------------------------

CREATE FUNCTION find_history() RETURNS SETOF "extends_history" AS $$
  SELECT * FROM "extends_history"
$$ LANGUAGE SQL;

CREATE FUNCTION find_history(INT) RETURNS SETOF "extends_history" AS $$
  SELECT * FROM "extends_history"
  WHERE "id" = $1
$$ LANGUAGE SQL;

CREATE FUNCTION create_history(json) RETURNS "short_history" AS $$
	INSERT INTO "history"
  ("user_id") VALUES (($1->>'userId')::int)
	RETURNING "id","user_id","created_at"
$$ LANGUAGE sql;

CREATE FUNCTION delete_history(INT) RETURNS "short_history" AS $$
	UPDATE "history" SET "delete_at"= now()
  WHERE "id" = $1
  AND "delete_at" IS NULL
	RETURNING "id","user_id","created_at" 		
$$ LANGUAGE sql;


CREATE FUNCTION add_recipe_to_history(json) RETURNS "history_has_recipe" AS $$
	INSERT INTO "history_has_recipe"(
    "validate",
    "history_id",
    "recipe_id"
  ) VALUES (
    COALESCE(($1->>'validate')::boolean, false),
    ($1->>'historyId')::int,
    ($1->>'recipeId')::int
  )
	RETURNING *
$$ LANGUAGE sql;

CREATE FUNCTION find_recipe_to_history() RETURNS SETOF "short_history_has_recipe" AS $$
  SELECT * FROM "history_has_recipe"
$$ LANGUAGE SQL;

CREATE FUNCTION find_recipe_to_history(IN user_id INT) 
RETURNS TABLE (
  historyid INT,
  date TEXT,
  propositions JSONB
) AS $$
  SELECT 
    history.id AS "historyId",
    TO_CHAR(history.created_at, 'DD/MM/YYYY') AS date,
    jsonb_agg(
      jsonb_build_object(
        'id', recipe.id,
        'name', recipe.name,
        'image', recipe.image,
        'validate', history_has_recipe.validate,
        'userId', recipe.user_id
      )
    ) AS propositions
  FROM 
    history_has_recipe
  JOIN 
    history ON history_has_recipe.history_id = history.id
  JOIN 
    recipe ON history_has_recipe.recipe_id = recipe.id
  WHERE 
    history.user_id = $1 AND history.delete_at IS NULL
  GROUP BY 
    history.id, history.created_at
  ORDER BY 
    history.id;
$$ LANGUAGE SQL;

CREATE FUNCTION update_recipe_to_history(json) RETURNS "history_has_recipe" AS $$
	UPDATE "history_has_recipe" SET "validate" = ($1->>'validate')::boolean
  WHERE "history_id" = ($1->>'historyId')::int
  AND "recipe_id" = ($1->>'recipeId')::int
	RETURNING * 
$$ LANGUAGE sql;

CREATE FUNCTION remove_recipe_to_history(json) RETURNS "history_has_recipe" AS $$
	DELETE FROM "history_has_recipe"
  WHERE "history_id" = ($1->>'historyId')::int
  AND "recipe_id" = ($1->>'recipeId')::int
	RETURNING *
$$ LANGUAGE sql;

CREATE FUNCTION evaluate_proposal(int) RETURNS TABLE ("id" int, "name" text, "image" text, "history_note" int, "hunger" text, "time" text, "preparatingTime" text, "cookingTime" text, "ingredients" json) AS $$
  SELECT er."id", "name", "image",
  COALESCE((
    SELECT
    CASE
      WHEN "date" >= now() - INTERVAL '7 days' THEN 0
      WHEN "date" >= now() - INTERVAL '10 days' THEN 1
      WHEN "date" >= now() - INTERVAL '14 days' THEN 2
      WHEN "date" >= now() - INTERVAL '19 days' THEN 3
      WHEN "date" >= now() - INTERVAL '25 days' THEN 4
      WHEN "date" >= now() - INTERVAL '32 days' THEN 5
      WHEN "date" >= now() - INTERVAL '39 days' THEN 6
      WHEN "date" >= now() - INTERVAL '47 days' THEN 7
      WHEN "date" >= now() - INTERVAL '56 days' THEN 8
      WHEN "date" >= now() - INTERVAL '66 days' THEN 9
      ELSE 10
    END 
    FROM "extends_history" eh
	  JOIN "history_has_recipe" hhr ON eh."id" = hhr."history_id"
    WHERE "userId" = $1
	  AND hhr."recipe_id" = er."id"
    AND hhr."validate" = true
  ), 10) AS "history_note", "hunger", "time", "preparatingTime", "cookingTime", "ingredients"
  FROM "extends_recipe" er
$$ LANGUAGE sql;


COMMIT;
