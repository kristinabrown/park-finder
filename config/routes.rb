Rails.application.routes.draw do
  root 'staticpages#index'
  
  resources :maps
  
  post '/parks', to: 'maps#park_finder' 
end