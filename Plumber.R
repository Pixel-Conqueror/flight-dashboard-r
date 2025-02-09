# Installation conditionnelle des packages
if (!require("plumber")) install.packages("plumber")
if (!require("DBI")) install.packages("DBI")
if (!require("RMySQL")) install.packages("RMySQL")
if (!require("ggplot2")) install.packages("ggplot2")
if (!require("pool")) install.packages("pool")

# Charger les packages
library(plumber)
library(DBI)
library(RMySQL)
library(ggplot2)
library(pool)

options('plumber.port'=5555)

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

# --- Configuration des CORS ---
#* @filter enableCors
function(req, res) {
  res$setHeader("Access-Control-Allow-Origin", "http://localhost:5173")
  res$setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
  res$setHeader("Access-Control-Allow-Headers", "*")
  res$setHeader("Access-Control-Allow-Credentials", "true")

  if (req$REQUEST_METHOD == "OPTIONS") {
    res$status <- 204
    return()
  }
  plumber::forward()
}

# --- Endpoints de récupération de données ---
#* Retourne toutes les compagnies aériennes
#* @get /airlines
function() {
  query <- "SELECT * FROM compagnies"
  data <- dbGetQuery(db_pool, query)
  return(data)
}

#* Retourne les 100 derniers vols avec les métriques globales
#* @get /flights
function(month = NULL, code = NULL) {
  # Construction de la requête SQL
  query <- "SELECT * FROM vols"

  if (!is.null(month)) {
    query <- paste0(query, " WHERE mois = ", month)
  }

  if (!is.null(code)) {
    if (!is.null(month)) {
      query <- paste0(query, " AND code_compagnie = '", code, "'")
    } else {
      query <- paste0(query, " WHERE code_compagnie = '", code, "'")
    }
  }

  query <- paste0(query, " ORDER BY horodatage DESC LIMIT 100")

  flights <- dbGetQuery(db_pool, query)

  # Vérification des données
  if (nrow(flights) == 0) {
    return(list(metrics = list(total_flights = 0, average_delay = NA, delayed_flights_percentage = NA), flights = data.frame()))
  }

  # Requête pour les métriques
  metrics_query <- "
    SELECT
      COUNT(*) as total_flights,
      AVG(CASE WHEN retard_depart IS NOT NULL THEN retard_depart ELSE 0 END) as avg_delay,
      (COUNT(CASE WHEN retard_depart > 0 THEN 1 END) * 100.0 / COUNT(*)) as delayed_flights_percent
    FROM vols
  "

  if (!is.null(month)) {
    metrics_query <- paste0(metrics_query, " WHERE mois = ", month)
  }

  if (!is.null(code)) {
    if (!is.null(month)) {
      metrics_query <- paste0(metrics_query, " AND code_compagnie = '", code, "'")
    } else {
      metrics_query <- paste0(metrics_query, " WHERE code_compagnie = '", code, "'")
    }
  }

  metrics <- dbGetQuery(db_pool, metrics_query)

  # Formatage des résultats
  metrics_list <- list(
    total_flights = as.integer(metrics$total_flights),
    average_delay = round(as.numeric(metrics$avg_delay), 2),
    delayed_flights_percentage = round(as.numeric(metrics$delayed_flights_percent), 2)
  )

  return(list(metrics = metrics_list, flights = flights))
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
