provider "google" {
  project = "digits-397616"
  region  = "europe-west1"
}

resource "google_cloud_run_service" "digits-server" {
  name     = "digits-server"
  location = "europe-west1"

  template {
    spec {
      containers {
        image = "us-docker.pkg.dev/cloudrun/container/hello"
      }
    }
  }

  traffic {
    percent         = 100
    latest_revision = true
  }
}
