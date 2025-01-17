# Étape 1 : Construction de l'application Vite
FROM node:18 AS builder

# Définir le répertoire de travail dans le conteneur
WORKDIR /app

# Copier les fichiers nécessaires pour installer les dépendances
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier tous les fichiers du projet
COPY . .

# Construire l'application pour la production
RUN npm run build

# Étape 2 : Servir l'application avec Nginx
FROM nginx:alpine

# Copier les fichiers générés par Vite depuis l'étape de build
COPY --from=builder /app/dist /usr/share/nginx/html

# Copier un fichier de configuration Nginx pour gérer le routage (optionnel)
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# Exposer le port 80 pour l'accès HTTP
EXPOSE 80

# Démarrer Nginx
CMD ["nginx", "-g", "daemon off;"]
