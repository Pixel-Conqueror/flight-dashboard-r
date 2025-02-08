install.packages("plumber")
install.packages("DBI")
install.packages("RMySQL")
install.packages("ggplot2")
install.packages("pool")

# Charger les packages
library(plumber)
library(DBI)
library(RMySQL)
library(ggplot2)
library(pool)

# --- Configuration du pool de connexions ---
db_pool <- dbPool(
  drv = RMySQL::MySQL(),
  dbname   = "pixelconqueror_flights",
  host     = "mysql-pixelconqueror.alwaysdata.net",
  port     = 3306,
  user     = "398352",
  password = "YjwZkyaKxCPp0lck"
)

#* @apiTitle API Flights Data

# --- Endpoints de récupération de données ---

#* Retourne toutes les compagnies aériennes
#* @get /airlines
function() {
  query <- "SELECT * FROM compagnies"
  data <- dbGetQuery(db_pool, query)
  return(data)
}

#* Retourne les 100 premiers vols
#* @get /flights
function() {
  query <- "SELECT * FROM vols LIMIT 100"
  data <- dbGetQuery(db_pool, query)
  return(data)
}

# --- Endpoints pour les graphiques ---

#* Retourne un graphique en PNG représentant le nombre de vols par compagnie
#* @get /graph/airlines
#* @png
function() {
  query <- "SELECT code_compagnie, COUNT(*) AS nb_flights FROM vols GROUP BY code_compagnie"
  df <- dbGetQuery(db_pool, query)
  
  p <- ggplot(df, aes(x = code_compagnie, y = nb_flights)) +
    geom_bar(stat = "identity", fill = "steelblue") +
    theme_minimal() +
    labs(title = "Nombre de vols par compagnie",
         x = "Code compagnie",
         y = "Nombre de vols")
  
  print(p)
}

#* Retourne un histogramme en PNG de la distribution des retards au départ
#* @get /graph/delay
#* @png
function() {
  query <- "SELECT retard_depart FROM vols WHERE retard_depart IS NOT NULL"
  df <- dbGetQuery(db_pool, query)
  
  p <- ggplot(df, aes(x = retard_depart)) +
    geom_histogram(bins = 30, fill = "tomato", color = "black") +
    theme_minimal() +
    labs(title = "Distribution des retards au départ",
         x = "Retard (minutes)",
         y = "Fréquence")
  
  print(p)
}

# Optionnel : Vous pouvez enregistrer un hook de shutdown dans votre instance plumber
# afin de fermer proprement le pool lorsque l'API s'arrête.
# Par exemple, si vous démarrez votre API avec :
#
# pr <- plumb("Plumber.R")
# pr$registerShutdownHandler(function(){
#   poolClose(db_pool)
# })
# pr$run(host = "0.0.0.0", port = 8000)
#
# Cela fermera le pool à l'arrêt du serveur sans le fermer prématurément.
