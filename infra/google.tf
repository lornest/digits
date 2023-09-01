provider "google" {
  project = "digits-397616"
  region  = "europe-west2"
}

resource "google_project_service" "run_api" {
  service = "run.googleapis.com"

  disable_on_destroy = true
}

# resource "google_project_service" "cloudresourcemanager_api" {
#   service = "cloudresourcemanager.googleapis.com"
#
#   disable_on_destroy = true
# }
#
resource "google_cloud_run_v2_service" "digits-server-test" {
  name     = "digits-server-test"
  location = "europe-west1"
  ingress  = "INGRESS_TRAFFIC_ALL"

  template {
    containers {
      image = "us-docker.pkg.dev/cloudrun/container/hello"
    }
  }

  depends_on = [google_project_service.run_api]
}

resource "google_cloud_run_service_iam_member" "run_all_users" {
  service  = google_cloud_run_v2_service.digits-server-test.name
  location = google_cloud_run_v2_service.digits-server-test.location
  role     = "roles/run.invoker"
  member   = "allUsers"
}

