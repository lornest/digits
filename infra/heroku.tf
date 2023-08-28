provider "heroku" {
  api_key = var.heroku_api_key
}

resource "heroku_app" "digits-server" {
  name   = "digits-server"
  region = "europe"
}
