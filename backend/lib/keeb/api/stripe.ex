defmodule Api.Stripe do
  use HTTPoison.Base
  require Logger

  @endpoint "https://api.stripe.com/v1"

  # === overrides ===

  defp process_url(url) do
    @endpoint <> url
  end

  defp process_response_body(body) do
    Poison.decode!(body)
  end

  # === actual stuff ===

  defp secret_key do
    Application.get_env(:keeb, :stripe)
  end

  defp default_headers do
    [
      { "Authorization", "Bearer #{secret_key()}" },
      { "Content-Type", "application/x-www-form-urlencoded" },
      { "Accept", "application/json" },
    ]
  end

  def charge(token, cents, email) do
    post(
      "/charges",
      {:form, [
        { :amount, cents },
        { :currency, "USD" },
        { :receipt_email, email },
        { :source, token },
      ]},
      default_headers()
    )
  end
end
