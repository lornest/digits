terraform {
  required_providers {
    heroku = {
      source  = "heroku/heroku"
      version = "~> 5.0"
      api_key = var.heroku_api_key
    }
  }
}
