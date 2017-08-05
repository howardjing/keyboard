defmodule KeebWeb.Router do
  use KeebWeb, :router

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/api", KeebWeb do
    pipe_through :api
  end
end
