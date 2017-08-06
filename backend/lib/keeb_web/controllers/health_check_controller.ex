defmodule KeebWeb.HealthCheckController do
  use KeebWeb, :controller

  def index(conn, _params) do
    json conn, %{ status: "ok" }
  end
end
