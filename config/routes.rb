Rails.application.routes.draw do
  root 'staticpages#index'
  
  resources :maps
  
  post '/parks', to: 'maps#park_finder'
  post '/icecream', to: 'maps#icecream_finder'  
end