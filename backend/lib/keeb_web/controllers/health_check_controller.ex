defmodule KeebWeb.HealthCheckController do
  use KeebWeb, :controller

  def index(conn, _params) do
    json conn, %{ version: Mix.Project.config[:version] }
  end
end
