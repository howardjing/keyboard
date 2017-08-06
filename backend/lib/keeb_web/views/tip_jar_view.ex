defmodule KeebWeb.TipJarView do
  def render("create.json", _assigns) do
    %{ message: "success" }
  end

  def render("error.json", %{ code: code }) do
    %{ code: code }
  end
end
