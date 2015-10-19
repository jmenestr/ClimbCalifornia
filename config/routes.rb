Rails.application.routes.draw do
  get '/', to: 'static_pages#root', as: :index
  resources :users, only: [:new, :create]

  resource :session, only: [:new, :create, :destroy]

  namespace :api, defaults: { format: :json } do
    resources :adventures, only: [:index, :create, :show] do 
      resources :reviews, only: [:index]
    end
  end

  namespace :api, defaults: { format: :json } do 
    resources :follows, only: [:create, :destroy]
  end
  namespace :api, defaults: { format: :json } do
    resources :activities, only: [:index]
  end
  resources :users, defaults: { format: :json }, only: [:show, :index]
  get '/api/feed', defaults: {format: :json }, to: 'users#feed', as: :feed
  get '/profile', defaults: { format: :json}, to: 'users#profile', as: :profile

  namespace :api, defaults: { format: :json } do 
    resources :adventure_likes, only: [:create, :destroy]
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
