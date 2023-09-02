resource "google_project_service" "firestore" {
  project = google_project.project.project_id
  service = "firestore.googleapis.com"
  
  disable_on_destroy = true
}

resource "google_firestore_database" "digits-database" {
  name                        = "digits-database"
  location_id                 = var.gcp_region
  type                        = "FIRESTORE_NATIVE"
  concurrency_mode            = "OPTIMISTIC"
  app_engine_integration_mode = "DISABLED"

  depends_on = [google_project_service.firestore]
}
