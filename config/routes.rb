Rails.application.routes.draw do
  get 'root', to: 'static_pages#root', as: :index
  resources :user, only: [:new, :create]

  resource :session, only: [:new, :create, :destroy]

  namespace :api, defaults: { format: :json } do
    resources :adventures, only: [:index, :create, :show] do 
      resources :reviews, only: [:index]
    end
  end

  namespace :api, defaults: { format: :json } do 
    resources :reviews, only: [:create]
  end

  namespace :api, defaults: { format: :json } do
    resources :features, only: [:index, :create]
  end

  namespace :api, defaults: { format: :json } do 
    resources :reviews, only: [:create]
  end
end
