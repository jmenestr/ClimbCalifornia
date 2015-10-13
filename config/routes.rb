Rails.application.routes.draw do
  get 'root', to: 'static_pages#root', as: :index
  resources :user, only: [:new, :create]
  resource :session, only: [:new, :create, :destroy]
end
