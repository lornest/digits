provider "google" {
  project = var.gcp_project_id
  region  = var.gcp_region
}

resource "google_project_service" "cloudresourcemanager_api" {
  service = "cloudresourcemanager.googleapis.com"

  disable_on_destroy = true
}
