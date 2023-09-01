resource "google_storage_bucket" "container-images" {
  name          = "container-images"
  location      = "europe-west2"
  force_destroy = true

  public_access_prevention = "enforced"
}

resource "google_container_registry" "container-images" {
}
