provider "google" {
  project = "digits-397616"
  region  = "europe-west1"
}

resource "google_cloud_run_v2_service" "digits-server-test" {
  name     = "digits-server-test"
  location = "europe-west1"
  ingress  = "INGRESS_TRAFFIC_ALL"

  template {
    containers {
      image = "us-docker.pkg.dev/cloudrun/container/hello"
    }
  }
}
