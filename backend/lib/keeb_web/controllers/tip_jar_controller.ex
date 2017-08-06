defmodule KeebWeb.TipJarController do
  use KeebWeb, :controller
  require Logger
  def create(conn, %{
    "token" => token,
    "cents" => cents,
    "email" => email,
  }) do
    # TODO: figure out where to put business logic
    case Api.Stripe.charge(token, cents, email) do
      # everything went fine
      { :ok, %HTTPoison.Response{ status_code: 200 } } ->
        render(conn, "create.json")

      # # email invalid
      { :ok, %HTTPoison.Response{
        body: %{
          "error" => %{
            "type" => "invalid_request_error",
            "param" => "receipt_email",
          }
        }
      }} ->
        conn
          |> put_status(:unprocessable_entity)
          |> render("error.json", %{ code: "invalid_email" })
      # zip was wrong
      { :ok, %HTTPoison.Response{
        body: %{
          "error" => %{
            "code" => "incorrect_zip"
          }
        }
      }} ->
        conn
          |> put_status(:unprocessable_entity)
          |> render("error.json", %{ code: "incorrect_zip" })

      # catchall error
      _ ->
        conn
          |> put_status(:unprocessable_entity)
          |> render("error.json", %{ code: "stripe_error" })
    end
  end
end
