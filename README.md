# ThinkEat

https://thinkeat.fly.dev/

Le but du projet ThinkEat est d’avoir des idées de repas et de simplifier le choix de ces repas. L’application vise à offrir une solution personnalisée en s'appuyant sur les préférences individuelles des utilisateurs. L'objectif principal est de présenter une liste restreinte de suggestions de repas adaptées à chaque utilisateur, en prenant en compte divers critères tels que les préférences alimentaires, le temps de préparation, la faim, les ingrédients ou les régimes alimentaires.

![Home page](/HomeMarkDown.png "Page d'acceuil.")

Les utilisateurs peuvent occuper trois rôles différents : visiteur, utilisateur standard et administrateur; chacun avec des niveaux d'accès et des fonctionnalités spécifiques. 

L’application est codée en full JS avec React coté front et Node.js/Express coté back. C’est avec Fly.io que je la déploie, et que j'héberge la base de donnée postgreSQL.

Le monorepo est scindé en deux dossiers pour séparer la logique client et server. En back-end le codage des composants est effectué dans des classes où l’on retrouve, dans les enfants de celle-ci, les entités de la base de données. Ces classes se trouvent dans les sous-dossiers de **[back/src]** (routers, controllers, datamaper, validator).  

Côté front-end, l’organisation des dossiers se base principalement sur les routes fronts. Le routeur qui les recense se trouve dans le fichier main.jsx **[front/src/main.jsx]**. Fichier dans lequel se distinguent les composants front principaux, accompagnés de loaders et actions propres à React.
Le détails du code de ces composants se retrouve principalement dans les sous-dossiers **[front/src/components/Layout]** et **[front/src/components/Roots]**. Les appels API se font dans le fichier api.js **[front/src/api.js]** par une classe mère Core Api.
